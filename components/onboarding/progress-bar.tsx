"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  phase?: "registration" | "onboarding"
}

export function ProgressBar({ currentStep, totalSteps, phase }: ProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100

  const getPhaseInfo = () => {
    if (!phase) return null

    if (phase === "registration") {
      const registrationProgress = currentStep <= 1 ? ((currentStep + 1) / 2) * 100 : 100
      return {
        label: "Registration",
        percentage: Math.round(registrationProgress),
      }
    } else {
      const onboardingSteps = totalSteps - 2
      const onboardingCurrentStep = Math.max(0, currentStep - 1)
      const onboardingProgress = (onboardingCurrentStep / onboardingSteps) * 100
      return {
        label: "Onboarding",
        percentage: Math.round(onboardingProgress),
      }
    }
  }

  const phaseInfo = getPhaseInfo()

  const getMotivationalMessage = () => {
    if (progressPercentage <= 25) {
      return "Great start! You're on your way to amazing opportunities."
    } else if (progressPercentage <= 50) {
      return "Halfway there! Your profile is looking great."
    } else if (progressPercentage <= 75) {
      return "Almost done! You're about to unlock personalized matches."
    } else {
      return "Final stretch! Get ready to connect with top opportunities."
    }
  }

  const motivationalMessage = getMotivationalMessage()

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">{phaseInfo ? phaseInfo.label : "Progress"}</span>
          {phaseInfo && <span className="text-xs text-slate-500">({phaseInfo.percentage}% complete)</span>}
        </div>
        <span className="text-sm text-slate-500">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>

      <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">{motivationalMessage}</p>
    </div>
  )
}
