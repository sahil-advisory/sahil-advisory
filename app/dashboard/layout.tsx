import type { Metadata } from 'next'
import Link from 'next/link'
import { LogOut, FolderOpen, LayoutDashboard } from 'lucide-react'
import { signOut } from '@/auth'
import { requireUser } from '@/app/lib/auth-guard'
import { isDbConfigured } from '@/app/lib/db'

export const metadata: Metadata = { title: 'Your portal', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()
  return (
    <div className="min-h-[70vh] bg-bg-alt">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 text-sm font-semibold" aria-label="Portal">
            <Link href="/dashboard" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-navy-900 hover:bg-bg-alt"><FolderOpen className="h-4 w-4" /> My filings</Link>
            {user.role !== 'client' && <Link href="/admin" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-navy-900 hover:bg-bg-alt"><LayoutDashboard className="h-4 w-4" /> Admin</Link>}
          </nav>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="hidden sm:inline">{user.email}</span>
            <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }) }}>
              <button type="submit" className="flex items-center gap-1 rounded-lg px-2 py-1 font-semibold text-navy-900 hover:bg-bg-alt"><LogOut className="h-3.5 w-3.5" /> Sign out</button>
            </form>
          </div>
        </div>
      </div>
      {!isDbConfigured && <div className="border-b border-amber-200 bg-gold-50 px-4 py-2 text-center text-sm text-navy-900">The portal is not configured on this deployment.</div>}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
