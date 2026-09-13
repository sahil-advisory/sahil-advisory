// Brand mark, rebuilt as vector from the supplied concept: a serif "SA"
// monogram split by a band carrying the name. Inline SVG so it is crisp at
// any size, inherits the page fonts, and costs no request.
//
// Two variants:
//   mark  square, for the navbar, favicons and small placements
//   full  mark plus wordmark and tagline, for the footer and print
//
// The monogram uses a serif stack on purpose; it is the one place on the
// site that departs from Geist, and it is what makes the mark feel like a
// firm rather than an app.

const SERIF = "Georgia, 'Times New Roman', 'Noto Serif', serif"

export function LogoMark({ size = 36, className = '', tone = 'navy' }: { size?: number; className?: string; tone?: 'navy' | 'white' }) {
  const letter = tone === 'navy' ? '#0B1F3A' : '#FFFFFF'
  const band = '#059669'
  // No text in the band at this size: at 40px it would be illegible, and the
  // wordmark sits beside the mark wherever it is used.
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Sahil Advisory" className={className}>
      <text x="32" y="47" textAnchor="middle" fontFamily={SERIF} fontWeight="700" fontSize="48" fill={letter} letterSpacing="-2.5">SA</text>
      <rect x="6" y="31" width="52" height="7" rx="1.5" fill={band} />
    </svg>
  )
}

export function LogoFull({ height = 64, className = '', tone = 'navy', tagline = true }: { height?: number; className?: string; tone?: 'navy' | 'white'; tagline?: boolean }) {
  const letter = tone === 'navy' ? '#0B1F3A' : '#FFFFFF'
  const muted = tone === 'navy' ? '#64748B' : 'rgba(255,255,255,0.65)'
  const band = '#059669'
  const width = Math.round((height * 240) / 100)
  return (
    <svg width={width} height={height} viewBox="0 0 240 100" role="img" aria-label="Sahil Advisory. You grow, we handle it." className={className}>
      <text x="120" y="70" textAnchor="middle" fontFamily={SERIF} fontWeight="700" fontSize="74" fill={letter} letterSpacing="-3">SA</text>
      <rect x="20" y="44" width="200" height="14" rx="2" fill={band} />
      <text x="120" y="54.6" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="8.6" letterSpacing="2.6" fill="#FFFFFF">SAHIL ADVISORY</text>
      {tagline && (
        <text x="120" y="92" textAnchor="middle" fontFamily="inherit" fontWeight="600" fontSize="7" letterSpacing="2.2" fill={muted}>YOU GROW, WE HANDLE IT</text>
      )}
    </svg>
  )
}
