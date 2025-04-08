"use client"

import { useRef } from "react"

export function useThemePerformance() {
  const lastToggleTime = useRef<number>(0)
  const performanceMetrics = useRef<{
    avgResponseTime: number
    sampleCount: number
  }>({ avgResponseTime: 0, sampleCount: 0 })

  const measureTogglePerformance = () => {
    const startTime = performance.now()
    return () => {
      const endTime = performance.now()
      const responseTime = endTime - startTime

      performanceMetrics.current = {
        avgResponseTime:
          (performanceMetrics.current.avgResponseTime * performanceMetrics.current.sampleCount + responseTime) /
          (performanceMetrics.current.sampleCount + 1),
        sampleCount: performanceMetrics.current.sampleCount + 1,
      }

      // Log if response time exceeds threshold
      if (responseTime > 100) {
        console.warn(`Theme toggle took ${Math.round(responseTime)}ms, exceeding 100ms threshold`)
      }
    }
  }

  return { measureTogglePerformance }
}
