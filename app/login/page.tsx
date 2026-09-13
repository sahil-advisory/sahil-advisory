import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Mail, ShieldCheck } from 'lucide-react'
import { signIn, getSession, authAvailable } from '@/auth'
import { buildMetadata } from '@/app/lib/seo'
import { SITE } from '@/app/lib/site'
import { Container } from '@/app/components/ui'

export const metadata: Metadata = buildMetadata({
  title: 'Sign in',
  description: 'Sign in to Sahil Advisory with a one-time link sent to your email.',
  path: '/login',
  noindex: true,
})

type Search = Promise<{ sent?: string; error?: string; callbackUrl?: string }>

export default async function LoginPage({ searchParams }: { searchParams: Search }) {
  const { sent, error, callbackUrl } = await searchParams
  const session = await getSession()
  if (session?.user) redirect(session.user.role === 'admin' ? '/admin' : '/dashboard')

  const target = callbackUrl && callbackUrl.startsWith('/') ? callbackUrl : '/admin'
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">{SITE.name}</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-900">Sign in</h1>

        {!authAvailable ? (
          <p className="mt-4 rounded-xl bg-bg-alt p-4 text-sm text-text-2">
            Sign-in is not configured on this deployment yet. It needs <code className="font-mono">AUTH_SECRET</code>, a database and an email provider key. See <code className="font-mono">docs/SETUP-BACKEND.md</code>.
          </p>
        ) : sent ? (
          <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-5">
            <p className="flex items-center gap-2 font-bold text-navy-900"><Mail className="h-5 w-5 text-green-600" /> Check your email</p>
            <p className="mt-2 text-sm leading-relaxed text-text-2">We sent a sign-in link. It works once and expires in 24 hours. If it is not there in a minute, check spam.</p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-text-2">No password. We email you a one-time link.</p>
            {error && (
              <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error === 'AccessDenied' ? 'Sign-in is for the Sahil Advisory team only. Client accounts arrive with order tracking.' : 'Sign-in failed. Try again or use a different method.'}
              </p>
            )}
            <form
              className="mt-6 space-y-3"
              action={async (formData) => {
                'use server'
                await signIn('email', { email: String(formData.get('email') || ''), redirectTo: target })
              }}
            >
              <label className="block">
                <span className="text-xs font-semibold text-text-2">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-lg border border-border-strong px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  placeholder="you@example.com"
                />
              </label>
              <button type="submit" className="w-full rounded-lg bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800">
                Email me a sign-in link
              </button>
            </form>
            {googleEnabled && (
              <form
                className="mt-3"
                action={async () => {
                  'use server'
                  await signIn('google', { redirectTo: target })
                }}
              >
                <button type="submit" className="w-full rounded-lg border border-border-strong bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-bg-alt">
                  Continue with Google
                </button>
              </form>
            )}
          </>
        )}

        <p className="mt-6 flex items-center gap-1.5 text-[11px] text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> Team sign-in only. Clients do not need an account yet: every service on the site works without one.
        </p>
      </div>
    </Container>
  )
}
