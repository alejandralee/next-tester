"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ToriChatProps {
  context?: string // e.g., "candidate-onboarding", "client-onboarding", "welcome"
  currentStep?: number
}

export function ToriChat({ context = "general", currentStep }: ToriChatProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/tori-chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: getWelcomeMessage(context, currentStep),
      },
    ],
    body: {
      context,
      currentStep,
    },
  })

  function getWelcomeMessage(context: string, step?: number) {
    if (context === "candidate-onboarding") {
      return `Hi! I'm Tori, your AI assistant. I'm here to help you complete your candidate profile and answer any questions about the process. ${step !== undefined ? `I see you're on step ${step + 1} - how can I help?` : "How can I assist you today?"}`
    } else if (context === "client-onboarding") {
      return `Hi! I'm Tori, your AI assistant. I'm here to help you set up your hiring suite and answer any questions about our platform. ${step !== undefined ? `I see you're on step ${step + 1} - how can I help?` : "How can I assist you today?"}`
    } else if (context === "welcome") {
      return "Hi! I'm Tori, your AI assistant. I can help you understand the difference between our Candidate Suite and Hiring Suite, or answer any questions about getting started. What would you like to know?"
    }
    return "Hi! I'm Tori, your AI assistant. I'm here to help you navigate SatoriqOne and answer any questions you might have. How can I assist you today?"
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-white hover:bg-gray-50 shadow-lg border-2 border-green-500/30"
          style={{
            boxShadow: "0 4px 20px rgba(34, 197, 94, 0.4)",
          }}
        >
          <img
            src="/satoriq-logo.png"
            alt="Tori Assistant"
            className="h-8 w-8 object-contain"
            style={{
              filter: "drop-shadow(0 0 6px #22c55e) drop-shadow(0 0 12px #22c55e60)",
            }}
          />
        </Button>

        {/* Notification dot for new users */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <span className="text-xs text-white font-bold">!</span>
          </motion.div>
        )}
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96"
          >
            <Card className="h-full shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-sm font-bold">T</span>
                    </div>
                    <div>
                      <CardTitle className="text-sm">Tori</CardTitle>
                      <p className="text-xs opacity-90">AI Assistant</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-full p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          message.role === "user" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.parts?.map((part, i) => {
                          if (part.type === "text") {
                            return <div key={i}>{part.text}</div>
                          }
                          return null
                        }) || message.content}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask me anything..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
