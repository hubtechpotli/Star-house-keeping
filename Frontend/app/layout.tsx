import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter, Roboto, Open_Sans } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { ToastProvider, Toaster } from "@/components/ui/simple-toast"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  dlay: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  dlay: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  dlay: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  dlay: "swap",
})

export const metadata: Metadata = {
  title: "Star Housekeeping - Premium Bus Rental Service",
  description: "Travel in style with Star Housekeeping. Luxury AC buses for city tours, outstation trips, weddings, corporate events, and more. Experience comfort, reliability, and elegant service for every journey.",
  generator: "Next.js",
  keywords: "Bus rental, luxury bus, AC bus, group travel, city tours, outstation trips, wedding bus, corporate events, premium travel, Star Housekeeping, comfort, reliability, elegant service",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${roboto.variable} ${openSans.variable}`}>
      <body className="font-inter antialiased">
        <ToastProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  )
}
