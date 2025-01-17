"use client"

import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUpIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { useEffect, useRef } from 'react'

export function ChatForm({ className, ...props }: React.ComponentProps<"div">) {
  const { messages, input, setInput, append } = useChat({
    api: "/api/chat",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: "user" })
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const header = (
    <header className="m-auto flex max-w-96 flex-col gap-5 text-center p-6">
      <h1 className="text-2xl font-semibold leading-none tracking-tight text-green-400">Basic AI Chatbot Template</h1>
      <p className="text-gray-400 text-sm">
        This is an AI chatbot app template built with <span className="text-green-300">Next.js</span>, the{" "}
        <span className="text-green-300">Vercel AI SDK</span>, and <span className="text-green-300">Vercel KV</span>.
      </p>
      <p className="text-gray-400 text-sm">
        Connect an API Key from your provider and send a message to get started.
      </p>
    </header>
  )

  const messageList = (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-xl px-4 py-2 ${
              message.role === 'user'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-green-300'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gray-900",
        className
      )}
      {...props}
    >
      <div className="flex-1 overflow-y-auto">
        {messages.length ? messageList : header}
      </div>
      <div className="mt-auto">
        <form
          onSubmit={handleSubmit}
          className="border-input bg-gray-800 focus-within:ring-green-500/10 mx-6 mb-6 flex items-center rounded-[16px] border border-green-700 px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(v) => setInput(v)}
            value={input}
            placeholder="Enter a message"
            className="placeholder:text-gray-500 flex-1 bg-transparent focus:outline-none text-green-300"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="submit" 
                variant="ghost" 
                size="sm" 
                className="absolute bottom-1 right-1 size-6 rounded-full text-green-400 hover:text-green-300 hover:bg-gray-700"
                disabled={!input.trim()}
              >
                <ArrowUpIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>Submit</TooltipContent>
          </Tooltip>
        </form>
      </div>
    </div>
  )
}

