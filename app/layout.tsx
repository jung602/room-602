import './globals.css'
import type { Metadata } from 'next'
import Head from 'next/head'
/**
import localFont from 'next/font/local'
 
const sfRounded = localFont({
  preload: true,
  display: 'swap',
  src: [
    {
      path: './fonts/SF-Rounded-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SF-Rounded-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SF-Rounded-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-sfRounded'
}) */

export const metadata: Metadata = {
  title: 'Room602',
  description: 'Virtual Designer Based in Delulu',
  openGraph: {
    title: 'Room602',
    description: 'Virtual Designer Based in Delulu',
    siteName:'Room602',
    type: 'website',
    url: 'https://erin-jung.com/',
    images: '/og.jpg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>

        <title>Room602</title>
        <meta name="title" content="Room602" />
        <meta name="description" content="Virtual Designer Based in Delulu" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://erin-jung.com/" />
        <meta property="og:title" content="Room602" />
        <meta property="og:description" content="Virtual Designer Based in Delulu" />
        <meta property="og:image" content="https://erin-jung.com/og.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://erin-jung.com/" />
        <meta property="twitter:title" content="Room602" />
        <meta property="twitter:description" content="Virtual Designer Based in Delulu" />
        <meta property="twitter:image" content="https://erin-jung.com/og.jpg" />

      </Head>
      <body>
      {children}
      </body>
    </html>
  )
}
