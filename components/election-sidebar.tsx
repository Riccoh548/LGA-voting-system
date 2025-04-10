"use client"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import { Check } from "lucide-react"

export interface ElectionCategory {
  id: string
  name: string
  nameSwahili: string
}

interface ElectionSidebarProps {
  categories: ElectionCategory[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function ElectionSidebar({ categories, activeCategory, onCategoryChange }: ElectionSidebarProps) {
  const { language, t } = useLanguage()
  const router = useRouter()

  const handleConfirm = () => {
    router.push("/confirm")
  }

  return (
    <Sidebar className="glass-sidebar">
      <SidebarHeader>
        <div className="p-2">
          <h2 className="text-lg font-semibold">{t("electionPositions")}</h2>
          <p className="text-sm text-muted-foreground">{t("selectOnePerCategory")}</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {categories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <SidebarMenuButton
                  isActive={activeCategory === category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={
                    activeCategory === category.id ? "bg-primary/20 text-foreground" : "hover:bg-background/40"
                  }
                >
                  {activeCategory === category.id && <Check className="mr-2 h-4 w-4" />}
                  <span>{language === "en" ? category.name : category.nameSwahili}</span> 
                  
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button onClick={handleConfirm} className="w-full backdrop-blur-sm bg-primary/80 hover:bg-primary/90">
            {t("confirmVote")}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
