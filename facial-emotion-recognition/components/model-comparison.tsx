"use client"

import { useEffect, useRef } from "react"

interface ModelComparisonProps {
  data: {
    metric: string
    current: number
    previous: number
  }[]
}

export function ModelComparison({ data }: ModelComparisonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const barHeight = 20
    const barGap = 5
    const groupGap = 20
    const leftPadding = 100
    const rightPadding = 50

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw bars
    data.forEach((item, index) => {
      const y = index * (2 * barHeight + barGap + groupGap) + 20

      // Draw metric label
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillText(item.metric, leftPadding - 10, y + barHeight / 2)

      // Draw current model bar
      const currentBarWidth = (width - leftPadding - rightPadding) * item.current
      ctx.fillStyle = "#0070f3"
      ctx.fillRect(leftPadding, y, currentBarWidth, barHeight)

      // Draw current model percentage
      ctx.fillStyle = "#000"
      ctx.textAlign = "left"
      ctx.fillText(`${Math.round(item.current * 100)}% (Current)`, leftPadding + currentBarWidth + 5, y + barHeight / 2)

      // Draw previous model bar
      const previousBarWidth = (width - leftPadding - rightPadding) * item.previous
      ctx.fillStyle = "#d4d4d4"
      ctx.fillRect(leftPadding, y + barHeight + barGap, previousBarWidth, barHeight)

      // Draw previous model percentage
      ctx.fillStyle = "#000"
      ctx.textAlign = "left"
      ctx.fillText(
        `${Math.round(item.previous * 100)}% (Previous)`,
        leftPadding + previousBarWidth + 5,
        y + barHeight + barGap + barHeight / 2,
      )
    })
  }, [data])

  return (
    <div className="w-full">
      <canvas ref={canvasRef} width={500} height={data.length * 65 + 20} className="w-full h-auto" />
    </div>
  )
}
