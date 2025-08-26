"use client"

import { Button } from "@/components/ui/button"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  isNextDisabled?: boolean
  isSubmitting?: boolean
  isLastStep?: boolean
  buttonText?: string
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled = false,
  isSubmitting = false,
  isLastStep = false,
  buttonText,
}: FormNavigationProps) {
  const getButtonText = () => {
    if (buttonText) return buttonText
    if (isSubmitting) {
      return (
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      )
    }

    if (currentStep === 1) return "Create My Account"
    if (currentStep === 2) return "Add My Experience"
    if (currentStep === 3) return "Upload & Continue"
    if (currentStep === 4) return "Set My Preferences"

    if (isLastStep) return "Complete My Profile"
    return "Next"
  }

  const getHelperText = () => {
    if (currentStep === 1) return "Next: We'll ask about your professional background"
    if (currentStep === 2) return "Next: Time to upload your resume"
    if (currentStep === 3) return "Next: Set your preferences"
    if (currentStep === 4) return "Next: Complete your profile"
    return ""
  }

  return (
    <div className="mt-8">
      {getHelperText() && <div className="text-sm text-gray-500 mb-2">{getHelperText()}</div>}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="button" onClick={onNext} disabled={isNextDisabled || isSubmitting}>
          {getButtonText()}
        </Button>
      </div>
    </div>
  )
}
