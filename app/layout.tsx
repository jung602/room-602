import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const sfRounded = localFont({
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
    }
  ],
  variable: '--font-sf',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Room602',
  description: 'Virtual Designer Based in Delulu',
  openGraph: {
    title: 'Room602',
    description: 'Virtual Designer Based in Delulu',
    siteName:'Room602',
    type: 'website',
    url: 'https://erin-jung.com/',
    images: 'https://erin-jung.com/og.jpg'
  },
  icons: {
    icon: "https://erin-jung.com/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sfRounded.variable}>
      <body>
        {children}
      </body>
    </html>
  )
}
