"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import { ElectionSidebar, type ElectionCategory } from "@/components/election-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

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
  candidates: Candidate[]
}

export default function CandidatesPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  const [categories, setCategories] = useState<CategoryData[]>([
    {
      id: "village-chairpersons",
      name: "Village Chairpersons",
      nameSwahili: "Wenyeviti wa Vijiji",
      candidates: [
        { id: 1, name: "Amani Mwangi", party: "Chama cha Mapinduzi (CCM)", selected: false },
        { id: 2, name: "Baraka Ochieng", party: "Chama cha Demokrasia na maendeleo (CHADEMA)", selected: false },
        { id: 3, name: "Chiku Nyerere", party: "Civic United Front (CUF)", selected: false },
        { id: 4, name: "Dalila Hassan", party: "ACT-Wazalendo", selected: false },
      ],
    },
    {
      id: "village-council",
      name: "Village Council Members",
      nameSwahili: "Wajumbe wa Halmashauri ya Kijiji",
      candidates: [
        { id: 5, name: "Elimu Juma", party: "Chama cha Mapinduzi (CCM)", selected: false },
        { id: 6, name: "Faraja Kimathi", party: "Chama cha Demokrasia na maendeleo (CHADEMA)", selected: false },
        { id: 7, name: "Gideon Mwakasege", party: "Civic United Front (CUF)", selected: false },
        { id: 8, name: "Halima Rashidi", party: "ACT-Wazalendo", selected: false },
      ],
    },
    {
      id: "ward-chairpersons",
      name: "Ward Chairpersons",
      nameSwahili: "Wenyeviti wa Kata",
      candidates: [
        { id: 9, name: "Ibrahim Mwinyimvua", party: "Chama cha Mapinduzi (CCM)", selected: false },
        { id: 10, name: "Jamila Kiongozi", party: "Chama cha Demokrasia na maendeleo (CHADEMA)", selected: false },
        { id: 11, name: "Karimu Salehe", party: "Civic United Front (CUF)", selected: false },
        { id: 12, name: "Latifa Mwanahamisi", party: "ACT-Wazalendo", selected: false },
      ],
    },
    {
      id: "street-chairpersons",
      name: "Street Chairpersons",
      nameSwahili: "Wenyeviti wa Mitaa",
      candidates: [
        { id: 13, name: "Malaika Juma", party: "Chama cha Mapinduzi (CCM)", selected: false },
        { id: 14, name: "Neema Kitwana", party: "Chama cha Demokrasia na maendeleo (CHADEMA)", selected: false },
        { id: 15, name: "Omar Bakari", party: "Civic United Front (CUF)", selected: false },
        { id: 16, name: "Pendo Mwakipesile", party: "ACT-Wazalendo", selected: false },
      ],
    },
    {
      id: "street-committee",
      name: "Street Committee Members",
      nameSwahili: "Wajumbe wa Kamati ya Mtaa",
      candidates: [
        { id: 17, name: "Ramadhani Selemani", party: "Chama cha Mapinduzi (CCM)", selected: false },
        { id: 18, name: "Safina Mwanaidi", party: "Chama cha Demokrasia na maendeleo (CHADEMA)", selected: false },
        { id: 19, name: "Tumaini Mwakasungula", party: "Civic United Front (CUF)", selected: false },
        { id: 20, name: "Upendo Mwakajinga", party: "ACT-Wazalendo", selected: false },
      ],
    },
    {
      id: "hamlet-chairpersons",
      name: "Hamlet Chairpersons",
      nameSwahili: "Wenyeviti wa Vitongoji",
      candidates: [
        { id: 21, name: "Vumilia Mwanaisha", party: "Chama cha Mapinduzi (CCM)", selected: false },
        { id: 22, name: "Wema Mwakasege", party: "Chama cha Demokrasia na maendeleo (CHADEMA)", selected: false },
        { id: 23, name: "Yahaya Mwinyimvua", party: "Civic United Front (CUF)", selected: false },
        { id: 24, name: "Zawadi Mwakasungula", party: "ACT-Wazalendo", selected: false },
      ],
    },
  ])

  const [activeCategory, setActiveCategory] = useState<string>("village-chairpersons")
  const [selectedCandidates, setSelectedCandidates] = useState<Record<string, Candidate | null>>({})

  // Get the current active category data
  const activeCategoryData = categories.find((cat) => cat.id === activeCategory) || categories[0]

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  const handleCandidateSelection = (candidateId: number) => {
    // Update the categories state
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === activeCategory) {
          return {
            ...category,
            candidates: category.candidates.map((candidate) => ({
              ...candidate,
              selected: candidate.id === candidateId,
            })),
          }
        }
        return category
      }),
    )

    // Update the selected candidates record
    const selectedCandidate = activeCategoryData.candidates.find((c) => c.id === candidateId) || null
    setSelectedCandidates((prev) => ({
      ...prev,
      [activeCategory]: selectedCandidate ? { ...selectedCandidate, selected: true } : null,
    }))
  }

  const handleConfirm = () => {
    // Check if at least one candidate is selected
    const hasSelection = Object.values(selectedCandidates).some((candidate) => candidate !== null)
    if (hasSelection) {
      // Store selected candidates in sessionStorage for the confirm page
      sessionStorage.setItem("selectedCandidates", JSON.stringify(selectedCandidates))
      router.push("/confirm")
    }
  }

  // Convert categories to the format expected by ElectionSidebar
  const sidebarCategories: ElectionCategory[] = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    nameSwahili: cat.nameSwahili,
  }))

  return (
    <SidebarProvider>
      <ElectionSidebar
        categories={sidebarCategories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <SidebarInset className="bg-transparent">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 backdrop-blur-sm bg-background/30 p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">
              {language === "en" ? activeCategoryData.name : activeCategoryData.nameSwahili}
            </h1>
            <p className="text-muted-foreground">{t("selectOneCandidate")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategoryData.candidates.map((candidate) => (
              <Card
                key={candidate.id}
                className={`backdrop-blur-sm bg-background/30 border ${candidate.selected ? "border-primary border-2" : "border-border/50"}`}
              >
                <CardHeader>
                  <CardTitle>{candidate.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">{candidate.party}</p>
                  <Button
                    onClick={() => handleCandidateSelection(candidate.id)}
                    variant={candidate.selected ? "default" : "outline"}
                    className={`w-full ${candidate.selected ? "" : "bg-background/50 hover:bg-background/70"}`}
                  >
                    {candidate.selected ? t("selected") : t("select")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {Object.keys(selectedCandidates).length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 backdrop-blur-sm bg-background/30 p-4 rounded-lg">
                {t("yourSelections")}
              </h2>
              <div className="space-y-4">
                {Object.entries(selectedCandidates).map(([categoryId, candidate]) => {
                  if (!candidate) return null
                  const category = categories.find((c) => c.id === categoryId)
                  if (!category) return null

                  return (
                    <div
                      key={categoryId}
                      className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm bg-background/30 border border-border/50"
                    >
                      <div>
                        <h3 className="font-medium">{language === "en" ? category.name : category.nameSwahili}</h3>
                        <p>{candidate.name}</p>
                        <p className="text-sm text-foreground/80">{candidate.party}</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/20 border-primary/50">
                        {t("selected")}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button onClick={handleConfirm} className="backdrop-blur-sm bg-primary/80 hover:bg-primary/90">
              {t("confirmVote")}
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
