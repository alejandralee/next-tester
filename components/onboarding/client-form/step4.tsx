"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { formData } from "@/types/formData" // Assuming formData is declared in a separate file

interface ClientStep4Props {
  formData: formData
  updateFormData: (data: Partial<typeof formData>) => void
}

export function ClientStep4({ formData, updateFormData }: ClientStep4Props) {
  const hiringVolumeOptions = ["1-5 roles", "6-15 roles", "15+ roles"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Hiring Needs</h2>
        <p className="text-sm text-muted-foreground">
          Tell us about your current hiring challenges so we can provide the most relevant solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hiringRoles">What roles are you hiring for now? (Optional)</Label>
          <Textarea
            id="hiringRoles"
            placeholder="e.g., Senior Full-Stack Engineers with React experience, Product Managers for B2B SaaS, Sales Development Representatives for enterprise sales"
            value={formData.hiringRoles}
            onChange={(e) => updateFormData({ hiringRoles: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">The more specific you are, the better candidates we can find</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hiringVolume">
            Volume of Hiring <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.hiringVolume} onValueChange={(value) => updateFormData({ hiringVolume: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select hiring volume" />
            </SelectTrigger>
            <SelectContent>
              {hiringVolumeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">This helps us recommend the right service level</p>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="immediateSupport"
            checked={formData.immediateSupport}
            onCheckedChange={(checked) => updateFormData({ immediateSupport: checked === true })}
          />
          <Label htmlFor="immediateSupport" className="text-sm font-normal">
            I need immediate hiring support
          </Label>
          <p className="text-xs text-muted-foreground">Get priority access to our team</p>
        </div>
        <p className="text-xs text-muted-foreground">
          💡 Companies that provide detailed role descriptions get 60% more qualified applicants.
        </p>
      </div>
    </div>
  )
}
