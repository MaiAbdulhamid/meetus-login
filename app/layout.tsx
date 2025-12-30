import type { Metadata } from 'next'
import { ABeeZee } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/lib/providers/QueryProvider'

const abeezee = ABeeZee({
  variable: '--font-abeezee',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'MeetusVR - Login',
  description: 'Step into our shopping metaverse',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${abeezee.variable} font-sans antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
