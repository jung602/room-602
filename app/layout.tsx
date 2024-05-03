import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
 

const inter = Inter({ subsets: ['latin'] })

const sfRounded = localFont({
  src: './SF-Pro-Rounded-Semibold.otf',
  display: 'swap',
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
