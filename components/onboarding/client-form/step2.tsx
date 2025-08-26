"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClientStep2Props {
  formData: {
    companyName: string
    companySize: string
    industry: string
    fullName: string
    email: string
    phone: string
    linkedinUrl: string
  }
  updateFormData: (data: Partial<ClientStep2Props["formData"]>) => void
}

export function ClientStep2({ formData, updateFormData }: ClientStep2Props) {
  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Media & Entertainment",
    "Government",
    "Non-profit",
    "Other",
  ]

  const companySizeOptions = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1001-5000 employees",
    "5001+ employees",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Create Your Company Account</h2>
        <p className="text-sm text-muted-foreground">
          Let's set up your company account so we can start finding you exceptional talent. This takes about 3 minutes.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              placeholder="Acme Inc."
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
              required
            />
            <p className="text-sm text-muted-foreground">This is how candidates will see your company</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">
              Company Size <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.companySize} onValueChange={(value) => updateFormData({ companySize: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {companySizeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Helps us understand your hiring scale</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">
            Industry <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.industry} onValueChange={(value) => updateFormData({ industry: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">We'll find candidates familiar with your sector</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Your Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Work Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@company.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              required
            />
            <p className="text-sm text-muted-foreground">We'll send you qualified candidate matches here</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn Profile (optional)</Label>
            <Input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/johndoe"
              value={formData.linkedinUrl}
              onChange={(e) => updateFormData({ linkedinUrl: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 text-sm">
        <p className="text-blue-800">
          🚀 Next: We'll customize your hiring experience based on your specific needs and preferences.
        </p>
      </div>
    </div>
  )
}
