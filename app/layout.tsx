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
  fallback: ['system-ui', 'arial'],
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
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'SF Pro Rounded';
            src: url('https://jung602.github.io/room-602/fonts/SF-Rounded-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'SF Pro Rounded';
            src: url('https://jung602.github.io/room-602/fonts/SF-Rounded-Medium.woff2') format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'SF Pro Rounded';
            src: url('https://jung602.github.io/room-602/fonts/SF-Rounded-SemiBold.woff2') format('woff2');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }
        ` }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
