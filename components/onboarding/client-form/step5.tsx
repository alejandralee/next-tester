"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

interface ClientStep5Props {
  formData: {
    needsAtsSetup: boolean
    replacingExistingAts: boolean
    importantFeatures: string[]
  }
  updateFormData: (data: Partial<ClientStep5Props["formData"]>) => void
}

export function ClientStep5({ formData, updateFormData }: ClientStep5Props) {
  const featureOptions = [
    "Job Posting",
    "Candidate Sourcing",
    "Evaluation Frameworks",
    "Interview Scheduling",
    "Reporting & Analytics",
    "AI Matching",
    "Candidate Communication",
    "Onboarding",
    "Integration with other tools",
  ]

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      updateFormData({ importantFeatures: [...formData.importantFeatures, feature] })
    } else {
      updateFormData({
        importantFeatures: formData.importantFeatures.filter((f) => f !== feature),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Platform Preferences</h2>
        <p className="text-sm text-muted-foreground">
          Let's configure your hiring platform to match your workflow and preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="needsAtsSetup" className="flex-1">
            Do you need help setting up an ATS?
          </Label>
          <Switch
            id="needsAtsSetup"
            checked={formData.needsAtsSetup}
            onCheckedChange={(checked) => updateFormData({ needsAtsSetup: checked })}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="replacingExistingAts" className="flex-1">
            Are you replacing an existing ATS?
          </Label>
          <Switch
            id="replacingExistingAts"
            checked={formData.replacingExistingAts}
            onCheckedChange={(checked) => updateFormData({ replacingExistingAts: checked })}
          />
        </div>

        <div className="space-y-3">
          <Label>
            What features are most important to you? <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Select the features most important to your hiring process. We'll prioritize these in your setup:
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {featureOptions.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature}`}
                  checked={formData.importantFeatures.includes(feature)}
                  onCheckedChange={(checked) => handleFeatureChange(feature, checked === true)}
                />
                <Label htmlFor={`feature-${feature}`} className="text-sm font-normal">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            🎯 Most successful companies use 4-6 core features. Focus on what matters most to your team right now.
          </p>
        </div>
      </div>
    </div>
  )
}
