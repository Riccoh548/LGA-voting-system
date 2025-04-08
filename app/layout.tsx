import type React from "react"

import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { LanguageProvider } from "@/context/LanguageContext"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense fallback={<div className={inter.className}>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <LanguageProvider>
              <div className="min-h-screen flex flex-col">
                <div className="main-background" />
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
