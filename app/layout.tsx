import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, EB_Garamond } from "next/font/google"
import { Nav } from "@/components/nav"
import "./globals.css"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Trent vs. Trey — Golf Match Play",
  description: "A year-long 1v1 match play competition across Central Florida. Every hole has a price.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#1a3a2a",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${garamond.variable} bg-parchment`}>
      <body className="font-sans antialiased min-h-screen">
        <Nav />
        <main className="pb-24 md:pb-0">{children}</main>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
