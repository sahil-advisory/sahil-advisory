// Shared Open Graph card system. Every opengraph-image route in the app
// renders through ogCard() + renderOg() so a shared link looks like one brand
// instead of eighteen one-off layouts.
//
// Fonts are vendored at assets/fonts (Geist, OFL) rather than fetched from
// Google at build time: these routes are statically generated, and a network
// dependency in the build is a needless way for a deploy to fail. Satori does
// not synthesize weights, so all three weights we actually use are loaded.
//
// Palette follows app/globals.css. Emerald is the default accent; red is only
// ever passed for deadline cards, where urgency is the real message.

import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ReactElement } from 'react'
import { SITE, BASE_URL } from './site'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const NAVY = '#0B1F3A'
const NAVY_DEEP = '#071426'
const EMERALD = '#059669'
const EMERALD_LIGHT = '#34D399'
const RED_LIGHT = '#F87171'
const RED = '#DC2626'

const ACCENTS = {
  emerald: { solid: EMERALD, light: EMERALD_LIGHT },
  red: { solid: RED, light: RED_LIGHT },
} as const

export type OgAccent = keyof typeof ACCENTS

const WEIGHTS = [400, 600, 800] as const

let fontsPromise: Promise<
  { name: string; data: Buffer; weight: (typeof WEIGHTS)[number]; style: 'normal' }[]
> | null = null

// Memoized at module scope: a full build renders ~80 cards and there is no
// reason to read the same three files off disk 240 times.
function loadFonts() {
  if (!fontsPromise) {
    const dir = join(process.cwd(), 'assets', 'fonts')
    fontsPromise = Promise.all(
      WEIGHTS.map(async (weight) => ({
        name: 'Geist',
        data: await readFile(join(dir, `Geist-${weight}.ttf`)),
        weight,
        style: 'normal' as const,
      }))
    )
  }
  return fontsPromise
}

// Satori has no text-overflow, so anything that could run long is cut here.
// Cutting at a word boundary keeps a card from ending mid-word.
//
// preferSentence is for prose pulled from registry intros and excerpts: if a
// sentence ends anywhere in the back half of the allowance, stop there and drop
// the ellipsis entirely. A complete sentence reads like copy; a trailing "..."
// reads like a bug.
function clamp(text: string, max: number, preferSentence = false): string {
  const s = text.replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  if (preferSentence) {
    const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '))
    if (stop >= max * 0.55) return cut.slice(0, stop + 1)
  }
  const i = cut.lastIndexOf(' ')
  return `${(i > 0 ? cut.slice(0, i) : cut).replace(/[,;:.\s]+$/, '')}...`
}

// Chips share one full-width row. Splitting that row equally truncates a long
// chip while a short one beside it leaves the row a third empty, so instead the
// chips share a character budget and the short ones donate their slack.
// 94 characters is what fits at fontSize 20 across 1056px of usable row, with
// roughly 4 characters' worth of padding and gap charged per chip.
const CHIP_ROW_BUDGET = 94

function fitChips(chips: string[]): string[] {
  const n = chips.length
  if (n === 0) return []
  const cleaned = chips.map((c) => c.replace(/\s+/g, ' ').trim())
  // Shortest first: each chip takes an even share of what is left, so anything
  // under its share hands the remainder to the chips still to be sized.
  const order = cleaned.map((c, i) => ({ c, i })).sort((a, b) => a.c.length - b.c.length)
  const out: string[] = new Array(n)
  let budget = CHIP_ROW_BUDGET - n * 4
  let remaining = n
  for (const { c, i } of order) {
    const text = clamp(c, Math.floor(budget / remaining))
    out[i] = text
    budget -= text.length
    remaining -= 1
  }
  return out
}

// Long service names ("ITR for Investors and Capital Gains") must not push the
// subtitle off the card, so the headline shrinks in steps instead of wrapping
// to a fourth line.
function titleSize(title: string): number {
  if (title.length > 74) return 46
  if (title.length > 54) return 54
  if (title.length > 36) return 60
  return 66
}

export type OgStat = { label: string; value: string; sub?: string }

export type OgCardInput = {
  /** Small uppercase line above the headline. Say what kind of page this is. */
  eyebrow: string
  title: string
  subtitle?: string
  /** Up to four short proof points. Dropped if a stat is present and space is tight. */
  chips?: string[]
  /** Right-hand figure block: price, form number, read time. */
  stat?: OgStat
  accent?: OgAccent
  /** Overrides the default trust line in the footer. */
  footnote?: string
}

