"use client"

import { useEffect } from "react"
import { APP_CONFIG } from "@/lib/constants"

export function VersionLogger() {
  useEffect(() => {
    // Create a styled console message
    const styles = [
      "color: #CCED00",
      "font-size: 16px",
      "font-weight: bold",
      "padding: 4px 8px",
    ].join(";")

    const secondaryStyles = [
      "color: #FFFFFF",
      "font-size: 14px",
    ].join(";")

    const accentStyles = [
      "color: #CCED00",
      "font-size: 14px",
      "font-weight: bold",
    ].join(";")

    console.log(
      `%c${APP_CONFIG.NAME} %c${APP_CONFIG.VERSION}`,
      styles,
      accentStyles
    )
    console.log(
      `%c${APP_CONFIG.DESCRIPTION}`,
      secondaryStyles
    )
    console.log(
      `%cBuild Information:`,
      secondaryStyles,
      {
        version: APP_CONFIG.VERSION,
        name: APP_CONFIG.NAME,
        environment: process.env.NODE_ENV || "development",
      }
    )
  }, [])

  return null
}

