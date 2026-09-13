import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import JsonLd from './components/JsonLd'
import { BASE_URL, SITE } from './lib/site'
import { graph, organizationJsonLd } from './lib/seo'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
// Brand face for the logo wordmark only; the rest of the site stays on Geist.
const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['500', '800'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE.name} | Expert ITR, GST and TDS Filing at Fixed Prices`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.shortDescription,
  keywords: [
    'itr filing online', 'income tax return filing', 'gst return filing', 'tds return filing',
    'tax consultant online', 'income tax calculator', 'gst registration', 'cma report for bank loan',
    'tax consultant chandigarh', 'itr filing panchkula',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: SITE.name,
    title: `${SITE.name} | Expert ITR, GST and TDS Filing at Fixed Prices`,
    description: SITE.shortDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | Expert ITR, GST and TDS Filing`,
    description: SITE.shortDescription,
  },
  // NOTE: no `alternates.canonical` here. A root-layout canonical cascades to
  // every route without its own `alternates`, marking them duplicates of "/".
  // Each indexable route sets its own canonical via buildMetadata().
  category: 'finance',
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#0B1F3A" />
        <JsonLd data={graph(organizationJsonLd())} />
        {clarityId && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
          </Script>
        )}
      </head>
      <body className="flex min-h-full flex-col bg-bg text-text">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  )
}
