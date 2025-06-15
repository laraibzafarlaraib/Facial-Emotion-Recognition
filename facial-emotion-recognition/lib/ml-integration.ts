/**
 * Sends an image to your local Flask API and returns emotion predictions
 * @param imageData - Base64 encoded image data
 * @returns Emotion predictions with confidence scores
 */
export async function detectEmotions(imageData: string): Promise<Record<string, number>> {
  console.log("🔄 Starting emotion detection...")

  try {
    // Convert base64 to blob for FormData
    const base64Data = imageData.split(",")[1]
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: "image/jpeg" })

    console.log("📤 Sending request to Flask API...")

    // Create FormData to send to Flask
    const formData = new FormData()
    formData.append("image", blob, "image.jpg")

    // Call your local Flask API
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    })

    console.log("📥 Response status:", response.status)
    console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ API Error Response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()
    console.log("✅ API Response:", data)

    // Handle potential error from Flask API
    if (data.error) {
      console.error("❌ Flask API Error:", data.error)
      throw new Error(data.error)
    }

    if (!data.emotions) {
      console.error("❌ No emotions in response:", data)
      throw new Error("No emotions data in API response")
    }

    console.log("🎉 Emotion detection successful:", data.emotions)
    return data.emotions
  } catch (error) {
    console.error("💥 Error in detectEmotions:", error)

    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.warn("🔌 Network error - Flask API might not be running")
      throw new Error("Cannot connect to Flask API. Make sure it's running on http://127.0.0.1:5000")
    }

    throw error
  }
}

/**
 * Check if Flask API is running
 */
export async function checkFlaskAPI(): Promise<boolean> {
  try {
    console.log("🔍 Checking Flask API health...")
    const response = await fetch("http://127.0.0.1:5000/health", {
      method: "GET",
    })
    const isHealthy = response.ok
    console.log(isHealthy ? "✅ Flask API is healthy" : "❌ Flask API health check failed")
    return isHealthy
  } catch (error) {
    console.log("❌ Flask API health check failed:", error)
    return false
  }
}
