import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header({ className }: { className?: string }) {
  return (
    <header className={`bg-gray-800 border-b border-green-700 ${className}`}>
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-400">
          AI Chatbot
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost" asChild className="text-green-300 hover:text-green-100 hover:bg-gray-700">
                <Link href="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild className="text-green-300 hover:text-green-100 hover:bg-gray-700">
                <Link href="/about">About</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild className="text-green-300 hover:text-green-100 hover:bg-gray-700">
                <Link href="/contact">Contact</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

