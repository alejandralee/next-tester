"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, CheckCircle, AlertCircle, X } from "lucide-react"

interface CandidateStep4EnhancedProps {
  formData: {
    resume: File | null
    coverLetter: File | null
    additionalDocuments: File[]
  }
  updateFormData: (data: Partial<CandidateStep4EnhancedProps["formData"]>) => void
}

interface FileUploadProps {
  file: File | null
  onFileChange: (file: File | null) => void
  accept: string
  title: string
  description: string
  required?: boolean
  maxSize?: number
}

function FileUpload({
  file,
  onFileChange,
  accept,
  title,
  description,
  required = false,
  maxSize = 5,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }

    const allowedTypes = accept.split(",").map((type) => type.trim())
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()

    if (!allowedTypes.includes(fileExtension)) {
      return `File type not supported. Please use: ${allowedTypes.join(", ")}`
    }

    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validationError = validateFile(selectedFile)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      simulateUpload(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      const validationError = validateFile(droppedFile)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      simulateUpload(droppedFile)
    }
  }

  const simulateUpload = (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + 10
        if (next >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          onFileChange(file)
          return 100
        }
        return next
      })
    }, 150)
  }

  const removeFile = () => {
    onFileChange(null)
    setUploadProgress(0)
    setError(null)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">
          {title} {required && <span className="text-red-500">*</span>}
        </Label>
        {file && (
          <Button variant="ghost" size="sm" onClick={removeFile} className="text-red-500 hover:text-red-700">
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
      </div>

      <div
        className={`relative rounded-lg border-2 border-dashed p-6 transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : error
              ? "border-red-300 bg-red-50"
              : file
                ? "border-green-300 bg-green-50"
                : "border-slate-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="space-y-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Upload Complete
            </Badge>
          </div>
        ) : isUploading ? (
          <div className="space-y-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto">
              <Upload className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm">Uploading... {uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full mx-auto mb-3 ${
                  error ? "bg-red-100 text-red-600" : "bg-slate-100"
                }`}
              >
                {error ? <AlertCircle className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
              </div>

              {error ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-red-600">Upload Error</p>
                  <p className="text-xs text-red-500">{error}</p>
                </div>
              ) : (
                <>
                  <p className="mb-2 text-sm font-medium">Drop your {title.toLowerCase()} here</p>
                  <p className="mb-4 text-xs text-muted-foreground">{description}</p>
                </>
              )}

              <Label
                htmlFor={`${title.toLowerCase().replace(/\s+/g, "-")}-upload`}
                className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Choose File
              </Label>
              <input
                id={`${title.toLowerCase().replace(/\s+/g, "-")}-upload`}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Supported formats: {accept.replace(/\./g, "").toUpperCase()} • Max size: {maxSize}MB
      </p>
    </div>
  )
}

export function CandidateStep4Enhanced({ formData, updateFormData }: CandidateStep4EnhancedProps) {
  const addAdditionalDocument = (file: File) => {
    updateFormData({
      additionalDocuments: [...formData.additionalDocuments, file],
    })
  }

  const removeAdditionalDocument = (index: number) => {
    const newDocs = formData.additionalDocuments.filter((_, i) => i !== index)
    updateFormData({ additionalDocuments: newDocs })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Upload Your Documents</h2>
        <p className="text-sm text-muted-foreground">
          Upload your resume and other relevant documents to strengthen your profile. Profiles with complete
          documentation get 5x more interview requests.
        </p>
      </div>

      <div className="space-y-6">
        {/* Resume Upload */}
        <FileUpload
          file={formData.resume}
          onFileChange={(file) => updateFormData({ resume: file })}
          accept=".pdf,.doc,.docx"
          title="Resume"
          description="PDF, DOC, or DOCX • Max 5MB • Keep it current and relevant"
          required={true}
          maxSize={5}
        />

        {/* Cover Letter Upload */}
        <FileUpload
          file={formData.coverLetter}
          onFileChange={(file) => updateFormData({ coverLetter: file })}
          accept=".pdf,.doc,.docx"
          title="Cover Letter"
          description="PDF, DOC, or DOCX • Max 3MB • Personalize for better results"
          maxSize={3}
        />

        {/* Additional Documents */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Additional Documents (optional)</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Upload certificates, portfolios, or other relevant documents
            </p>
          </div>

          {formData.additionalDocuments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Uploaded Documents:</h4>
              {formData.additionalDocuments.map((doc, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAdditionalDocument(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <FileUpload
            file={null}
            onFileChange={addAdditionalDocument}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            title="Additional Document"
            description="Certificates, portfolio samples, etc. • PDF, DOC, DOCX, JPG, PNG • Max 10MB"
            maxSize={10}
          />
        </div>
      </div>

      {/* Document Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Document Best Practices
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-sm mb-2">Resume Tips:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Keep it to 1-2 pages maximum</li>
                <li>• Use a clean, professional format</li>
                <li>• Include quantifiable achievements</li>
                <li>• Tailor keywords to your target roles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Additional Documents:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Professional certifications</li>
                <li>• Portfolio samples or case studies</li>
                <li>• Letters of recommendation</li>
                <li>• Relevant project documentation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          ✨ <strong>Pro tip:</strong> Candidates with complete documentation are 3x more likely to get contacted by
          recruiters within the first week.
        </p>
      </div>
    </div>
  )
}
