import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <MainNav />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-4">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © {new Date().getFullYear()} Personal Finance Visualizer. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
