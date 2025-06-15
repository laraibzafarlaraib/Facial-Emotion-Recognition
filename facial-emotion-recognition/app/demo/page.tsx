"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Pause, Play } from "lucide-react"
import { WebcamCapture } from "@/components/webcam-capture"
import { EmotionDisplay } from "@/components/emotion-display"
import { EmotionChart } from "@/components/emotion-chart"
import { ApiStatus } from "@/components/api-status"
import { useEmotionDetection } from "@/hooks/use-emotion-detection"

export default function DemoPage() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [selectedTab, setSelectedTab] = useState("live")
  const { emotions, isProcessing, processImage, resetEmotions, apiStatus } = useEmotionDetection()

  const handleToggleCapture = () => {
    if (isCapturing) {
      resetEmotions()
    }
    setIsCapturing(!isCapturing)
  }

  const handleImageCapture = async (imageData: string) => {
    if (isCapturing && !isProcessing) {
      await processImage(imageData)
    }
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
            <span className="text-sm text-white/80">Live Emotion Detection Demo</span>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container grid gap-6 py-8 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px]">
          <div className="flex flex-col gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Webcam Feed</CardTitle>
                <CardDescription>Position your face in the frame for best results</CardDescription>
              </CardHeader>
              <CardContent>
                <WebcamCapture isCapturing={isCapturing} onCapture={handleImageCapture} captureInterval={500} />
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleToggleCapture}
                    disabled={apiStatus === "checking"}
                    className={`gap-2 ${isCapturing ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                  >
                    {isCapturing ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Stop Detection
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Start Detection
                      </>
                    )}
                  </Button>
                </div>
                {apiStatus === "disconnected" && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Flask API is not running. Make sure your Flask server is running on
                      http://127.0.0.1:5000
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Emotion Visualization</CardTitle>
                <CardDescription>Visual representation of detected emotions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="live">Live Display</TabsTrigger>
                    <TabsTrigger value="chart">Chart View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="live" className="pt-4">
                    <EmotionDisplay emotions={emotions} isProcessing={isProcessing} />
                  </TabsContent>
                  <TabsContent value="chart" className="pt-4">
                    <EmotionChart emotions={emotions} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-500 text-white rounded-t-lg">
                <CardTitle>Detected Emotions</CardTitle>
                <CardDescription className="text-white/80">Confidence scores for each emotion</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {emotions ? (
                  <div className="space-y-4">
                    {Object.entries(emotions)
                      .sort(([, a], [, b]) => b - a)
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
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    {isCapturing ? "Waiting for detection..." : "Start detection to see results"}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-700 text-white rounded-t-lg">
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Make sure your Flask API is running on port 5000</li>
                  <li>Click "Start Detection" to begin</li>
                  <li>Position your face clearly in the webcam view</li>
                  <li>Try expressing different emotions</li>
                  <li>View real-time confidence scores</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
