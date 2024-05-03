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
    },
  ],
  variable: '--font-sfRounded'
})

export const metadata: Metadata = {
  title: 'Room602',
  description: 'Virtual Designer Based in Seoul',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sfRounded.variable} font-sans`}>
      {children}
      </body>
    </html>
  )
}
