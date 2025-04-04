'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: 'Welcome to Local Government Authority Voting System',
    login: 'Login',
    candidates: 'Candidates',
    confirm: 'Confirm Vote',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    addCandidate: 'Add Candidate',
    confirmVote: 'Confirm Vote',
    credentials: 'Credentials',
    password: 'Password',
    submit: 'Submit',
    readPage: 'Read page content',
    speaking: 'Speaking...',
  },
  sw: {
    welcome: 'Karibu kwenye Mfumo wa Kupiga Kura wa Mamlaka ya Serikali za Mitaa',
    login: 'Ingia',
    candidates: 'Wagombea',
    confirm: 'Thibitisha Kura',
    darkMode: 'Hali ya Giza',
    lightMode: 'Hali ya Mwanga',
    addCandidate: 'Ongeza Mgombea',
    confirmVote: 'Thibitisha Kura',
    credentials: 'Vitambulisho',
    password: 'Nywila',
    submit: 'Wasilisha',
    readPage: 'Soma maudhui ya ukurasa',
    speaking: 'Inazungumza...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}