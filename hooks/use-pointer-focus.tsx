"use client"

import { useState, useEffect } from "react"

export function usePointerFocus() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get the element under the pointer
      const element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null

      if (element) {
        // Find the closest readable element (heading, paragraph, button, etc.)
        const closestReadable = element.closest(
          'h1, h2, h3, h4, h5, h6, p, li, button, a, label, span, div[role="button"], [aria-label]',
        ) as HTMLElement | null

        if (closestReadable && closestReadable.textContent?.trim()) {
          setFocusedElement(closestReadable)
        }
      }
    }

    // Add throttling to avoid excessive updates
    let throttleTimeout: NodeJS.Timeout | null = null

    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          handleMouseMove(e)
          throttleTimeout = null
        }, 100) // Update every 100ms at most
      }
    }

    document.addEventListener("mousemove", throttledMouseMove)

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove)
      if (throttleTimeout) clearTimeout(throttleTimeout)
    }
  }, [])

  return { focusedElement }
}
