import type React from "react"
import "./globals.css"
import { Roboto_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

export const metadata = {
  title: "CyberSecTool - Cybersecurity Microservices",
  description: "A suite of cybersecurity tools as microservices",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoMono.variable} font-mono`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
