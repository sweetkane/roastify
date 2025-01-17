import Image from 'next/image'
import { ChatForm } from '@/components/chat-form'


export default function Chat() {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="hidden md:block w-1/3 bg-gray-800 p-4 overflow-y-auto">
        <div className="sticky top-0">
          <Image
            src="/placeholder.svg?height=600&width=400"
            alt="AI Assistant"
            width={400}
            height={600}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {/* <ChatForm /> */}
      </div>
    </div>
  )
}
