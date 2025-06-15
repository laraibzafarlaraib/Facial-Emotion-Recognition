"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface EmotionDisplayProps {
  emotions: Record<string, number> | null
  isProcessing: boolean
}

export function EmotionDisplay({ emotions, isProcessing }: EmotionDisplayProps) {
  const [dominantEmotion, setDominantEmotion] = useState<string | null>(null)

  useEffect(() => {
    if (emotions) {
      const entries = Object.entries(emotions)
      if (entries.length > 0) {
        const sorted = [...entries].sort((a, b) => b[1] - a[1])
        setDominantEmotion(sorted[0][0])
      }
    } else {
      setDominantEmotion(null)
    }
  }, [emotions])

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
        <p className="text-muted-foreground">Processing...</p>
      </div>
    )
  }

  if (!emotions || !dominantEmotion) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
        <p>No emotion detected yet</p>
        <p className="text-sm">Start detection to see results</p>
      </div>
    )
  }

  const getEmotionImage = (emotion: string) => {
    // In a real app, you would have actual images for each emotion
    return `/placeholder.svg?text=${emotion}`
  }

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      happy: "from-yellow-400 to-yellow-500",
      sad: "from-blue-400 to-blue-500",
      angry: "from-red-400 to-red-500",
      surprised: "from-amber-400 to-amber-500",
      fearful: "from-purple-400 to-purple-500",
      disgusted: "from-emerald-400 to-emerald-500",
      neutral: "from-gray-400 to-gray-500",
    }

    return colors[emotion.toLowerCase()] || "from-blue-400 to-purple-500"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${getEmotionColor(dominantEmotion)} opacity-20`}
        />
        <div className="relative p-1 rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
          <div className="bg-white p-1 rounded-full">
            <Image
              src={getEmotionImage(dominantEmotion) || "/placeholder.svg"}
              alt={dominantEmotion}
              width={180}
              height={180}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold capitalize mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {dominantEmotion}
      </h3>
      <p className="text-muted-foreground">
        Confidence: <span className="font-semibold">{Math.round(emotions[dominantEmotion] * 100)}%</span>
      </p>
    </div>
  )
}
