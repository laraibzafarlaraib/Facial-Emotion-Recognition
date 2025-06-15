"use client"

import { useEffect, useRef } from "react"

interface ConfusionMatrixProps {
  data: {
    labels: string[]
    matrix: number[][]
  }
}

export function ConfusionMatrix({ data }: ConfusionMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const { labels, matrix } = data
    const cellSize = 80 // Increased from 50 to 80
    const padding = 120 // Increased padding for labels
    const fontSize = 14 // Increased font size
    const labelFontSize = 12 // Font size for labels

    // Set canvas size with higher resolution for crisp text
    const canvasWidth = padding + cellSize * labels.length + 40
    const canvasHeight = padding + cellSize * labels.length + 40

    // Set actual size
    canvasRef.current.width = canvasWidth * 2 // Double for high DPI
    canvasRef.current.height = canvasHeight * 2

    // Scale back down for display
    canvasRef.current.style.width = `${canvasWidth}px`
    canvasRef.current.style.height = `${canvasHeight}px`

    // Scale the context to match
    ctx.scale(2, 2)

    // Clear canvas with white background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Find max value for color scaling
    const maxValue = Math.max(...matrix.flat())

    // Draw cells
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < labels.length; j++) {
        const value = matrix[i][j]
        const x = padding + j * cellSize
        const y = padding + i * cellSize

        // Calculate color intensity (darker blue = higher value)
        const intensity = value / maxValue

        // Use a better color scheme
        let color
        if (i === j) {
          // Diagonal (correct predictions) - green to blue gradient
          const green = Math.round(100 + intensity * 100)
          const blue = Math.round(150 + intensity * 105)
          color = `rgb(50, ${green}, ${blue})`
        } else {
          // Off-diagonal (errors) - light blue to red gradient
          const red = Math.round(200 + intensity * 55)
          const blue = Math.round(220 - intensity * 120)
          color = `rgb(${red}, 150, ${blue})`
        }

        ctx.fillStyle = color
        ctx.fillRect(x, y, cellSize, cellSize)

        // Add border
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, cellSize, cellSize)

        // Add text with better contrast
        const textColor = intensity > 0.6 ? "white" : "black"
        ctx.fillStyle = textColor
        ctx.font = `bold ${fontSize}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Add shadow for better readability
        ctx.shadowColor = intensity > 0.6 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)"
        ctx.shadowBlur = 2
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1

        ctx.fillText(value.toString(), x + cellSize / 2, y + cellSize / 2)

        // Reset shadow
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      }
    }

    // Draw labels with better positioning
    ctx.fillStyle = "#1f2937" // Dark gray
    ctx.font = `bold ${labelFontSize}px Arial`

    // Y-axis labels (actual emotions)
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    for (let i = 0; i < labels.length; i++) {
      const y = padding + i * cellSize + cellSize / 2
      ctx.fillText(labels[i], padding - 15, y)
    }

    // X-axis labels (predicted emotions) - rotated
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    for (let i = 0; i < labels.length; i++) {
      const x = padding + i * cellSize + cellSize / 2

      ctx.save()
      ctx.translate(x, padding - 15)
      ctx.rotate(-Math.PI / 4) // 45 degree rotation
      ctx.fillText(labels[i], 0, 0)
      ctx.restore()
    }

    // Add axis titles
    ctx.font = `bold ${labelFontSize + 2}px Arial`
    ctx.fillStyle = "#374151"

    // X-axis title
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Predicted Label", padding + (labels.length * cellSize) / 2, padding - 60)

    // Y-axis title (rotated)
    ctx.save()
    ctx.translate(25, padding + (labels.length * cellSize) / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("True Label", 0, 0)
    ctx.restore()

    // Add title
    ctx.font = `bold ${fontSize + 4}px Arial`
    ctx.fillStyle = "#111827"
    ctx.textAlign = "center"
    ctx.fillText("Confusion Matrix", padding + (labels.length * cellSize) / 2, 25)

    // Add color legend
    const legendX = padding + labels.length * cellSize + 20
    const legendY = padding
    const legendWidth = 20
    const legendHeight = labels.length * cellSize

    // Create gradient for legend
    const gradient = ctx.createLinearGradient(0, legendY, 0, legendY + legendHeight)
    gradient.addColorStop(0, "rgb(50, 200, 255)") // Light blue (low values)
    gradient.addColorStop(1, "rgb(50, 100, 255)") // Dark blue (high values)

    ctx.fillStyle = gradient
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight)

    // Legend border
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1
    ctx.strokeRect(legendX, legendY, legendWidth, legendHeight)

    // Legend labels
    ctx.fillStyle = "#374151"
    ctx.font = `${labelFontSize - 1}px Arial`
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"

    ctx.fillText("0", legendX + legendWidth + 5, legendY + legendHeight)
    ctx.fillText(maxValue.toString(), legendX + legendWidth + 5, legendY)

    // Legend title
    ctx.save()
    ctx.translate(legendX + legendWidth + 35, legendY + legendHeight / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.font = `bold ${labelFontSize}px Arial`
    ctx.fillText("Count", 0, 0)
    ctx.restore()
  }, [data])

  return (
    <div className="w-full overflow-auto bg-white p-4 rounded-lg border">
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="border border-gray-200 rounded shadow-sm"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
          <strong>Diagonal values</strong> (green-blue) represent correct predictions
        </p>
        <p>
          <strong>Off-diagonal values</strong> (red-blue) represent misclassifications
        </p>
      </div>
    </div>
  )
}
