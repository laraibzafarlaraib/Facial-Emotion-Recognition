"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, FileImage, Trash2, AlertCircle } from "lucide-react"
import { ImageUploader } from "@/components/image-uploader"
import { EmotionDisplay } from "@/components/emotion-display"
import { ApiStatus } from "@/components/api-status"
import { useEmotionDetection } from "@/hooks/use-emotion-detection"

export default function ImageUploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { emotions, isProcessing, processImage, resetEmotions, apiStatus, error } = useEmotionDetection()

  const handleImageUpload = (imageData: string) => {
    setSelectedImage(imageData)
    resetEmotions()
  }

  const handleAnalyzeImage = async () => {
    if (selectedImage) {
      console.log("🎯 Analyze button clicked")
      await processImage(selectedImage)
    }
  }

  const handleClearImage = () => {
    setSelectedImage(null)
    resetEmotions()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-gradient-to-r from-purple-700 to-blue-500">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-white">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <ApiStatus status={apiStatus} />
            <span className="text-sm text-white/80">Image Emotion Analysis</span>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-center">Image Emotion Analysis</h1>
            <p className="text-muted-foreground text-center mb-8">
              Upload an image containing a face to analyze the emotion
            </p>

            {apiStatus === "disconnected" && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Flask API Not Running:</strong> Make sure your Flask server is running on
                  http://127.0.0.1:5000
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-2 border-dashed border-muted-foreground/25">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileImage className="h-5 w-5" />
                    Upload Image
                  </CardTitle>
                  <CardDescription>Select an image from your device for analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  {!selectedImage ? (
                    <ImageUploader onImageUpload={handleImageUpload} />
                  ) : (
                    <div className="space-y-4">
                      <div className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
                        <Image
                          src={selectedImage || "/placeholder.svg"}
                          alt="Uploaded image"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAnalyzeImage}
                          disabled={isProcessing || apiStatus === "checking"}
                          className="flex-1"
                        >
                          {isProcessing ? "Analyzing..." : "Analyze Emotion"}
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleClearImage}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Debug: API Status = {apiStatus}, Processing = {isProcessing.toString()}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>Detected emotions and confidence scores</CardDescription>
                </CardHeader>
                <CardContent>
                  {emotions ? (
                    <div className="space-y-6">
                      <EmotionDisplay emotions={emotions} isProcessing={isProcessing} />
                      <div className="space-y-3">
                        {Object.entries(emotions)
                          .sort((a, b) => b[1] - a[1])
                          .map(([emotion, score]) => (
                            <div key={emotion} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="capitalize font-medium">{emotion}</span>
                                <span className="text-sm font-bold">{Math.round(score * 100)}%</span>
                              </div>
                              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                  style={{ width: `${Math.round(score * 100)}%` }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                      {isProcessing ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
                          <p>Analyzing image...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="h-12 w-12 text-muted-foreground/50 mb-4" />
                          <p>Upload and analyze an image to see results</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
