import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export * from './schema'

// Runtime connects through Supabase's session pooler (port 5432), the same
// endpoint migrations use. The transaction pooler (6543) was tried first and
// drops queries sent on a connection while another is in flight, whatever
// the driver's pipelining setting, which showed up as pages hanging until
// the function timeout. Session mode behaves like plain Postgres. Keep
// `prepare: false` so the URL can be swapped back without code changes.
//
// Serverless connections go stale: an instance is suspended between requests
// with its socket open, the pooler drops the other end, and on resume the
// driver writes into a half-open socket and waits forever (the server shows
// the statement stuck in ClientRead). Timers do not run while suspended, so
// the driver's own idle_timeout cannot catch it. The guard below compares
// wall-clock time instead: a client not used in the last few seconds is
// discarded and a fresh one is opened, which costs one TLS handshake within
// the same region.

type Client = ReturnType<typeof drizzle<typeof schema>>

declare global {
  var __sahilDb: { client: Client; lastUsed: number } | undefined
  var __sahilTestDb: Client | undefined
}

const STALE_AFTER_MS = 5_000

function open(): Client | null {
  const url = process.env.DATABASE_URL
  if (!url) return null
  // A small pool: pages fan out a handful of queries in parallel, and each
  // instance closes its client after five idle seconds (see below), so the
  // session pooler's connection budget is not held for long.
  const client = postgres(url, {
    prepare: false,
    max: 4,
    idle_timeout: 10,
    max_lifetime: 60 * 5,
    connect_timeout: 10,
  })
  return drizzle(client, { schema })
}

function current(): Client | null {
  // Tests inject an in-process database here.
  if (globalThis.__sahilTestDb) return globalThis.__sahilTestDb
  const now = Date.now()
  const held = globalThis.__sahilDb
  if (held && now - held.lastUsed < STALE_AFTER_MS) {
    held.lastUsed = now
    return held.client
  }
  if (held) {
    // Let in-flight work on the old client finish, then close it.
    held.client.$client.end({ timeout: 5 }).catch(() => {})
  }
  const client = open()
  if (!client) return null
  globalThis.__sahilDb = { client, lastUsed: now }
  return client
}

// `db` looks like a drizzle instance to every caller but resolves to the
// current healthy client on each property access. Methods are bound to that
// client so `this` inside drizzle never points at the proxy. The proxy target
// carries the drizzle prototype so `instanceof` checks (the Auth.js adapter
// does one) still pass.
export const db: Client | null = process.env.DATABASE_URL || globalThis.__sahilTestDb
  ? (new Proxy(Object.create(PostgresJsDatabase.prototype) as Client, {
      get(_t, prop) {
        const c = current()
        if (!c) return undefined
        const v = Reflect.get(c, prop, c)
        return typeof v === 'function' ? v.bind(c) : v
      },
    }) as Client)
  : null

export const isDbConfigured = Boolean(process.env.DATABASE_URL)
