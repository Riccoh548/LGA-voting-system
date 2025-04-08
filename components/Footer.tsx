"use client"

import { useLanguage } from "@/context/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        © 2024 {t("welcome")}. All rights reserved.
      </div>
    </footer>
  )
}
