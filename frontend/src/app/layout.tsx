import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Artstock',
  description: 'Tokenize and sell your artworks on our marketplace',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      </body>
      </html>
  )
}