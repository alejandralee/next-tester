"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressIndicator } from "@/components/onboarding/progress-indicator"
import { ProgressBar } from "@/components/onboarding/progress-bar"
import { FormNavigation } from "@/components/onboarding/form-navigation"
import { ToriChat } from "@/components/chat/tori-chat"
import { Footer } from "@/components/layout/footer"
import { ClientStep1 } from "@/components/onboarding/client-form/step1"
import { ClientStep2 } from "@/components/onboarding/client-form/step2"
import { ClientStep3 } from "@/components/onboarding/client-form/step3"
import { ClientStep4 } from "@/components/onboarding/client-form/step4"
import { ClientStep5 } from "@/components/onboarding/client-form/step5"
import { ClientStep6 } from "@/components/onboarding/client-form/step6"
import { ClientSuccess } from "@/components/onboarding/client-form/success"

const steps = ["Welcome", "Registration", "Contact", "Hiring Needs", "Preferences", "Confirm"]

export default function ClientOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [formData, setFormData] = useState({
    // Registration Info (Steps 1-2)
    companyName: "",
    companySize: "",
    industry: "",
    fullName: "",
    email: "",
    phone: "",
    linkedinUrl: "",

    // Onboarding Info (Steps 3+)
    website: "",
    role: "",
    hiringRoles: "",
    hiringVolume: "",
    immediateSupport: false,
    needsAtsSetup: false,
    replacingExistingAts: false,
    importantFeatures: [] as string[],
  })

  const [isComplete, setIsComplete] = useState(false)

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = async () => {
    // Complete registration after step 2
    if (currentStep === 1 && !isRegistered) {
      setIsSubmitting(true)
      // Simulate registration API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      setIsRegistered(true)
      setCurrentStep((prev) => prev + 1)
      return
    }

    // Complete onboarding after final step
    if (currentStep === steps.length - 1) {
      setIsSubmitting(true)
      // Simulate onboarding completion API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      setIsComplete(true)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      router.push("/")
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case 0: // Welcome
        return false
      case 1: // Registration
        return (
          !formData.companyName ||
          !formData.fullName ||
          !formData.email ||
          !formData.phone ||
          !formData.companySize ||
          !formData.industry
        )
      case 2: // Contact
        return !formData.role
      case 3: // Hiring Needs
        return !formData.hiringVolume
      case 4: // Preferences
        return formData.importantFeatures.length === 0
      default:
        return false
    }
  }

  const getCurrentPhase = () => {
    if (currentStep <= 1) return "registration"
    return "onboarding"
  }

  const getStepTitle = () => {
    if (currentStep <= 1) {
      return "Registration"
    }
    return "Onboarding"
  }

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  if (isComplete) {
    return <ClientSuccess />
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 z-10 p-6">
        <img src="/satoriq-brand-logo.png" alt="Satoriq" className="h-20 w-auto" />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-slate-100 p-2">
                <img
                  src="/satoriq-logo.png"
                  alt="Satoriq Logo"
                  className="h-full w-full object-contain"
                  style={{
                    filter: "drop-shadow(0 0 8px #22c55e) drop-shadow(0 0 16px #22c55e40)",
                  }}
                />
              </div>
              <CardTitle className="text-2xl font-bold">SatoriqOne – Hiring Suite {getStepTitle()}</CardTitle>
              {isRegistered && currentStep === 2 && (
                <div className="mt-2 text-sm text-green-600 font-medium">
                  ✓ Registration Complete - Welcome to SatoriqOne!
                </div>
              )}
            </CardHeader>
            <CardContent>
              <ProgressBar currentStep={currentStep} totalSteps={steps.length} phase={getCurrentPhase()} />

              <ProgressIndicator steps={steps} currentStep={currentStep} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && <ClientStep1 />}
                  {currentStep === 1 && <ClientStep2 formData={formData} updateFormData={updateFormData} />}
                  {currentStep === 2 && <ClientStep3 formData={formData} updateFormData={updateFormData} />}
                  {currentStep === 3 && <ClientStep4 formData={formData} updateFormData={updateFormData} />}
                  {currentStep === 4 && <ClientStep5 formData={formData} updateFormData={updateFormData} />}
                  {currentStep === 5 && <ClientStep6 formData={formData} />}
                </motion.div>
              </AnimatePresence>

              <FormNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onBack={handleBack}
                onNext={handleNext}
                isNextDisabled={isNextDisabled()}
                isSubmitting={isSubmitting}
                isLastStep={currentStep === steps.length - 1}
                buttonText={currentStep === 1 ? "Complete Registration" : undefined}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tori Chat Assistant */}
      <ToriChat context="client-onboarding" currentStep={currentStep} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
