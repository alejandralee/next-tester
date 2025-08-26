"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressIndicator } from "@/components/onboarding/progress-indicator"
import { ProgressBar } from "@/components/onboarding/progress-bar"
import { ProfileCompleteness } from "@/components/onboarding/profile-completeness"
import { FormNavigation } from "@/components/onboarding/form-navigation"
import { ToriChat } from "@/components/chat/tori-chat"
import { Footer } from "@/components/layout/footer"
import { CandidateStep1 } from "@/components/onboarding/candidate-form/step1"
import { CandidateStep2 } from "@/components/onboarding/candidate-form/step2"
import { CandidateStep3 } from "@/components/onboarding/candidate-form/step3"
import { CandidateStep4 } from "@/components/onboarding/candidate-form/step4"
import { CandidateStep5 } from "@/components/onboarding/candidate-form/step5"
import { CandidateStep6 } from "@/components/onboarding/candidate-form/step6"
import { CandidateSuccess } from "@/components/onboarding/candidate-form/success"

const steps = ["Welcome", "Registration", "Background", "Documents", "Preferences", "Confirm"]

interface Degree {
  id: string
  level: string
  university: string
  degreeType: string
  concentration: string
  graduationYear: string
}

interface WorkExperience {
  id: string
  company: string
  title: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
}

export default function CandidateOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [formData, setFormData] = useState({
    // Registration Info (Steps 1-2)
    fullName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    howDidYouHear: "",
    urgency: "",
    referralCode: "",

    // Background Info (Step 3)
    jobTitle: "",
    currentCompany: "",
    isCurrentlyEmployed: true,
    workExperience: [] as WorkExperience[],
    degrees: [] as Degree[],
    additionalCertifications: "",
    preferredLocations: "",
    isRemoteOpen: false,
    remoteOnly: false,
    yearsOfExperience: "",
    skills: "",
    careerGoals: [] as string[],
    portfolioUrl: "",
    githubUrl: "",
    personalWebsite: "",
    availabilityDate: "",
    noticePeriod: "",
    willingToRelocate: false,
    travelWillingness: 0,

    // Documents (Step 4)
    resume: null as File | null,
    coverLetter: null as File | null,
    additionalDocuments: [] as File[],

    // Preferences (Step 5)
    targetRoles: [] as string[],
    preferredIndustries: [] as string[],
    salaryExpectations: "",
    employmentType: [] as string[],
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
        return !formData.fullName || !formData.email || !formData.phone
      case 2: // Background
        return (
          !formData.jobTitle ||
          !formData.currentCompany ||
          !formData.yearsOfExperience ||
          formData.degrees.length === 0 ||
          !formData.preferredLocations
        )
      case 3: // Documents
        return !formData.resume
      case 4: // Preferences
        return formData.targetRoles.length === 0 || formData.employmentType.length === 0
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
    return <CandidateSuccess />
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
              <CardTitle className="text-2xl font-bold">SatoriqOne – Candidate Suite {getStepTitle()}</CardTitle>
              {isRegistered && currentStep === 2 && (
                <div className="mt-2 text-sm text-green-600 font-medium">
                  ✓ Registration Complete - Welcome to SatoriqOne!
                </div>
              )}
            </CardHeader>
            <CardContent>
              <ProgressBar currentStep={currentStep} totalSteps={steps.length} phase={getCurrentPhase()} />

              <ProfileCompleteness formData={formData} currentStep={currentStep} />

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
                  {currentStep === 0 && <CandidateStep1 />}
                  {currentStep === 1 && <CandidateStep2 formData={formData} updateFormData={updateFormData} />}
                  {currentStep === 2 && <CandidateStep3 formData={formData} updateFormData={updateFormData} />}
                  {currentStep === 3 && <CandidateStep4 formData={formData} updateFormData={updateFormData} />}
                  {currentStep === 4 && <CandidateStep5 formData={formData} updateFormData={updateFormData} />}
                  {currentStep === 5 && <CandidateStep6 formData={formData} />}
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
      <ToriChat context="candidate-onboarding" currentStep={currentStep} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
