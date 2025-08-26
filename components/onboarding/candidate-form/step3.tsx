"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { X, Plus, Trash2, MapPin, Building, Calendar } from "lucide-react"

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

interface CandidateStep3Props {
  formData: {
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
  }
  updateFormData: (data: Partial<CandidateStep3Props["formData"]>) => void
}

// Enhanced Location input component
function LocationAutocomplete({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [inputValue, setInputValue] = useState("")
  const [selectedLocations, setSelectedLocations] = useState<string[]>(value ? value.split(", ").filter(Boolean) : [])

  // Popular cities for suggestions
  const popularCities = [
    "New York, NY",
    "San Francisco, CA",
    "Los Angeles, CA",
    "Chicago, IL",
    "Boston, MA",
    "Seattle, WA",
    "Austin, TX",
    "Denver, CO",
    "Atlanta, GA",
    "Miami, FL",
    "Washington, DC",
    "Philadelphia, PA",
    "San Diego, CA",
    "Phoenix, AZ",
    "Dallas, TX",
    "Portland, OR",
    "Nashville, TN",
    "Charlotte, NC",
    "Minneapolis, MN",
    "Detroit, MI",
  ]

  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.length > 1) {
      const filtered = popularCities.filter(
        (city) => city.toLowerCase().includes(value.toLowerCase()) && !selectedLocations.includes(city),
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addLocation(inputValue.trim())
    }
  }

  const addLocation = (location: string) => {
    if (location && !selectedLocations.includes(location)) {
      const newLocations = [...selectedLocations, location]
      setSelectedLocations(newLocations)
      onChange(newLocations.join(", "))
      setInputValue("")
      setSuggestions([])
    }
  }

  const removeLocation = (locationToRemove: string) => {
    const newLocations = selectedLocations.filter((loc) => loc !== locationToRemove)
    setSelectedLocations(newLocations)
    onChange(newLocations.join(", "))
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          placeholder="Type location and press Enter or comma to add..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {suggestions.map((city) => (
              <div
                key={city}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2"
                onClick={() => addLocation(city)}
              >
                <MapPin className="h-4 w-4 text-gray-400" />
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLocations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLocations.map((location) => (
            <Badge key={location} variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeLocation(location)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export function CandidateStep3({ formData, updateFormData }: CandidateStep3Props) {
  const experienceOptions = ["Less than 1 year", "1-2 years", "3-5 years", "6-10 years", "10+ years"]
  const noticePeriodOptions = ["Immediately", "2 weeks", "1 month", "2 months", "3+ months"]

  const educationLevels = [
    "High School Diploma/GED",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree (PhD)",
    "Professional Degree (JD, MD, etc.)",
    "Trade/Technical Certification",
    "Some College (No Degree)",
  ]

  const degreeTypes = [
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BS)",
    "Bachelor of Engineering (BE/BEng)",
    "Bachelor of Business Administration (BBA)",
    "Master of Arts (MA)",
    "Master of Science (MS)",
    "Master of Business Administration (MBA)",
    "Master of Engineering (MEng)",
    "Doctor of Philosophy (PhD)",
    "Juris Doctor (JD)",
    "Doctor of Medicine (MD)",
    "Other",
  ]

  // Generate years from current year back to 1960
  const currentYear = new Date().getFullYear()
  const graduationYears = Array.from({ length: currentYear - 1959 }, (_, i) => (currentYear - i).toString())

  // Work Experience Functions
  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    }
    updateFormData({ workExperience: [...formData.workExperience, newExperience] })
  }

  const updateWorkExperience = (id: string, field: keyof Omit<WorkExperience, "id">, value: string | boolean) => {
    const updatedExperience = formData.workExperience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    updateFormData({ workExperience: updatedExperience })
  }

  const removeWorkExperience = (id: string) => {
    const updatedExperience = formData.workExperience.filter((exp) => exp.id !== id)
    updateFormData({ workExperience: updatedExperience })
  }

  // Degree Functions
  const addDegree = () => {
    const newDegree: Degree = {
      id: Date.now().toString(),
      level: "",
      university: "",
      degreeType: "",
      concentration: "",
      graduationYear: "",
    }
    updateFormData({ degrees: [...formData.degrees, newDegree] })
  }

  const updateDegree = (id: string, field: keyof Omit<Degree, "id">, value: string) => {
    const updatedDegrees = formData.degrees.map((degree) => (degree.id === id ? { ...degree, [field]: value } : degree))
    updateFormData({ degrees: updatedDegrees })
  }

  const removeDegree = (id: string) => {
    const updatedDegrees = formData.degrees.filter((degree) => degree.id !== id)
    updateFormData({ degrees: updatedDegrees })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Tell us about your professional background</h2>
        <p className="text-sm text-muted-foreground">
          This helps us match you with roles that fit your experience level and career goals.
        </p>
      </div>

      {/* Current Position */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
          <Building className="h-5 w-5 text-green-600" />
          Current Position
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">
              Current Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="jobTitle"
              placeholder="Senior Software Engineer"
              value={formData.jobTitle}
              onChange={(e) => updateFormData({ jobTitle: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentCompany">
              Current Company <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentCompany"
              placeholder="Tech Corp Inc."
              value={formData.currentCompany}
              onChange={(e) => updateFormData({ currentCompany: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">
              Years of Professional Experience (not including internships) <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.yearsOfExperience}
              onValueChange={(value) => updateFormData({ yearsOfExperience: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="noticePeriod">Notice Period</Label>
            <Select value={formData.noticePeriod} onValueChange={(value) => updateFormData({ noticePeriod: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select notice period" />
              </SelectTrigger>
              <SelectContent>
                {noticePeriodOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isCurrentlyEmployed"
            checked={!formData.isCurrentlyEmployed}
            onCheckedChange={(checked) => updateFormData({ isCurrentlyEmployed: !checked })}
          />
          <Label htmlFor="isCurrentlyEmployed" className="text-sm">
            I am no longer employed at this company
          </Label>
        </div>
      </div>

      {/* Work Experience History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Work Experience History
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addWorkExperience}
            className="flex items-center gap-2 bg-transparent"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </div>

        {formData.workExperience.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500 mb-3">Add your work experience to strengthen your profile</p>
            <Button type="button" onClick={addWorkExperience} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Add Work Experience
            </Button>
          </div>
        )}

        {formData.workExperience.map((experience, index) => (
          <Card key={experience.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {experience.title || `Experience ${index + 1}`}
                  {experience.isCurrent && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Current
                    </Badge>
                  )}
                </CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWorkExperience(experience.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    placeholder="Software Engineer"
                    value={experience.title}
                    onChange={(e) => updateWorkExperience(experience.id, "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    placeholder="Company Name"
                    value={experience.company}
                    onChange={(e) => updateWorkExperience(experience.id, "company", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateWorkExperience(experience.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateWorkExperience(experience.id, "endDate", e.target.value)}
                    disabled={experience.isCurrent}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.isCurrent}
                    onCheckedChange={(checked) => updateWorkExperience(experience.id, "isCurrent", checked === true)}
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-sm">
                    Current Role
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea
                  placeholder="Describe your key responsibilities and achievements..."
                  value={experience.description}
                  onChange={(e) => updateWorkExperience(experience.id, "description", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800">Education</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addDegree}
            className="flex items-center gap-2 bg-transparent"
          >
            <Plus className="h-4 w-4" />
            Add Degree
          </Button>
        </div>

        {formData.degrees.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500 mb-3">Add your education background</p>
            <Button type="button" onClick={addDegree} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </div>
        )}

        {formData.degrees.map((degree, index) => (
          <Card key={degree.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{degree.level || `Degree ${index + 1}`}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDegree(degree.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Education Level</Label>
                <Select value={degree.level} onValueChange={(value) => updateDegree(degree.id, "level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {degree.level && !degree.level.includes("High School") && !degree.level.includes("Some College") && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>University/Institution</Label>
                      <Input
                        placeholder="Stanford University"
                        value={degree.university}
                        onChange={(e) => updateDegree(degree.id, "university", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Graduation Year</Label>
                      <Select
                        value={degree.graduationYear}
                        onValueChange={(value) => updateDegree(degree.id, "graduationYear", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {graduationYears.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Degree Type</Label>
                      <Select
                        value={degree.degreeType}
                        onValueChange={(value) => updateDegree(degree.id, "degreeType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree type" />
                        </SelectTrigger>
                        <SelectContent>
                          {degreeTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Major/Concentration</Label>
                      <Input
                        placeholder="Computer Science"
                        value={degree.concentration}
                        onChange={(e) => updateDegree(degree.id, "concentration", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="space-y-2">
          <Label htmlFor="additionalCertifications">Additional Certifications (optional)</Label>
          <Input
            id="additionalCertifications"
            placeholder="AWS Certified Solutions Architect, PMP, Google Analytics..."
            value={formData.additionalCertifications}
            onChange={(e) => updateFormData({ additionalCertifications: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Include professional certifications, licenses, or specialized training
          </p>
        </div>
      </div>

      {/* Enhanced Location & Availability */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Location & Availability
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preferredLocations">
              Preferred Location(s) <span className="text-red-500">*</span>
            </Label>
            <LocationAutocomplete
              value={formData.preferredLocations}
              onChange={(value) => updateFormData({ preferredLocations: value })}
            />
            <p className="text-xs text-muted-foreground">Add multiple locations to increase your opportunities</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="availabilityDate">Available Start Date</Label>
              <Input
                id="availabilityDate"
                type="date"
                value={formData.availabilityDate}
                onChange={(e) => updateFormData({ availabilityDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Travel Willingness (%)</Label>
              <div className="px-3">
                <Slider
                  value={[formData.travelWillingness]}
                  onValueChange={(value) => updateFormData({ travelWillingness: value[0] })}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span className="font-medium">{formData.travelWillingness}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="isRemoteOpen" className="flex-1">
                Open to Remote Work
                <p className="text-xs text-muted-foreground">Increases opportunities by 40%</p>
              </Label>
              <Switch
                id="isRemoteOpen"
                checked={formData.isRemoteOpen}
                onCheckedChange={(checked) => updateFormData({ isRemoteOpen: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="remoteOnly" className="flex-1">
                Remote Only Roles
                <p className="text-xs text-muted-foreground">Only show fully remote positions</p>
              </Label>
              <Switch
                id="remoteOnly"
                checked={formData.remoteOnly}
                onCheckedChange={(checked) => updateFormData({ remoteOnly: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="willingToRelocate" className="flex-1">
                Willing to Relocate
                <p className="text-xs text-muted-foreground">Consider opportunities in new cities</p>
              </Label>
              <Switch
                id="willingToRelocate"
                checked={formData.willingToRelocate}
                onCheckedChange={(checked) => updateFormData({ willingToRelocate: checked })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Professional Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Professional Links (optional)</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="portfolioUrl">Portfolio URL</Label>
            <Input
              id="portfolioUrl"
              type="url"
              placeholder="https://myportfolio.com"
              value={formData.portfolioUrl}
              onChange={(e) => updateFormData({ portfolioUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub Profile</Label>
            <Input
              id="githubUrl"
              type="url"
              placeholder="https://github.com/username"
              value={formData.githubUrl}
              onChange={(e) => updateFormData({ githubUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="personalWebsite">Personal Website</Label>
          <Input
            id="personalWebsite"
            type="url"
            placeholder="https://mywebsite.com"
            value={formData.personalWebsite}
            onChange={(e) => updateFormData({ personalWebsite: e.target.value })}
          />
        </div>
      </div>

      {/* Enhanced Skills & Goals */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Skills & Career Goals</h3>

        <div className="space-y-2">
          <Label htmlFor="skills">Key Skills & Technologies</Label>
          <Textarea
            id="skills"
            placeholder="React, Python, AWS, Project Management, Data Analysis..."
            value={formData.skills}
            onChange={(e) => updateFormData({ skills: e.target.value })}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">List your top skills and technologies</p>
        </div>

        <div className="space-y-2">
          <Label>Career Goals (select all that apply)</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              "Advance to leadership/management roles",
              "Transition to a new industry or field",
              "Develop technical expertise and specialization",
              "Work for high-growth startups",
              "Join established Fortune 500 companies",
              "Achieve better work-life balance",
              "Increase compensation and benefits",
              "Work on cutting-edge technology",
              "Make a social impact",
              "Start my own company eventually",
            ].map((goal) => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox
                  id={`goal-${goal}`}
                  checked={formData.careerGoals.includes(goal)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFormData({ careerGoals: [...formData.careerGoals, goal] })
                    } else {
                      updateFormData({
                        careerGoals: formData.careerGoals.filter((g) => g !== goal),
                      })
                    }
                  }}
                />
                <Label htmlFor={`goal-${goal}`} className="text-sm font-normal">
                  {goal}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-gradient-to-r from-blue-50 to-green-50 p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="text-sm font-medium text-slate-800 mb-1">Profile Strength Tip</p>
            <p className="text-sm text-slate-600">
              Candidates with complete work history, multiple skills, and clear career goals get 5x more interview
              requests from top employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
