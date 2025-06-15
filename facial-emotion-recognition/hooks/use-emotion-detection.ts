"use client"

import { useState, useEffect } from "react"
import { detectEmotions, checkFlaskAPI } from "@/lib/ml-integration"

interface EmotionDetectionResult {
  emotions: Record<string, number> | null
  isProcessing: boolean
  processImage: (imageData: string) => Promise<void>
  resetEmotions: () => void
  apiStatus: "checking" | "connected" | "disconnected"
  error: string | null
}

export function useEmotionDetection(): EmotionDetectionResult {
  const [emotions, setEmotions] = useState<Record<string, number> | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [apiStatus, setApiStatus] = useState<"checking" | "connected" | "disconnected">("checking")
  const [error, setError] = useState<string | null>(null)

  // Check Flask API status on mount
  useEffect(() => {
    const checkAPI = async () => {
      const isConnected = await checkFlaskAPI()
      setApiStatus(isConnected ? "connected" : "disconnected")
    }

    checkAPI()

    // Check API status every 30 seconds
    const interval = setInterval(checkAPI, 30000)
    return () => clearInterval(interval)
  }, [])

  const processImage = async (imageData: string) => {
    console.log("🚀 Processing image...")
    setIsProcessing(true)
    setError(null)

    try {
      const detectedEmotions = await detectEmotions(imageData)
      setEmotions(detectedEmotions)
      console.log("✅ Image processed successfully")
    } catch (error) {
      console.error("❌ Error processing image:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setError(errorMessage)

      // Also show alert for immediate user feedback
      alert(`Error: ${errorMessage}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetEmotions = () => {
    setEmotions(null)
    setError(null)
  }

  return {
    emotions,
    isProcessing,
    processImage,
    resetEmotions,
    apiStatus,
    error,
  }
}
