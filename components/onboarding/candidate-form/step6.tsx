"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

interface CandidateStep6Props {
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
}

export function CandidateStep6({ formData }: CandidateStep6Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Review Your Information</h2>
        <p className="text-sm text-muted-foreground">Please review your information before submitting.</p>
      </div>

      <div className="space-y-4">
        {/* Contact Information */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Contact Information</h3>
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="col-span-2">{formData.fullName}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Email:</span>
                <span className="col-span-2">{formData.email}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Phone:</span>
                <span className="col-span-2">{formData.phone}</span>
              </div>
              {formData.linkedinUrl && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">LinkedIn:</span>
                  <span className="col-span-2 truncate">{formData.linkedinUrl}</span>
                </div>
              )}
              {formData.howDidYouHear && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">How did you hear about us:</span>
                  <span className="col-span-2">{formData.howDidYouHear}</span>
                </div>
              )}
              {formData.urgency && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Job search timeline:</span>
                  <span className="col-span-2">{formData.urgency}</span>
                </div>
              )}
              {formData.referralCode && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Referral code:</span>
                  <span className="col-span-2">{formData.referralCode}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Current Position */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Current Position</h3>
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Job Title:</span>
                <span className="col-span-2">{formData.jobTitle}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Company:</span>
                <span className="col-span-2">{formData.currentCompany}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Experience:</span>
                <span className="col-span-2">{formData.yearsOfExperience}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Currently Employed:</span>
                <span className="col-span-2">{formData.isCurrentlyEmployed ? "Yes" : "No"}</span>
              </div>
              {formData.noticePeriod && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Notice Period:</span>
                  <span className="col-span-2">{formData.noticePeriod}</span>
                </div>
              )}
              {formData.availabilityDate && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Available Start Date:</span>
                  <span className="col-span-2">{formData.availabilityDate}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Work Experience */}
        {formData.workExperience.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-medium">Work Experience</h3>
              <div className="space-y-3">
                {formData.workExperience.map((exp, index) => (
                  <div key={exp.id} className="border-l-2 border-green-200 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{exp.title}</span>
                      {exp.isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </p>
                    {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Education */}
        {formData.degrees.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-medium">Education</h3>
              <div className="space-y-3">
                {formData.degrees.map((degree, index) => (
                  <div key={degree.id} className="border-l-2 border-blue-200 pl-4">
                    <div className="font-medium">{degree.level}</div>
                    {degree.university && <p className="text-sm text-muted-foreground">{degree.university}</p>}
                    {degree.degreeType && degree.concentration && (
                      <p className="text-sm">
                        {degree.degreeType} in {degree.concentration}
                      </p>
                    )}
                    {degree.graduationYear && (
                      <p className="text-xs text-muted-foreground">Graduated: {degree.graduationYear}</p>
                    )}
                  </div>
                ))}
              </div>
              {formData.additionalCertifications && (
                <div className="mt-3 pt-3 border-t">
                  <span className="text-sm font-medium">Additional Certifications: </span>
                  <span className="text-sm">{formData.additionalCertifications}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Location & Availability */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Location & Availability</h3>
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Preferred Locations:</span>
                <span className="col-span-2">{formData.preferredLocations}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Open to Remote:</span>
                <span className="col-span-2">{formData.isRemoteOpen ? "Yes" : "No"}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Remote Only:</span>
                <span className="col-span-2">{formData.remoteOnly ? "Yes" : "No"}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Willing to Relocate:</span>
                <span className="col-span-2">{formData.willingToRelocate ? "Yes" : "No"}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Travel Willingness:</span>
                <span className="col-span-2">{formData.travelWillingness}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Links */}
        {(formData.portfolioUrl || formData.githubUrl || formData.personalWebsite) && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-medium">Professional Links</h3>
              <div className="grid gap-2 text-sm">
                {formData.portfolioUrl && (
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Portfolio:</span>
                    <span className="col-span-2 truncate">{formData.portfolioUrl}</span>
                  </div>
                )}
                {formData.githubUrl && (
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">GitHub:</span>
                    <span className="col-span-2 truncate">{formData.githubUrl}</span>
                  </div>
                )}
                {formData.personalWebsite && (
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Personal Website:</span>
                    <span className="col-span-2 truncate">{formData.personalWebsite}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills & Career Goals */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Skills & Career Goals</h3>
            {formData.skills && (
              <div className="mb-3">
                <span className="text-sm font-medium text-muted-foreground">Skills: </span>
                <span className="text-sm">{formData.skills}</span>
              </div>
            )}
            {formData.careerGoals.length > 0 && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Career Goals:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {formData.careerGoals.map((goal) => (
                    <Badge key={goal} variant="secondary">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Documents</h3>
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Resume:</span>
                <span className="col-span-2">{formData.resume?.name || "No file uploaded"}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Cover Letter:</span>
                <span className="col-span-2">{formData.coverLetter?.name || "No file uploaded"}</span>
              </div>
              {formData.additionalDocuments.length > 0 && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Additional Documents:</span>
                  <div className="col-span-2 space-y-1">
                    {formData.additionalDocuments.map((doc, index) => (
                      <div key={index} className="text-sm">
                        {doc.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Search Preferences */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-medium">Job Search Preferences</h3>
            <div className="grid gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Target Roles:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {formData.targetRoles.map((role) => (
                    <Badge key={role} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              {formData.preferredIndustries.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Preferred Industries:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {formData.preferredIndustries.map((industry) => (
                      <Badge key={industry} variant="secondary">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.salaryExpectations && (
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Salary Expectations:</span>
                  <span className="col-span-2">{formData.salaryExpectations}</span>
                </div>
              )}

              <div>
                <span className="text-muted-foreground">Employment Type:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {formData.employmentType.map((type) => (
                    <Badge key={type} variant="secondary">
                      {type}
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
