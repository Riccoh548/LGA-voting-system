"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConfirmationPopupProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  autoCloseDelay?: number
}

export function ConfirmationPopup({
  title,
  description,
  isOpen,
  onClose,
  autoCloseDelay = 3000,
}: ConfirmationPopupProps) {
  const [animationState, setAnimationState] = useState<"entering" | "visible" | "exiting" | "closed">("closed")
  const [progress, setProgress] = useState(0)

  // Handle animation states
  useEffect(() => {
    if (isOpen && animationState === "closed") {
      setAnimationState("entering")
      const timer = setTimeout(() => {
        setAnimationState("visible")
      }, 100)
      return () => clearTimeout(timer)
    } else if (!isOpen && (animationState === "visible" || animationState === "entering")) {
      setAnimationState("exiting")
      const timer = setTimeout(() => {
        setAnimationState("closed")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, animationState])

  // Auto-close timer
  useEffect(() => {
    if (isOpen && animationState === "visible") {
      // Reset progress
      setProgress(0)

      // Set up progress animation
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const newProgress = Math.min((elapsed / autoCloseDelay) * 100, 100)
        setProgress(newProgress)

        if (elapsed >= autoCloseDelay) {
          clearInterval(interval)
          onClose()
        }
      }, 16) // ~60fps

      return () => clearInterval(interval)
    }
  }, [isOpen, animationState, autoCloseDelay, onClose])

  if (animationState === "closed") {
    return null
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-background/30",
        animationState === "entering" && "opacity-0",
        animationState === "visible" && "opacity-100 transition-opacity duration-300",
        animationState === "exiting" && "opacity-0 transition-opacity duration-300",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full max-w-md rounded-lg backdrop-blur-md bg-background/50 border border-border/50 p-6 shadow-lg",
          animationState === "entering" && "scale-95 opacity-0",
          animationState === "visible" && "scale-100 opacity-100 transition-all duration-300",
          animationState === "exiting" && "scale-95 opacity-0 transition-all duration-300",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-primary/20 p-3">
            <CheckCircle2 className="h-10 w-10 text-primary animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>

          <div className="mt-6 w-full">
            {/* Progress bar */}
            <div className="w-full bg-background/30 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Animated dots */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-[bounce_1s_ease-in-out_infinite]"></span>
                <span className="h-2 w-2 rounded-full bg-primary animate-[bounce_1s_ease-in-out_0.2s_infinite]"></span>
                <span className="h-2 w-2 rounded-full bg-primary animate-[bounce_1s_ease-in-out_0.4s_infinite]"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
