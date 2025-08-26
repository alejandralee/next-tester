"use client"

import { motion } from "framer-motion"

export function CandidateStep1() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-center text-2xl font-bold">Welcome to SatoriqOne</h2>
        <p className="mt-2 text-center text-muted-foreground">
          Let's set up your talent profile to help you find the perfect job opportunities.
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium">Candidate Suite</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll collect some information to help match you with the right opportunities. This should take about 5
          minutes to complete.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-muted-foreground"
      >
        Click "Next" to begin setting up your profile.
      </motion.div>
    </div>
  )
}
