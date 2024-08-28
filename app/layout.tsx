import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from '@next/font/local'
 
const sfRounded = localFont({
  src: [
    {
      path: './public/fonts/SF-Rounded-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './public/fonts/SF-Rounded-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './public/fonts/SF-Rounded-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    // 다른 weight나 style이 있다면 여기에 추가하세요
  ],
  variable: '--font-sf-rounded'
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
