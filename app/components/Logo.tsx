// Brand mark, rebuilt as vector from the supplied logo-2.png so it is crisp
// at any size and sits on any background. The geometry is traced from the
// raster: a green peak with a notch over a dark, open-bottomed "A" band.
// Colours are sampled from the file. Wordmark is two-tone, "Sahil" dark and
// "Advisory" green, set in the page font.

export const BRAND = {
  green: '#58AE5A',
  dark: '#12181B',
  tagline: 'You grow, we handle it',
} as const

// The A mark on a 300x300 box. Reused by the favicon and OG card.
export function MarkPaths({ green = BRAND.green, dark = BRAND.dark, notch = '#FFFFFF' }: { green?: string; dark?: string; notch?: string }) {
  return (
    <>
      {/* peak */}
      <path d="M148 0 L228 155 L68 155 Z" fill={green} />
      {/* notch that turns the peak into an A */}
      <path d="M148 112 L170 155 L126 155 Z" fill={notch} />
      {/* legs: outer trapezoid minus inner trapezoid */}
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

// Horizontal lockup: mark on the left, two-line wordmark on the right,
// optional tagline. Height sets the whole thing; width follows.
export function LogoLockup({
  height = 44,
  className = '',
  onDark = false,
  tagline = false,
}: {
  height?: number
  className?: string
  onDark?: boolean
  tagline?: boolean
}) {
  const dark = onDark ? '#FFFFFF' : BRAND.dark
  const muted = onDark ? 'rgba(255,255,255,0.7)' : '#3A4149'
  // Layout box traced from the original: mark 300 wide, then the wordmark
  // spanning about 2.2 mark-widths, tagline centred under the whole lockup.
  const H = tagline ? 372 : 300
  const W = 980
  const width = Math.round((height * W) / H)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Sahil Advisory. ${BRAND.tagline}.`} className={className}>
      <MarkPaths dark={dark} notch={onDark ? '#0B1F3A' : '#FFFFFF'} />
      <text x="336" y="142" fontFamily="inherit" fontWeight="800" fontSize="150" letterSpacing="-5" fill={dark}>Sahil</text>
      <text x="336" y="288" fontFamily="inherit" fontWeight="800" fontSize="150" letterSpacing="-5" fill={BRAND.green}>Advisory</text>
      {tagline && (
        <text x="490" y="356" textAnchor="middle" fontFamily="inherit" fontWeight="600" fontSize="34" letterSpacing="13" fill={muted}>
          {BRAND.tagline.toUpperCase().replace(',', '')}
        </text>
      )}
    </svg>
  )
}
