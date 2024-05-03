import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
 
const sfRounded = localFont({
  src: './fonts/SF-Rounded-SemiBold.woff2',
  weight: "normal",
  style: "normal",
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
      <body className={sfRounded.className}>
      {children}
      </body>
    </html>
  )
}
