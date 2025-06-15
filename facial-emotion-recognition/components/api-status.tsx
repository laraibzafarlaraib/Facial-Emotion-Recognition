"use client"

import { CheckCircle, XCircle, Clock } from "lucide-react"

interface ApiStatusProps {
  status: "checking" | "connected" | "disconnected"
}

export function ApiStatus({ status }: ApiStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          icon: CheckCircle,
          text: "Flask API Connected",
          className: "text-green-600 bg-green-50 border-green-200",
        }
      case "disconnected":
        return {
          icon: XCircle,
          text: "Flask API Disconnected",
          className: "text-red-600 bg-red-50 border-red-200",
        }
      case "checking":
        return {
          icon: Clock,
          text: "Checking API Status...",
          className: "text-yellow-600 bg-yellow-50 border-yellow-200",
        }
    }
  }

  const { icon: Icon, text, className } = getStatusConfig()

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${className}`}>
      <Icon className="h-4 w-4" />
      <span>{text}</span>
    </div>
  )
}
