import './globals.css'
import type { Metadata } from 'next'

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
    <html lang="en">
      <head>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');`}
        </style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
