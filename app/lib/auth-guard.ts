import { redirect } from 'next/navigation'
import { getSession } from '@/auth'

// The proxy only checks that a session cookie exists, which keeps it free of
// database calls. Authorisation happens here, in the page or action itself.
// Every admin page and every admin server action must call this.
export async function requireAdmin() {
  const session = await getSession()
  if (!session?.user) redirect('/login?callbackUrl=/admin')
  if (session.user.role !== 'admin') redirect('/login?error=AccessDenied')
  return session.user
}

export async function requireUser() {
  const session = await getSession()
  if (!session?.user) redirect('/login?callbackUrl=/dashboard')
  return session.user
}

// Admin or expert. Experts are further limited to assigned engagements by
// the engagement queries themselves.
export async function requireStaff() {
  const session = await getSession()
  if (!session?.user) redirect('/login?callbackUrl=/admin')
  if (session.user.role !== 'admin' && session.user.role !== 'expert') redirect('/login?error=AccessDenied')
  return session.user
}
