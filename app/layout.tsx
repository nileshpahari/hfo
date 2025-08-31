import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"

export const metadata: Metadata = {
  title: "Savvio",
  description: "A web page bookmark extention",
  generator: "Savvio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased scroll-smooth`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Light Mode: Violet Glow Background */}
          <div className="min-h-screen w-full relative dark:hidden">
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%), #ffffff",
              }}
            />
            <div className="relative z-10">
              {children}
            </div>
          </div>
          
          {/* Dark Mode: Default Background */}
          <div className="min-h-screen w-full relative bg-background hidden dark:block">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
