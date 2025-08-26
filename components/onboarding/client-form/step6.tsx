"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ClientStep6Props {
  formData: {
    companyName: string
    website: string
    industry: string
    companySize: string
    fullName: string
    workEmail: string
    role: string
    hiringRoles: string
    hiringVolume: string
    immediateSupport: boolean
    needsAtsSetup: boolean
    replacingExistingAts: boolean
    importantFeatures: string[]
  }
}

export function ClientStep6({ formData }: ClientStep6Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Review Your Information</h2>
        <p className="text-sm text-muted-foreground">Please review your information before submitting.</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Company Details</h3>
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Company Name:</span>
                <span className="col-span-2">{formData.companyName}</span>
              </div>
              {formData.website && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Website:</span>
                  <span className="col-span-2 truncate">{formData.website}</span>
                </div>
              )}
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Industry:</span>
                <span className="col-span-2">{formData.industry}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Company Size:</span>
                <span className="col-span-2">{formData.companySize}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Contact Information</h3>
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="col-span-2">{formData.fullName}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Work Email:</span>
                <span className="col-span-2">{formData.workEmail}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Role:</span>
                <span className="col-span-2">{formData.role}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Hiring Needs</h3>
            <div className="grid gap-2 text-sm">
              {formData.hiringRoles && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Hiring Roles:</span>
                  <span className="col-span-2">{formData.hiringRoles}</span>
                </div>
              )}
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Hiring Volume:</span>
                <span className="col-span-2">{formData.hiringVolume}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Immediate Support:</span>
                <span className="col-span-2">{formData.immediateSupport ? "Yes" : "No"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Platform Preferences</h3>
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Needs ATS Setup:</span>
                <span className="col-span-2">{formData.needsAtsSetup ? "Yes" : "No"}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Replacing Existing ATS:</span>
                <span className="col-span-2">{formData.replacingExistingAts ? "Yes" : "No"}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Important Features:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {formData.importantFeatures.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg bg-primary/5 p-4 text-center text-sm">
        <p>
          By clicking "Submit", you agree to our{" "}
          <a href="#" className="text-primary underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
