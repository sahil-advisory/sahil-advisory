import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', borderRadius: 40 }}>
        <svg width="132" height="132" viewBox="-10 -10 320 320">
          <path d="M148 0 L228 155 L68 155 Z" fill="#059669" />
          <path d="M148 112 L170 155 L126 155 Z" fill="#FFFFFF" />
          <path d="M0 300 L68 180 L228 180 L296 300 L236 300 L192 226 L104 226 L60 300 Z" fill="#0B1F3A" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
