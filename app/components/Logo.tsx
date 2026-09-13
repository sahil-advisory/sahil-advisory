// Brand mark and lockup, from the supplied logo-2.png.
//
// The A mark is traced into SVG paths. The file's own colours (a lime green
// and a charcoal) sat off the site palette, so the mark is painted with the
// theme tokens instead: navy-900 for the legs and "Sahil", green-600 for the
// peak and "Advisory". Keep these in step with app/globals.css.
// The wordmark is real HTML text in Poppins (the face the original uses),
// so it stays crisp at every size and the tagline can be set at a legible
// pixel size instead of scaling down with an SVG.

export const BRAND = {
  green: '#059669',
  dark: '#0B1F3A',
  tagline: 'You grow, we handle it',
} as const

// The A mark on a 300x300 box. Reused by the favicon and OG card.
export function MarkPaths({ green = BRAND.green, dark = BRAND.dark, notch = '#FFFFFF' }: { green?: string; dark?: string; notch?: string }) {
  return (
    <>
      <path d="M148 0 L228 155 L68 155 Z" fill={green} />
      <path d="M148 112 L170 155 L126 155 Z" fill={notch} />
      <path d="M0 300 L68 180 L228 180 L296 300 L236 300 L192 226 L104 226 L60 300 Z" fill={dark} />
    </>
  )
}

export function LogoMark({ size = 40, className = '', onDark = false }: { size?: number; className?: string; onDark?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="-10 -10 320 320" role="img" aria-label="Sahil Advisory" className={className}>
      <MarkPaths dark={onDark ? '#FFFFFF' : BRAND.dark} notch={onDark ? '#0B1F3A' : '#FFFFFF'} />
    </svg>
  )
}

type Size = 'sm' | 'md' | 'lg'

// Pixel sizes per variant: mark, wordmark line, tagline. Chosen so the
// tagline is never below 8px, the floor for legibility on a retina phone.
const SIZES: Record<Size, { mark: number; word: number; lead: number; tag: number; tagTrack: string; gap: number }> = {
  sm: { mark: 40, word: 19, lead: 19, tag: 8, tagTrack: '0.22em', gap: 10 },
  md: { mark: 52, word: 24, lead: 24, tag: 9.5, tagTrack: '0.24em', gap: 12 },
  lg: { mark: 72, word: 34, lead: 34, tag: 12, tagTrack: '0.26em', gap: 16 },
}

// Horizontal lockup: mark, two-line wordmark, optional tagline centred
// beneath the whole thing exactly as in the original.
export function Logo({ size = 'sm', onDark = false, tagline = false, className = '' }: { size?: Size; onDark?: boolean; tagline?: boolean; className?: string }) {
  const s = SIZES[size]
  const dark = onDark ? '#FFFFFF' : BRAND.dark
  const muted = onDark ? 'rgba(255,255,255,0.72)' : '#1e3a5f'
  return (
    <span className={`inline-flex flex-col items-center ${className}`} aria-label={`Sahil Advisory. ${BRAND.tagline}.`} role="img">
      <span className="flex items-center" style={{ gap: s.gap }}>
        <LogoMark size={s.mark} onDark={onDark} />
        <span className="font-brand flex flex-col font-extrabold" style={{ fontSize: s.word, lineHeight: `${s.lead}px`, letterSpacing: '-0.02em' }}>
          <span style={{ color: dark }}>Sahil</span>
          <span style={{ color: BRAND.green }}>Advisory</span>
        </span>
      </span>
      {tagline && (
        <span className="font-brand mt-1 whitespace-nowrap font-medium uppercase" style={{ fontSize: s.tag, letterSpacing: s.tagTrack, color: muted, lineHeight: 1 }}>
          {BRAND.tagline.replace(',', '')}
        </span>
      )}
    </span>
  )
}
