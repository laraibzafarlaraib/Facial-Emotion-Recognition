import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart3, Camera, Layers, FileImage } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-gradient-to-r from-purple-700 to-blue-500">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <span className="text-xl font-bold text-white">EmotionAI</span>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/demo"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              Live Demo
            </Link>
            <Link
              href="/image-upload"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              Image Upload
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Facial Emotion Recognition
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Real-time emotion detection using deep learning. Try our interactive demo or explore the model
                  performance.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/demo">
                  <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                    Try Live Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/image-upload">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Upload Image
                    <FileImage className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Our facial emotion recognition system provides accurate real-time detection of emotions from webcam
                  input or uploaded images.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Camera className="h-12 w-12 mb-4 text-purple-600" />
                    <h3 className="text-xl font-bold">Real-time Detection</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Process webcam input in real-time to detect emotions as they happen.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <FileImage className="h-12 w-12 mb-4 text-blue-600" />
                    <h3 className="text-xl font-bold">Image Analysis</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Upload images to analyze facial emotions in photographs.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <BarChart3 className="h-12 w-12 mb-4 text-indigo-600" />
                    <h3 className="text-xl font-bold">Detailed Analytics</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      View confidence scores and analytics for each detected emotion.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Layers className="h-12 w-12 mb-4 text-violet-600" />
                    <h3 className="text-xl font-bold">Deep Learning Model</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Powered by a sophisticated neural network trained on diverse datasets.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-900 text-white">
        <div className="container flex flex-col gap-2 py-6 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">EmotionAI</h3>
              <p className="text-sm text-gray-400">Advanced emotion recognition technology</p>
            </div>
            <div className="flex gap-4">
              <Link href="/demo" className="text-sm hover:underline">
                Demo
              </Link>
              <Link href="/image-upload" className="text-sm hover:underline">
                Image Upload
              </Link>
              <Link href="/dashboard" className="text-sm hover:underline">
                Dashboard
              </Link>
              <Link href="/about" className="text-sm hover:underline">
                About
              </Link>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400 mt-4">
            © {new Date().getFullYear()} EmotionAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
