"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import { useRouter } from "next/navigation"
import { ConfirmationPopup } from "@/components/confirmation-popup"

interface Candidate {
  id: number
  name: string
  party: string
  selected: boolean
}

interface CategoryData {
  id: string
  name: string
  nameSwahili: string
}

export default function ConfirmPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [selectedCandidates, setSelectedCandidates] = useState<Record<string, Candidate | null>>({})
  const [showConfirmation, setShowConfirmation] = useState(false)

  const categories: CategoryData[] = [
    { id: "village-chairpersons", name: "Village Chairpersons", nameSwahili: "Wenyeviti wa Vijiji" },
    { id: "village-council", name: "Village Council Members", nameSwahili: "Wajumbe wa Halmashauri ya Kijiji" },
    { id: "ward-chairpersons", name: "Ward Chairpersons", nameSwahili: "Wenyeviti wa Kata" },
    { id: "street-chairpersons", name: "Street Chairpersons", nameSwahili: "Wenyeviti wa Mitaa" },
    { id: "street-committee", name: "Street Committee Members", nameSwahili: "Wajumbe wa Kamati ya Mtaa" },
    { id: "hamlet-chairpersons", name: "Hamlet Chairpersons", nameSwahili: "Wenyeviti wa Vitongoji" },
  ]

  useEffect(() => {
    // Retrieve selected candidates from sessionStorage
    const storedCandidates = sessionStorage.getItem("selectedCandidates")
    if (storedCandidates) {
      setSelectedCandidates(JSON.parse(storedCandidates))
    }
  }, [])

  const handleConfirm = () => {
    // Clear the session storage
    sessionStorage.removeItem("selectedCandidates")

    // Show the confirmation popup
    setShowConfirmation(true)
  }

  const handlePopupClose = () => {
    setShowConfirmation(false)
    // Redirect to home after popup closes
    router.push("/")
  }

  const handleBack = () => {
    router.push("/candidates")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="backdrop-blur-sm bg-background/30 border border-border/50">
        <CardHeader>
          <CardTitle>{t("confirm")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg font-medium">{t("reviewSelections")}</p>

            {Object.entries(selectedCandidates).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(selectedCandidates).map(([categoryId, candidate]) => {
                  if (!candidate) return null
                  const category = categories.find((c) => c.id === categoryId)
                  if (!category) return null

                  return (
                    <div
                      key={categoryId}
                      className="p-4 rounded-lg backdrop-blur-sm bg-background/20 border border-border/50"
                    >
                      <h3 className="font-medium">{language === "en" ? category.name : category.nameSwahili}</h3>
                      <p className="text-lg">{candidate.name}</p>
                      <p className="text-sm text-foreground/80">{candidate.party}</p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-muted-foreground">{t("noSelections")}</p>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <Button
                onClick={handleBack}
                variant="outline"
                className="backdrop-blur-sm bg-background/30 hover:bg-background/50 border-border/50"
              >
                {t("back")}
              </Button>
              <Button
                onClick={handleConfirm}
                className="w-full sm:w-auto backdrop-blur-sm bg-primary/80 hover:bg-primary/90"
                disabled={Object.entries(selectedCandidates).length === 0}
              >
                {t("confirmVote")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmationPopup
        title={t("voteConfirmed")}
        description={t("voteRecorded")}
        isOpen={showConfirmation}
        onClose={handlePopupClose}
        autoCloseDelay={3000}
      />
    </div>
  )
}
