"use client"

import { useEffect, useRef } from "react"

interface EmotionChartProps {
  emotions: Record<string, number> | null
}

export function EmotionChart({ emotions }: EmotionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!emotions || !canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    const emotionEntries = Object.entries(emotions)
    if (emotionEntries.length === 0) return

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8AC926", "#1982C4"]

    const total = emotionEntries.reduce((sum, [_, value]) => sum + value, 0)

    let startAngle = 0

    emotionEntries.forEach(([emotion, value], index) => {
      const sliceAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(100, 100)
      ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Add label
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = 100
      const labelX = 100 + Math.cos(labelAngle) * labelRadius * 0.7
      const labelY = 100 + Math.sin(labelAngle) * labelRadius * 0.7

      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      if (value / total > 0.05) {
        ctx.fillText(emotion, labelX, labelY)
      }

      startAngle += sliceAngle
    })

    // Add center circle for better appearance
    ctx.beginPath()
    ctx.arc(100, 100, 40, 0, 2 * Math.PI)
    ctx.fillStyle = "#fff"
    ctx.fill()
  }, [emotions])

  if (!emotions) {
    return <div className="flex items-center justify-center h-[300px] text-muted-foreground">No data to display</div>
  }

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={200} height={200} className="mb-4" />
      <div className="grid grid-cols-2 gap-2 w-full">
        {Object.entries(emotions).map(([emotion, value], index) => (
          <div key={emotion} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                  "#FF9F40",
                  "#8AC926",
                  "#1982C4",
                ][index % 8],
              }}
            />
            <span className="capitalize">{emotion}</span>
            <span className="ml-auto text-muted-foreground">{Math.round(value * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
