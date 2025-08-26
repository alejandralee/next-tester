"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToriChat } from "@/components/chat/tori-chat"
import { Footer } from "@/components/layout/footer"

export default function WelcomePage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    if (role === "candidate") {
      router.push("/candidate")
    } else if (role === "client") {
      router.push("/client")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 z-10 p-6">
        <img src="/satoriq-brand-logo.png" alt="Satoriq" className="h-20 w-auto" />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-slate-100 p-2 shadow-lg shadow-green-500/50 ring-2 ring-green-500/30">
                <img
                  src="/satoriq-logo.png"
                  alt="Satoriq Logo"
                  className="h-full w-full object-contain"
                  style={{
                    filter: "drop-shadow(0 0 8px #22c55e) drop-shadow(0 0 16px #22c55e40)",
                  }}
                />
              </div>
              <CardTitle className="text-3xl font-bold">Hi, I'm Tori! What can I help you with today?</CardTitle>
              <CardDescription className="text-lg">
                Please select your role to begin the onboarding process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <RoleCard
                  title="SatoriqOne"
                  description="Candidate Suite"
                  role="candidate"
                  selected={selectedRole === "candidate"}
                  onSelect={handleRoleSelect}
                />
                <RoleCard
                  title="SatoriqOne"
                  description="Hiring Suite"
                  role="client"
                  selected={selectedRole === "client"}
                  onSelect={handleRoleSelect}
                />
              </div>
            </CardContent>
          </Card>

          {/* Success Stories Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid gap-6 md:grid-cols-2"
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <h3 className="mb-3 text-lg font-semibold text-slate-800">For Candidates</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Join <span className="font-semibold text-green-600">12,000+ professionals</span> who've transformed
                  their careers with SatoriqOne. Our candidates secure roles with{" "}
                  <span className="font-semibold">40% higher compensation on average</span>, advance to senior positions
                  2x faster, and discover career paths they never knew existed. Your breakthrough opportunity is
                  waiting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <h3 className="mb-3 text-lg font-semibold text-slate-800">For Clients</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Trusted by <span className="font-semibold text-green-600">1,200+ forward-thinking companies</span> to
                  revolutionize their hiring process. Our clients reduce{" "}
                  <span className="font-semibold">time-to-hire by 65%</span>, improve employee retention by 85%, and
                  access talent pools that drive unprecedented growth. Transform your hiring today.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* SatoriqIQ Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-8 text-center">
                <h3 className="mb-4 text-xl font-semibold text-slate-800">After a few questions, you'll unlock:</h3>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 11H1l6-6v18l6-6h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-8Z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-slate-800">Intelligent Talent Matching</h4>
                    <p className="text-sm text-slate-600">
                      AI-powered connections between top talent and ideal opportunities
                    </p>
                  </div>

                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-slate-800">Smart Evaluation Tools</h4>
                    <p className="text-sm text-slate-600">Advanced assessment frameworks for better hiring decisions</p>
                  </div>

                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-slate-800">Market Intelligence</h4>
                    <p className="text-sm text-slate-600">
                      Data-driven insights for career growth and strategic hiring
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-white/50 p-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <span className="font-semibold text-green-600">SatoriqIQ</span> is our Talent Intelligence Engine
                    that transforms how exceptional talent and innovative organizations connect. Whether you're ready to
                    accelerate your career or build your dream team, our AI-powered platform delivers personalized
                    insights, strategic matching, and proven success indicators to help you achieve your next
                    breakthrough.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Tori Chat Assistant */}
      <ToriChat context="welcome" />

      {/* Footer */}
      <Footer />
    </div>
  )
}

interface RoleCardProps {
  title: string
  description: string
  role: string
  selected: boolean
  onSelect: (role: string) => void
}

function RoleCard({ title, description, role, selected, onSelect }: RoleCardProps) {
  const router = useRouter()
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`cursor-pointer transition-all ${
          selected ? "border-2 border-primary bg-primary/5" : "border border-slate-200"
        }`}
        onClick={() => {
          onSelect(role)
        }}
      >
        <CardContent className="p-4">
          <div className="flex h-24 items-center justify-center rounded-md">
            {role === "candidate" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
              </svg>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span className={`text-lg font-medium ${selected ? "text-primary" : "text-slate-600"}`}>
            I'm a {role === "candidate" ? "Candidate" : "Client"}
          </span>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
