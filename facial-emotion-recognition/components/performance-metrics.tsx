"use client"

import { useEffect, useRef } from "react"

interface PerformanceMetricsProps {
  data: {
    emotion: string
    accuracy: number
  }[]
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Sort data by accuracy
    const sortedData = [...data].sort((a, b) => b.accuracy - a.accuracy)

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const barHeight = 30
    const barGap = 10
    const leftPadding = 100
    const rightPadding = 50

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw bars
    sortedData.forEach((item, index) => {
      const y = index * (barHeight + barGap) + 20
      const barWidth = (width - leftPadding - rightPadding) * item.accuracy

      // Draw emotion label
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillText(item.emotion, leftPadding - 10, y + barHeight / 2)

      // Draw bar
      const gradient = ctx.createLinearGradient(leftPadding, 0, leftPadding + barWidth, 0)
      gradient.addColorStop(0, "#0070f3")
      gradient.addColorStop(1, "#00a8ff")
      ctx.fillStyle = gradient
      ctx.fillRect(leftPadding, y, barWidth, barHeight)

      // Draw percentage
      ctx.fillStyle = "#000"
      ctx.textAlign = "left"
      ctx.fillText(`${Math.round(item.accuracy * 100)}%`, leftPadding + barWidth + 5, y + barHeight / 2)
    })
  }, [data])

  return (
    <div className="w-full">
      <canvas ref={canvasRef} width={500} height={data.length * 40 + 20} className="w-full h-auto" />
    </div>
  )
}
