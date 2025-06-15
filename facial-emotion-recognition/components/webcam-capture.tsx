"use client"

import { useRef, useEffect, useState } from "react"

interface WebcamCaptureProps {
  isCapturing: boolean
  onCapture: (imageData: string) => void
  captureInterval?: number
  width?: number
  height?: number
}

export function WebcamCapture({
  isCapturing,
  onCapture,
  captureInterval = 1000,
  width = 640,
  height = 480,
}: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null

    const setupWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
          setError(null)
        }
      } catch (err) {
        setHasPermission(false)
        setError("Could not access webcam. Please check permissions.")
        console.error("Error accessing webcam:", err)
      }
    }

    setupWebcam()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isCapturing && hasPermission) {
      interval = setInterval(() => {
        captureImage()
      }, captureInterval)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isCapturing, hasPermission, captureInterval])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && hasPermission) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.drawImage(videoRef.current, 0, 0, width, height)
        const imageData = canvasRef.current.toDataURL("image/jpeg")
        onCapture(imageData)
      }
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-muted h-[300px] rounded-lg">
        <div className="text-center p-4">
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-sm text-muted-foreground">
            Please ensure your browser has permission to access the camera.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden bg-black flex items-center justify-center">
        {hasPermission === false && (
          <div className="text-white p-4 text-center">Camera access denied. Please check your browser permissions.</div>
        )}
        {hasPermission === null && <div className="text-white p-4 text-center">Requesting camera access...</div>}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width={width}
          height={height}
          className={`${hasPermission ? "block" : "hidden"} max-w-full h-auto`}
        />
      </div>
      <canvas ref={canvasRef} width={width} height={height} className="hidden" />
      {isCapturing && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Capturing</span>
          </div>
        </div>
      )}
    </div>
  )
}
