"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CandidateStep2EnhancedProps {
  formData: {
    fullName: string
    email: string
    phone: string
    linkedinUrl: string
    howDidYouHear: string
    currentSituation: string
    urgency: string
    referralCode: string
  }
  updateFormData: (data: Partial<CandidateStep2EnhancedProps["formData"]>) => void
}

export function CandidateStep2Enhanced({ formData, updateFormData }: CandidateStep2EnhancedProps) {
  const hearAboutOptions = [
    "Google Search",
    "LinkedIn",
    "Friend/Colleague Referral",
    "Company Website",
    "Job Board",
    "Social Media",
    "Industry Event",
    "Other",
  ]

  const urgencyOptions = [
    "Actively looking (ready to start within 30 days)",
    "Casually exploring (3-6 months)",
    "Just browsing (6+ months)",
    "Not looking, but open to amazing opportunities",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Create Your Account</h2>
        <p className="text-sm text-muted-foreground">
          Let's create your account so we can start finding you amazing opportunities. This takes less than 2 minutes.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Sarah Johnson"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            required
          />
          <p className="text-xs text-muted-foreground">This is how employers will see your name</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Personal Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="sarah.johnson@gmail.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />
          <p className="text-xs text-muted-foreground">We'll send you personalized job matches here</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            required
          />
          <p className="text-xs text-muted-foreground">For interview scheduling and urgent opportunities</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn Profile URL (optional)</Label>
          <Input
            id="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/sarah-johnson"
            value={formData.linkedinUrl}
            onChange={(e) => updateFormData({ linkedinUrl: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">Increases your profile views by 3x</p>
        </div>

        {/* Enhanced Questions */}
        <div className="space-y-2">
          <Label htmlFor="howDidYouHear">How did you hear about SatoriqOne?</Label>
          <Select value={formData.howDidYouHear} onValueChange={(value) => updateFormData({ howDidYouHear: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {hearAboutOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="urgency">What's your job search timeline?</Label>
          <Select value={formData.urgency} onValueChange={(value) => updateFormData({ urgency: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your timeline" />
            </SelectTrigger>
            <SelectContent>
              {urgencyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Helps us prioritize your profile</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referralCode">Referral Code (optional)</Label>
          <Input
            id="referralCode"
            placeholder="Enter referral code"
            value={formData.referralCode}
            onChange={(e) => updateFormData({ referralCode: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">Get priority access with a referral code</p>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 text-sm">
        <p className="text-blue-800">
          🚀 <strong>Next:</strong> We'll help you showcase your experience to attract top employers and opportunities
          that match your goals.
        </p>
      </div>
    </div>
  )
}
