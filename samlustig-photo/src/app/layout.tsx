import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import SchemaMarkup from '@/components/schema-markup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Philadelphia Event Photography & Headshots | Sam Lustig Photo',
  description: 'Professional event photography and headshot services in Philadelphia, PA. Specializing in corporate events, weddings, and professional portraits throughout the Greater Philadelphia Area.',
  keywords: 'Philadelphia photographer, event photography Philadelphia, headshots Philadelphia, corporate photography PA, wedding photographer Philadelphia, professional photographer Greater Philadelphia Area, Sam Lustig',
  authors: [{ name: 'Sam Lustig' }],
  openGraph: {
    title: 'Philadelphia Event Photography & Headshots | Sam Lustig Photo',
    description: 'Professional event photography and headshot services in Philadelphia, PA. Specializing in corporate events, weddings, and professional portraits throughout the Greater Philadelphia Area.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sam Lustig Photography',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philadelphia Event Photography & Headshots | Sam Lustig Photo',
    description: 'Professional event photography and headshot services in Philadelphia, PA.',
  },
  alternates: {
    canonical: 'https://www.samlustigphoto.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}