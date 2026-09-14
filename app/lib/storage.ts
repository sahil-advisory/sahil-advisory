import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Private Supabase Storage bucket for client documents and deliverables.
// Only the server talks to it, with the service role key. The browser gets a
// short-lived signed URL scoped to one path for each upload and each view.

export const BUCKET = 'client-files'
export const MAX_FILE_BYTES = 15 * 1024 * 1024
export const UPLOAD_URL_TTL_S = 120
export const DOWNLOAD_URL_TTL_S = 600

export const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
  'application/zip',
  'application/x-zip-compressed',
  'application/json',
])

export function isStorageConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

let client: SupabaseClient | null = null
let bucketReady = false

function storage() {
  if (!isStorageConfigured()) throw new Error('Storage not configured (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)')
  if (!client) {
    client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return client.storage
}

// Idempotent. Runs once per server instance; a bucket that already exists is
// left as it is (its settings are managed in the Supabase dashboard).
async function ensureBucket() {
  if (bucketReady) return
  const s = storage()
  const { data } = await s.getBucket(BUCKET)
  if (!data) {
    const { error } = await s.createBucket(BUCKET, { public: false, fileSizeLimit: MAX_FILE_BYTES, allowedMimeTypes: [...ALLOWED_MIME] })
    if (error && !/already exists/i.test(error.message)) throw error
  }
  bucketReady = true
}

// Safe object key: our own ids plus a sanitised extension. The original name
// is kept in the database, never in the path.
export function objectPath(parts: { engagementId: string; requirementKey: string; version: number; ext: string }) {
  const ext = parts.ext.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5) || 'bin'
  return `engagements/${parts.engagementId}/${parts.requirementKey}/v${parts.version}-${crypto.randomUUID()}.${ext}`
}

export function deliverablePath(engagementId: string, type: string, version: number, ext: string) {
  const e = ext.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5) || 'bin'
  return `engagements/${engagementId}/deliverables/${type}-v${version}-${crypto.randomUUID()}.${e}`
}

export async function createUploadUrl(path: string) {
  await ensureBucket()
  const { data, error } = await storage().from(BUCKET).createSignedUploadUrl(path)
  if (error || !data) throw error ?? new Error('Could not create upload URL')
  return { url: data.signedUrl, token: data.token, path: data.path }
}

// Called after the browser reports success. Confirms the object exists and
// returns its real size and type, which we trust over what the browser said.
export async function statObject(path: string): Promise<{ size: number; mime: string } | null> {
  const { data, error } = await storage().from(BUCKET).info(path)
  if (error || !data) return null
  return { size: Number(data.size ?? 0), mime: String(data.contentType ?? 'application/octet-stream') }
}

export async function createDownloadUrl(path: string, opts: { download?: string; inline?: boolean } = {}) {
  const { data, error } = await storage()
    .from(BUCKET)
    .createSignedUrl(path, DOWNLOAD_URL_TTL_S, opts.inline ? {} : { download: opts.download ?? true })
  if (error || !data) throw error ?? new Error('Could not create download URL')
  return data.signedUrl
}

export async function removeObject(path: string) {
  const { error } = await storage().from(BUCKET).remove([path])
  if (error) throw error
}

export async function sha256Of(path: string): Promise<string | null> {
  const { data, error } = await storage().from(BUCKET).download(path)
  if (error || !data) return null
  const buf = await data.arrayBuffer()
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('')
}
