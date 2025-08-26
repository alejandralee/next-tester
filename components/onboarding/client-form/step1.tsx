"use client"

import { motion } from "framer-motion"

export function ClientStep1() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-center text-2xl font-bold">Welcome to SatoriqOne</h2>
        <p className="mt-2 text-center text-muted-foreground">
          Let's set up your company profile to streamline your hiring process.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-auto max-w-md rounded-lg bg-slate-50 p-6 text-center"
      >
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
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
              <path d="M3 21h18" />
              <path d="M5 21V7l8-4v18" />
              <path d="M19 21V11l-6-4" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium">Hiring Suite</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll collect some information about your company and hiring needs. This should take about 5 minutes to
          complete.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-muted-foreground"
      >
        Click "Next" to begin setting up your company profile.
      </motion.div>
    </div>
  )
}