const DEFAULT_FOOTNOTE =
  'Reviewed by a qualified professional (CMA/CA) · Draft approval before filing · WhatsApp updates'

export function ogCard(input: OgCardInput): ReactElement {
  const accent = ACCENTS[input.accent ?? 'emerald']
  const title = clamp(input.title, 88)
  const subtitle = input.subtitle ? clamp(input.subtitle, 168, true) : undefined
  // Chips sit on their own full-width row below the stat block, so the stat
  // does not compete with them for horizontal space.
  const chips = fitChips((input.chips ?? []).slice(0, 4))
  const domain = BASE_URL.replace(/^https?:\/\//, '').replace(/\/+$/, '')

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: NAVY,
        backgroundImage: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Geist',
      }}
    >
      {/* Depth. Satori renders these as flat circles, which is the point: no
          blur filters, no surprises between local and production renders. */}
      <div
        style={{
          position: 'absolute',
          top: -220,
          right: -140,
          width: 620,
          height: 620,
          borderRadius: 620,
          background: accent.solid,
          opacity: 0.16,
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -260,
          left: -160,
          width: 480,
          height: 480,
          borderRadius: 480,
          background: accent.solid,
          opacity: 0.08,
          display: 'flex',
        }}
      />

      <div style={{ width: '100%', height: 8, background: accent.solid, display: 'flex' }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '52px 72px 40px 72px',
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* The A mark, white legs on the dark card, from app/components/Logo.tsx */}
          <svg width="56" height="56" viewBox="-10 -10 320 320">
            <path d="M148 0 L228 155 L68 155 Z" fill="#58AE5A" />
            <path d="M148 112 L170 155 L126 155 Z" fill="#0B1F3A" />
            <path d="M0 300 L68 180 L228 180 L296 300 L236 300 L192 226 L104 226 L60 300 Z" fill="#FFFFFF" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>{SITE.name}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: 3,
              }}
            >
              TAX AND COMPLIANCE
            </span>
          </div>
        </div>

        {/* Headline block, with a left rule that ties every card together */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', marginTop: 28 }}>
          <div
            style={{
              width: 5,
              alignSelf: 'stretch',
              borderRadius: 5,
              background: accent.solid,
              display: 'flex',
              marginRight: 28,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: accent.light,
                letterSpacing: 3.5,
                textTransform: 'uppercase',
              }}
            >
              {clamp(input.eyebrow, 50)}
            </span>
            <span
              style={{
                fontSize: titleSize(title),
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.12,
                marginTop: 14,
                maxWidth: input.stat ? 700 : 1000,
              }}
            >
              {title}
            </span>
            {subtitle ? (
              <span
                style={{
                  fontSize: 25,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.74)',
                  lineHeight: 1.4,
                  marginTop: 18,
                  maxWidth: input.stat ? 680 : 940,
                }}
              >
                {subtitle}
              </span>
            ) : null}
          </div>

          {input.stat ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                marginLeft: 32,
                padding: '22px 28px',
                borderRadius: 18,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.16)',
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                }}
              >
                {clamp(input.stat.label, 22)}
              </span>
              <span
                style={{
                  fontSize: 60,
                  fontWeight: 800,
                  color: accent.light,
                  lineHeight: 1.1,
                  marginTop: 8,
                }}
              >
                {input.stat.value}
              </span>
              {input.stat.sub ? (
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: 6,
                  }}
                >
                  {clamp(input.stat.sub, 30)}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {chips.length > 0 ? (
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{
                  display: 'flex',
                  padding: '10px 18px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 72px',
          background: 'rgba(0,0,0,0.28)',
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 400, color: 'rgba(255,255,255,0.58)' }}>
          {clamp(input.footnote ?? DEFAULT_FOOTNOTE, 96)}
        </span>
        <span style={{ fontSize: 17, fontWeight: 800, color: accent.light }}>{domain}</span>
      </div>
    </div>
  )
}

export async function renderOg(card: ReactElement) {
  return new ImageResponse(card, { ...OG_SIZE, fonts: await loadFonts() })
}

/** Convenience for routes: build the card and render it in one call. */
export async function ogImage(input: OgCardInput) {
  return renderOg(ogCard(input))
}
