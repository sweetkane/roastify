import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Inter } from 'next/font/google'
import type { ReactNode } from "react"
import { Header } from '@/components/header'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OpenAI and AI SDK Chatbot",
  description: "A simple chatbot built using the AI SDK and gpt-4o-mini.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("flex flex-col h-full bg-gray-900", inter.className)}>
        <Header className="h-16" />
        <main className="flex-1 overflow-hidden">
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </main>
      </body>
    </html>
  )
}



import './globals.css'