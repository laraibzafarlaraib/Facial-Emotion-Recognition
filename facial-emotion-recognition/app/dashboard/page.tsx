"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download } from "lucide-react"
import { ConfusionMatrix } from "@/components/confusion-matrix"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { EmotionDifficulty } from "@/components/emotion-difficulty"
import { ModelComparison } from "@/components/model-comparison"
import { modelPerformanceData } from "@/lib/sample-data"

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-gradient-to-r from-purple-700 to-blue-500">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-white">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <span className="ml-auto text-sm text-white/80">Model Performance Dashboard</span>
        </div>
      </header>
      <main className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Model Performance
              </h1>
              <p className="text-muted-foreground">
                Comprehensive evaluation of the facial emotion classification model
              </p>
            </div>
            <Button variant="outline" className="gap-2 self-start border-purple-500 text-purple-500 hover:bg-purple-50">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-white shadow">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
              <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white shadow-lg">
                  <CardHeader className="pb-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">68.0%</div>
                    <p className="text-xs text-green-600">FER2013 Dataset Performance</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardHeader className="pb-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="text-sm font-medium">Weighted F1 Score</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">0.68</div>
                    <p className="text-xs text-muted-foreground">Weighted average across classes</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardHeader className="pb-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-t-lg">
                    <CardTitle className="text-sm font-medium">Best Performing</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">Happiness</div>
                    <p className="text-xs text-amber-600">88% F1-score</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardHeader className="pb-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-t-lg">
                    <CardTitle className="text-sm font-medium">Most Challenging</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">Sadness</div>
                    <p className="text-xs text-rose-600">46% recall</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-1 bg-white shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-500 text-white rounded-t-lg">
                    <CardTitle>Performance by Emotion</CardTitle>
                    <CardDescription className="text-white/80">Accuracy for each emotion class</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PerformanceMetrics data={modelPerformanceData.emotionAccuracy} />
                  </CardContent>
                </Card>
                <Card className="md:col-span-1 bg-white shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-700 text-white rounded-t-lg">
                    <CardTitle>Model Comparison</CardTitle>
                    <CardDescription className="text-white/80">Current vs. previous model versions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ModelComparison data={modelPerformanceData.modelComparison} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-500 text-white rounded-t-lg">
                  <CardTitle>Detailed Performance Metrics</CardTitle>
                  <CardDescription className="text-white/80">
                    Precision, recall, and F1 score for each emotion class
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Emotion</th>
                          <th className="text-left py-3 px-4 font-semibold">Precision</th>
                          <th className="text-left py-3 px-4 font-semibold">Recall</th>
                          <th className="text-left py-3 px-4 font-semibold">F1 Score</th>
                          <th className="text-left py-3 px-4 font-semibold">Support</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modelPerformanceData.detailedMetrics.map((metric, index) => (
                          <tr key={index} className="border-b hover:bg-slate-50">
                            <td className="py-3 px-4 capitalize">{metric.emotion}</td>
                            <td className="py-3 px-4">{metric.precision.toFixed(2)}</td>
                            <td className="py-3 px-4">{metric.recall.toFixed(2)}</td>
                            <td className="py-3 px-4">{metric.f1.toFixed(2)}</td>
                            <td className="py-3 px-4">{metric.support}</td>
                          </tr>
                        ))}
                        <tr className="font-medium bg-slate-50">
                          <td className="py-3 px-4">Weighted Average</td>
                          <td className="py-3 px-4">0.69</td>
                          <td className="py-3 px-4">0.68</td>
                          <td className="py-3 px-4">0.68</td>
                          <td className="py-3 px-4">3589</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="confusion" className="space-y-6">
              {/* Full width card for confusion matrix */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-500 text-white rounded-t-lg">
                  <CardTitle>Confusion Matrix</CardTitle>
                  <CardDescription className="text-white/80">
                    Visualization of predicted vs. actual emotions - Larger cells show better performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <ConfusionMatrix data={modelPerformanceData.confusionMatrix} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-500 text-white rounded-t-lg">
                  <CardTitle>Emotion Classification Difficulty</CardTitle>
                  <CardDescription className="text-white/80">
                    Analysis of which emotions are harder to classify
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <EmotionDifficulty data={modelPerformanceData.emotionDifficulty} />
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-700 text-white rounded-t-lg">
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription className="text-white/80">Important findings from model evaluation</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium">Strong Diagonal Performance</h3>
                        <p className="text-muted-foreground">
                          Happiness shows the strongest diagonal value (784), indicating excellent recognition of happy
                          expressions.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium">Sadness-Neutral Confusion</h3>
                        <p className="text-muted-foreground">
                          Sadness is frequently misclassified as neutral (130 cases), suggesting subtle expressions are
                          challenging.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium">Fear-Anger Overlap</h3>
                        <p className="text-muted-foreground">
                          Fear is often confused with anger (98 cases), indicating similar facial muscle activation
                          patterns.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        4
                      </div>
                      <div>
                        <h3 className="font-medium">Data Imbalance Impact</h3>
                        <p className="text-muted-foreground">
                          Disgust has very few samples (55) compared to happiness (899), affecting model learning for
                          rare emotions.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}