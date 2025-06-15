"use client"

import { Card, CardContent } from "@/components/ui/card"

interface EmotionDifficultyProps {
  data: {
    emotion: string
    difficulty: number
    reasons: string[]
  }[]
}

export function EmotionDifficulty({ data }: EmotionDifficultyProps) {
  // Sort by difficulty (descending)
  const sortedData = [...data].sort((a, b) => b.difficulty - a.difficulty)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {sortedData.map((item) => (
          <Card key={item.emotion} className={`border-l-4 ${getDifficultyBorderColor(item.difficulty)}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium capitalize">{item.emotion}</h3>
                <div className="text-sm text-muted-foreground">Difficulty: {getDifficultyLabel(item.difficulty)}</div>
              </div>
              <ul className="text-sm space-y-1 list-disc pl-4">
                {item.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getDifficultyLabel(difficulty: number): string {
  if (difficulty >= 0.8) return "Very High"
  if (difficulty >= 0.6) return "High"
  if (difficulty >= 0.4) return "Medium"
  if (difficulty >= 0.2) return "Low"
  return "Very Low"
}

function getDifficultyBorderColor(difficulty: number): string {
  if (difficulty >= 0.8) return "border-red-500"
  if (difficulty >= 0.6) return "border-orange-500"
  if (difficulty >= 0.4) return "border-yellow-500"
  if (difficulty >= 0.2) return "border-green-500"
  return "border-blue-500"
}
