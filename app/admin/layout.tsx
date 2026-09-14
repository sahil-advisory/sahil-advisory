import type { Metadata } from 'next'
import Link from 'next/link'
import { Inbox, LayoutDashboard, LogOut, FolderOpen } from 'lucide-react'
import { signOut } from '@/auth'
import { requireStaff } from '@/app/lib/auth-guard'
import { isDbConfigured } from '@/app/lib/db'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

// Everything under /admin is request-time: it reads the session cookie and
// the database on every load.
export const dynamic = 'force-dynamic'
// Fail fast if the database stalls, instead of holding the request for the
// platform maximum.
export const maxDuration = 30

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireStaff()
  return (
    <div className="bg-bg-alt">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 text-sm font-semibold" aria-label="Admin">
            <Link href="/admin" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-navy-900 hover:bg-bg-alt"><LayoutDashboard className="h-4 w-4" /> Overview</Link>
            <Link href="/admin/leads" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-navy-900 hover:bg-bg-alt"><Inbox className="h-4 w-4" /> Leads</Link>
            <Link href="/admin/engagements" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-navy-900 hover:bg-bg-alt"><FolderOpen className="h-4 w-4" /> Engagements</Link>
          </nav>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="hidden sm:inline">{user.email}</span>
            <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
              <button type="submit" className="flex items-center gap-1 rounded-lg px-2 py-1 font-semibold text-navy-900 hover:bg-bg-alt"><LogOut className="h-3.5 w-3.5" /> Sign out</button>
            </form>
          </div>
        </div>
      </div>
      {!isDbConfigured && (
        <div className="border-b border-amber-200 bg-gold-50 px-4 py-2 text-center text-sm text-navy-900">
          <code className="font-mono">DATABASE_URL</code> is not set on this deployment, so there is nothing to show. See <code className="font-mono">docs/SETUP-BACKEND.md</code>.
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
