"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClientStep3Props {
  formData: {
    website: string
    role: string
  }
  updateFormData: (data: Partial<ClientStep3Props["formData"]>) => void
}

export function ClientStep3({ formData, updateFormData }: ClientStep3Props) {
  const roleOptions = [
    "Founder/CEO",
    "CTO/Technical Leader",
    "Head of People/HR",
    "Hiring Manager",
    "Recruiter",
    "Other",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Additional Company Details</h2>
        <p className="text-sm text-muted-foreground">Help us better understand your company and role.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="website">Company Website (optional)</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://www.example.com"
            value={formData.website}
            onChange={(e) => updateFormData({ website: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">
            Your Role <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.role} onValueChange={(value) => updateFormData({ role: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
