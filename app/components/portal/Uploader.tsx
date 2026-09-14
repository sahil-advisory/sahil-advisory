'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, UploadCloud, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { refreshEngagementAction } from '@/app/lib/engagements/actions'

// Direct-to-storage upload. Asks the server for a signed URL, PUTs the bytes
// to Supabase Storage, then tells the server to record it. Images are
// resized in the browser first so a phone photo is a few hundred KB and its
// EXIF (including location) never leaves the device.

type Props = {
  engagementId: string
  requirementId: string
  source?: 'portal' | 'expert' | 'whatsapp'
  compact?: boolean
  label?: string
}

const MAX_EDGE = 2500

async function shrinkImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file
  const bitmap = await createImageBitmap(file).catch(() => null)
  if (!bitmap) return file
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  if (scale === 1 && file.size < 1.5 * 1024 * 1024) return file
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.86))
  if (!blob) return file
  return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' })
}

function put(url: string, file: File, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.setRequestHeader('x-upsert', 'false')
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total)
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)))
    xhr.onerror = () => reject(new Error('Network error during upload'))
    xhr.send(file)
  })
}

export default function Uploader({ engagementId, requirementId, source = 'portal', compact, label }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<{ phase: 'idle' | 'working' | 'done' | 'error'; msg?: string; progress?: number }>({ phase: 'idle' })

  async function handle(list: FileList | null) {
    if (!list || !list.length) return
    setState({ phase: 'working', progress: 0, msg: list.length > 1 ? `Uploading 1 of ${list.length}` : 'Uploading' })
    try {
      const filesArr = Array.from(list).slice(0, 10)
      for (let i = 0; i < filesArr.length; i++) {
        const original = filesArr[i]
        if (/heic|heif/i.test(original.type) || /\.hei[cf]$/i.test(original.name)) {
          throw new Error('HEIC photos are not supported. In iPhone Settings, Camera, Formats, choose Most Compatible, or take a screenshot of the document.')
        }
        const file = await shrinkImage(original)
        setState({ phase: 'working', progress: 0, msg: filesArr.length > 1 ? `Uploading ${i + 1} of ${filesArr.length}` : 'Uploading' })
        const r1 = await fetch('/api/portal/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requirementId, filename: file.name, mime: file.type, size: file.size }),
        })
        const j1 = (await r1.json()) as { url?: string; path?: string; version?: number; error?: string }
        if (!r1.ok || !j1.url) throw new Error(j1.error || 'Could not start upload')
        await put(j1.url, file, (p) => setState((s) => ({ ...s, progress: p })))
        const r2 = await fetch('/api/portal/upload-complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requirementId, path: j1.path, filename: file.name, version: j1.version, source }),
        })
        const j2 = (await r2.json()) as { ok?: boolean; error?: string }
        if (!r2.ok || !j2.ok) throw new Error(j2.error || 'Could not save the upload')
      }
      setState({ phase: 'done', msg: 'Uploaded' })
      await refreshEngagementAction(engagementId)
      router.refresh()
      setTimeout(() => setState({ phase: 'idle' }), 2500)
    } catch (err) {
      setState({ phase: 'error', msg: (err as Error).message })
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const busy = state.phase === 'working'
  return (
    <div className={compact ? '' : 'mt-3'}>
      <input ref={inputRef} type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf,.xlsx,.xls,.csv,.zip,.json" className="sr-only" id={`up-${requirementId}`} onChange={(e) => handle(e.target.files)} disabled={busy} />
      <label
        htmlFor={`up-${requirementId}`}
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 text-sm font-semibold transition-colors ${compact ? 'py-2' : 'py-4'} ${busy ? 'border-border bg-bg-alt text-muted' : state.phase === 'error' ? 'border-red-200 bg-red-50 text-red-600' : 'border-green-200 bg-green-50/60 text-green-700 hover:border-green-600 hover:bg-green-50'}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); if (!busy) void handle(e.dataTransfer.files) }}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : state.phase === 'done' ? <CheckCircle2 className="h-4 w-4" /> : state.phase === 'error' ? <AlertCircle className="h-4 w-4" /> : compact ? <UploadCloud className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
        <span>
          {busy ? `${state.msg} ${Math.round((state.progress ?? 0) * 100)}%` : state.phase === 'done' ? 'Uploaded. Your expert will check it.' : state.phase === 'error' ? state.msg : label ?? (compact ? 'Upload' : 'Take a photo or choose a file')}
        </span>
      </label>
      {!compact && state.phase === 'idle' && <p className="mt-1.5 text-[11px] text-muted">PDF, photo, Excel or ZIP, up to 15 MB. Several photos for one document are fine.</p>}
    </div>
  )
}
