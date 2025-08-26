"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Star } from "lucide-react"

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

interface ProfileCompletenessProps {
  formData: {
    // Registration
    fullName: string
    email: string
    phone: string
    linkedinUrl: string
    howDidYouHear: string
    urgency: string
    referralCode: string

    // Background
    jobTitle: string
    currentCompany: string
    isCurrentlyEmployed: boolean
    workExperience: WorkExperience[]
    degrees: Degree[]
    additionalCertifications: string
    preferredLocations: string
    isRemoteOpen: boolean
    remoteOnly: boolean
    yearsOfExperience: string
    skills: string
    careerGoals: string[]
    portfolioUrl: string
    githubUrl: string
    personalWebsite: string
    availabilityDate: string
    noticePeriod: string
    willingToRelocate: boolean
    travelWillingness: number

    // Documents
    resume: File | null
    coverLetter: File | null
    additionalDocuments: File[]

    // Preferences
    targetRoles: string[]
    preferredIndustries: string[]
    salaryExpectations: string
    employmentType: string[]
  }
  currentStep: number
}

export function ProfileCompleteness({ formData, currentStep }: ProfileCompletenessProps) {
  const getProfileCompleteness = () => {
    const checks = [
      // Essential (High Weight)
      { field: formData.fullName, weight: 3, label: "Full Name" },
      { field: formData.email, weight: 3, label: "Email" },
      { field: formData.phone, weight: 3, label: "Phone" },
      { field: formData.jobTitle, weight: 3, label: "Job Title" },
      { field: formData.currentCompany, weight: 3, label: "Current Company" },
      { field: formData.yearsOfExperience, weight: 3, label: "Experience Level" },
      { field: formData.preferredLocations, weight: 3, label: "Preferred Locations" },
      { field: formData.resume, weight: 4, label: "Resume" },
      { field: formData.targetRoles.length > 0, weight: 3, label: "Target Roles" },
      { field: formData.employmentType.length > 0, weight: 3, label: "Employment Type" },

      // Important (Medium Weight)
      { field: formData.degrees.length > 0, weight: 2, label: "Education" },
      { field: formData.skills, weight: 2, label: "Skills" },
      { field: formData.workExperience.length > 0, weight: 2, label: "Work History" },
      { field: formData.urgency, weight: 2, label: "Job Search Timeline" },
      { field: formData.salaryExpectations, weight: 2, label: "Salary Expectations" },

      // Nice to Have (Low Weight)
      { field: formData.linkedinUrl, weight: 1, label: "LinkedIn Profile" },
      { field: formData.coverLetter, weight: 1, label: "Cover Letter" },
      { field: formData.portfolioUrl, weight: 1, label: "Portfolio" },
      { field: formData.careerGoals.length > 0, weight: 1, label: "Career Goals" },
      { field: formData.preferredIndustries.length > 0, weight: 1, label: "Preferred Industries" },
      { field: formData.additionalCertifications, weight: 1, label: "Certifications" },
      { field: formData.githubUrl, weight: 1, label: "GitHub Profile" },
      { field: formData.personalWebsite, weight: 1, label: "Personal Website" },
      { field: formData.additionalDocuments.length > 0, weight: 1, label: "Additional Documents" },
    ]

    const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0)
    const completedWeight = checks.reduce((sum, check) => {
      return sum + (check.field ? check.weight : 0)
    }, 0)

    const percentage = Math.round((completedWeight / totalWeight) * 100)
    const completedFields = checks.filter((check) => check.field)
    const missingFields = checks.filter((check) => !check.field)

    return {
      percentage,
      completedFields,
      missingFields: missingFields.slice(0, 3), // Show top 3 missing
      totalFields: checks.length,
      completedCount: completedFields.length,
    }
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 90) return { text: "Excellent", variant: "default" as const, icon: Star }
    if (percentage >= 80) return { text: "Great", variant: "secondary" as const, icon: CheckCircle }
    if (percentage >= 60) return { text: "Good", variant: "outline" as const, icon: Circle }
    return { text: "Needs Work", variant: "destructive" as const, icon: Circle }
  }

  const completeness = getProfileCompleteness()
  const badge = getScoreBadge(completeness.percentage)
  const BadgeIcon = badge.icon

  // Only show after step 1 (registration)
  if (currentStep <= 1) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 rounded-lg border bg-gradient-to-r from-slate-50 to-green-50 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Profile Strength</h3>
          <Badge variant={badge.variant} className="flex items-center gap-1">
            <BadgeIcon className="h-3 w-3" />
            {badge.text}
          </Badge>
        </div>
        <div className={`text-lg font-bold ${getScoreColor(completeness.percentage)}`}>{completeness.percentage}%</div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Progress value={completeness.percentage} className="h-2" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completeness.percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-0 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {completeness.completedCount} of {completeness.totalFields} sections complete
          </span>
          <span>
            {completeness.percentage >= 80
              ? "🎉 Outstanding profile!"
              : completeness.percentage >= 60
                ? "💪 Almost there!"
                : "🚀 Keep building!"}
          </span>
        </div>

        {completeness.missingFields.length > 0 && completeness.percentage < 90 && (
          <div className="text-xs">
            <p className="font-medium text-slate-700 mb-1">Quick wins to boost your profile:</p>
            <div className="flex flex-wrap gap-1">
              {completeness.missingFields.map((field, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  + {field.label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
