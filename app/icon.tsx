import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// The A mark from app/components/Logo.tsx on a white tile. Satori renders
// plain SVG paths, so the geometry is repeated here rather than imported.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', borderRadius: 7 }}>
        <svg width="26" height="26" viewBox="-10 -10 320 320">
          <path d="M148 0 L228 155 L68 155 Z" fill="#58AE5A" />
          <path d="M148 112 L170 155 L126 155 Z" fill="#FFFFFF" />
          <path d="M0 300 L68 180 L228 180 L296 300 L236 300 L192 226 L104 226 L60 300 Z" fill="#12181B" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
