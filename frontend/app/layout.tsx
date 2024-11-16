import './globals.css'
import { Inter } from 'next/font/google'
import { MagicUIProvider } from 'magic-ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PumpPerfect',
  description: 'Insulin Pump Data Analysis Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MagicUIProvider>
          <main className="min-h-screen bg-background font-sans antialiased">
            {children}
          </main>
        </MagicUIProvider>
      </body>
    </html>
  )
}
