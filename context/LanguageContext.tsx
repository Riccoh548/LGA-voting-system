"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "sw"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    welcome: "Welcome to Local Government Authority Voting System",
    login: "Login",
    candidates: "Candidates",
    confirm: "Confirm Vote",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    addCandidate: "Add Candidate",
    confirmVote: "Confirm Vote",
    credentials: "Credentials",
    password: "Password",
    submit: "Submit",
    readPage: "Read page content",
    pauseSpeaking: "Pause speaking",
    resumeSpeaking: "Resume speaking",
    stopSpeaking: "Stop speaking",
    speaking: "Speaking...",
    electionPositions: "Election Positions",
    selectOnePerCategory: "Select one candidate per position",
    selectOneCandidate: "Select one candidate for this position",
    selected: "Selected",
    select: "Select",
    yourSelections: "Your Selections",
    reviewSelections: "Please review your selections",
    noSelections: "No candidates selected",
    back: "Back",
    voteConfirmed: "Vote Confirmed!",
    voteRecorded: "Your vote has been successfully recorded on the blockchain.",
  },
  sw: {
    welcome: "Karibu kwenye Mfumo wa Kupiga Kura wa Mamlaka ya Serikali za Mitaa",
    login: "Ingia",
    candidates: "Wagombea",
    confirm: "Thibitisha Kura",
    darkMode: "Hali ya Giza",
    lightMode: "Hali ya Mwanga",
    addCandidate: "Ongeza Mgombea",
    confirmVote: "Thibitisha Kura",
    credentials: "Vitambulisho",
    password: "Nywila",
    submit: "Wasilisha",
    readPage: "Soma maudhui ya ukurasa",
    pauseSpeaking: "Simamisha kusoma",
    resumeSpeaking: "Endelea kusoma",
    stopSpeaking: "Acha kusoma",
    speaking: "Inazungumza...",
    electionPositions: "Nafasi za Uchaguzi",
    selectOnePerCategory: "Chagua mgombea mmoja kwa kila nafasi",
    selectOneCandidate: "Chagua mgombea mmoja kwa nafasi hii",
    selected: "Umechagua",
    select: "Chagua",
    yourSelections: "Uchaguzi Wako",
    reviewSelections: "Tafadhali hakiki uchaguzi wako",
    noSelections: "Hakuna wagombea waliochaguliwa",
    back: "Rudi",
    voteConfirmed: "Kura Imethibitishwa!",
    voteRecorded: "Kura yako imerekodiwa kwa mafanikio kwenye blockchain.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
