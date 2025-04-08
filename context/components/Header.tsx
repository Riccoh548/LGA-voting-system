"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Volume2, VolumeX, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"
import { useThemePerformance } from "@/hooks/use-theme-performance"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [speechState, setSpeechState] = useState<"idle" | "speaking" | "paused">("idle")
  const pathname = usePathname()
  const { measureTogglePerformance } = useThemePerformance()
  const themeTransitionTimeout = useRef<NodeJS.Timeout>()
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize theme on mount with performance monitoring
  useEffect(() => {
    const measureMount = measureTogglePerformance()
    setMounted(true)
    measureMount()

    // Cleanup function
    return () => {
      if (themeTransitionTimeout.current) {
        clearTimeout(themeTransitionTimeout.current)
      }
    }
  }, [measureTogglePerformance])

  // Stop speaking when navigating
  useEffect(() => {
    window.speechSynthesis.cancel()
    setSpeechState("idle")
    speechSynthesisRef.current = null
  }, [pathname])

  // Function to get all visible text content from the current page
  const getAllPageContent = useCallback(() => {
    if (typeof document === "undefined") return []

    // Get the main content area
    const mainContent = document.querySelector("main")
    if (!mainContent) return []

    // Get all text nodes that are visible
    const textElements = mainContent.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, button, a, label, span, div")

    const visibleTextContent: string[] = []

    textElements.forEach((element) => {
      // Skip hidden elements or those with no text content
      if (
        element.textContent &&
        element.textContent.trim() !== "" &&
        window.getComputedStyle(element).display !== "none" &&
        window.getComputedStyle(element).visibility !== "hidden"
      ) {
        // Get direct text content (not including children's text)
        const directText = Array.from(element.childNodes)
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent?.trim())
          .filter(Boolean)
          .join(" ")

        if (directText && directText.trim() !== "") {
          visibleTextContent.push(directText)
        }

        // For headings and paragraphs, include the full text content
        if (
          element.tagName === "H1" ||
          element.tagName === "H2" ||
          element.tagName === "H3" ||
          element.tagName === "P"
        ) {
          if (element.textContent && !visibleTextContent.includes(element.textContent.trim())) {
            visibleTextContent.push(element.textContent.trim())
          }
        }
      }
    })

    // Add page-specific context
    if (pathname === "/") {
      visibleTextContent.unshift(t("welcome"))
    } else if (pathname === "/candidates") {
      visibleTextContent.unshift(t("candidates"))
    } else if (pathname === "/confirm") {
      visibleTextContent.unshift(t("confirm"))
    }

    // Remove duplicates and empty strings
    return Array.from(new Set(visibleTextContent)).filter((text) => text.trim() !== "")
  }, [pathname, t])

  const toggleSpeech = useCallback(() => {
    if (typeof window === "undefined") return

    // If currently speaking, pause the speech
    if (speechState === "speaking") {
      window.speechSynthesis.pause()
      setSpeechState("paused")
      return
    }

    // If paused, resume the speech
    if (speechState === "paused") {
      window.speechSynthesis.resume()
      setSpeechState("speaking")
      return
    }

    // If idle, start new speech
    window.speechSynthesis.cancel()
    const contentToSpeak = getAllPageContent()
    const textToSpeak = contentToSpeak.join(". ")

    if (textToSpeak.trim() === "") {
      console.log("No content to speak")
      return
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = language === "en" ? "en-US" : "sw"
    utterance.rate = 0.9

    utterance.onstart = () => setSpeechState("speaking")
    utterance.onend = () => {
      setSpeechState("idle")
      speechSynthesisRef.current = null
    }
    utterance.onerror = () => {
      setSpeechState("idle")
      speechSynthesisRef.current = null
    }

    speechSynthesisRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [getAllPageContent, speechState, language])

  const stopSpeech = useCallback(() => {
    if (typeof window === "undefined") return

    window.speechSynthesis.cancel()
    setSpeechState("idle")
    speechSynthesisRef.current = null
  }, [])

  const toggleTheme = useCallback(() => {
    const measureToggle = measureTogglePerformance()
    const newTheme = theme === "light" ? "dark" : "light"

    // Apply theme change immediately to reduce perceived latency
    document.documentElement.classList.remove(theme || "")
    document.documentElement.classList.add(newTheme)

    // Debounce the state update and storage operations
    if (themeTransitionTimeout.current) {
      clearTimeout(themeTransitionTimeout.current)
    }

    themeTransitionTimeout.current = setTimeout(() => {
      setTheme(newTheme)
      localStorage.setItem("theme", newTheme)
      measureToggle()
    }, 0)
  }, [theme, setTheme, measureTogglePerformance])

  if (!mounted) {
    return (
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("welcome")}</h1>
          <div className="flex items-center gap-4">
            <div className="w-[100px]" />
            <div className="w-10 h-10" />
            <div className="w-10 h-10" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <TooltipProvider>
      <header className="border-b backdrop-blur-sm bg-background/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("welcome")}</h1>

          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={(value: "en" | "sw") => setLanguage(value)}>
              <SelectTrigger className="w-[100px] backdrop-blur-sm bg-background/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="sw">Kiswahili</SelectItem>
              </SelectContent>
            </Select>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="transition-transform active:scale-95 backdrop-blur-sm bg-background/30 border-border/50 hover:bg-background/50"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-slate-700" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{theme === "dark" ? t("lightMode") : t("darkMode")}</TooltipContent>
            </Tooltip>

            {speechState !== "idle" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={stopSpeech}
                    className="transition-transform active:scale-95 backdrop-blur-sm bg-background/30 border-border/50 hover:bg-background/50"
                  >
                    <VolumeX className="h-5 w-5 text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t("stopSpeaking")}</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSpeech}
                  className={`transition-transform active:scale-95 backdrop-blur-sm bg-background/30 border-border/50 hover:bg-background/50 ${
                    speechState === "speaking" ? "border-primary border-2" : ""
                  }`}
                >
                  {speechState === "speaking" ? (
                    <Pause className="h-5 w-5 text-primary animate-pulse" />
                  ) : speechState === "paused" ? (
                    <Volume2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {speechState === "speaking"
                  ? t("pauseSpeaking")
                  : speechState === "paused"
                    ? t("resumeSpeaking")
                    : t("readPage")}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
