"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import type { CandidateStep5Props } from "@/types/candidate-form" // Assuming CandidateStep5Props is declared in a separate file

export function CandidateStep5({ formData, updateFormData }: CandidateStep5Props) {
  const roleOptions = [
    "Software Engineering",
    "Product Management",
    "Data Science",
    "Design",
    "Marketing",
    "Sales",
    "Operations",
    "Human Resources",
    "Finance",
    "Customer Support",
  ]

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

  const employmentTypeOptions = ["Full-Time", "Part-Time", "Contract", "Internship"]

  const handleRoleChange = (role: string, checked: boolean) => {
    if (checked) {
      updateFormData({ targetRoles: [...formData.targetRoles, role] })
    } else {
      updateFormData({
        targetRoles: formData.targetRoles.filter((r) => r !== role),
      })
    }
  }

  const handleIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      updateFormData({ preferredIndustries: [...formData.preferredIndustries, industry] })
    } else {
      updateFormData({
        preferredIndustries: formData.preferredIndustries.filter((i) => i !== industry),
      })
    }
  }

  const handleEmploymentTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      updateFormData({ employmentType: [...formData.employmentType, type] })
    } else {
      updateFormData({
        employmentType: formData.employmentType.filter((t) => t !== type),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">What's your dream role?</h2>
        <p className="text-sm text-muted-foreground">
          Tell us what you're looking for so we can find opportunities that excite you.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>
            What roles are you targeting? <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">Select all that interest you - we'll find the best matches</p>
          <div className="grid grid-cols-2 gap-2">
            {roleOptions.map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Checkbox
                  id={`role-${role}`}
                  checked={formData.targetRoles.includes(role)}
                  onCheckedChange={(checked) => handleRoleChange(role, checked === true)}
                />
                <Label htmlFor={`role-${role}`} className="text-sm font-normal">
                  {role}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Preferred industries</Label>
          <p className="text-sm text-muted-foreground">Choose industries you'd love to work in (optional)</p>
          <div className="grid grid-cols-2 gap-2">
            {industryOptions.map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={`industry-${industry}`}
                  checked={formData.preferredIndustries.includes(industry)}
                  onCheckedChange={(checked) => handleIndustryChange(industry, checked === true)}
                />
                <Label htmlFor={`industry-${industry}`} className="text-sm font-normal">
                  {industry}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salaryExpectations">Salary expectations</Label>
          <p className="text-sm text-muted-foreground">This helps us filter out low-paying opportunities</p>
          <Input
            id="salaryExpectations"
            placeholder="$80,000 - $120,000 (we'll keep this confidential)"
            value={formData.salaryExpectations}
            onChange={(e) => updateFormData({ salaryExpectations: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <Label>
            Type of employment <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">We'll only show you the work styles you want</p>
          <div className="flex flex-wrap gap-4">
            {employmentTypeOptions.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={formData.employmentType.includes(type)}
                  onCheckedChange={(checked) => handleEmploymentTypeChange(type, checked === true)}
                />
                <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        🎯 The more specific you are, the better we can match you with roles you'll actually love.
      </p>
    </div>
  )
}
