'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useThemePerformance } from '@/hooks/use-theme-performance';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pathname = usePathname();
  const { measureTogglePerformance } = useThemePerformance();
  const themeTransitionTimeout = useRef<NodeJS.Timeout>();

  // Initialize theme on mount with performance monitoring
  useEffect(() => {
    const measureMount = measureTogglePerformance();
    setMounted(true);
    
    // Force dark theme on initial load
    document.documentElement.classList.add('dark');
    setTheme('dark');
    
    measureMount();

    // Cleanup function
    return () => {
      if (themeTransitionTimeout.current) {
        clearTimeout(themeTransitionTimeout.current);
      }
    };
  }, [setTheme]);

  // Stop speaking when navigating
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [pathname]);

  const getPageContent = () => {
    switch (pathname) {
      case '/':
        return [
          t('welcome'),
          t('login'),
          t('credentials'),
          t('password'),
          t('submit'),
        ];
      case '/candidates':
        return [
          t('candidates'),
          'John Doe - Chama cha Mapinduzi',
          'Jane Smith - Chama cha Demokrasia na maendeleo',
          'Robert Johnson - Civic United Front',
          'Sarah Williams - ACT-Wazalendo',
          t('confirmVote'),
        ];
      case '/confirm':
        return [
          t('confirm'),
          t('confirmVote'),
        ];
      default:
        return [t('welcome')];
    }
  };

  const speakPageContent = useCallback(() => {
    if (typeof window === 'undefined' || isSpeaking) return;

    window.speechSynthesis.cancel();

    const textToSpeak = getPageContent().join('. ');
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'en' ? 'en-US' : 'sw';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [getPageContent, isSpeaking, language]);

  const toggleTheme = useCallback(() => {
    const measureToggle = measureTogglePerformance();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Apply theme change immediately to reduce perceived latency
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    
    // Debounce the state update and storage operations
    if (themeTransitionTimeout.current) {
      clearTimeout(themeTransitionTimeout.current);
    }
    
    themeTransitionTimeout.current = setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      measureToggle();
    }, 0);
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('welcome')}</h1>
          <div className="flex items-center gap-4">
            <div className="w-[100px]" />
            <div className="w-10 h-10" />
            <div className="w-10 h-10" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('welcome')}</h1>
        
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={(value: 'en' | 'sw') => setLanguage(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="sw">Kiswahili</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
            className="transition-transform active:scale-95"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={speakPageContent}
            disabled={isSpeaking}
            className={`transition-transform active:scale-95 ${isSpeaking ? 'animate-pulse' : ''}`}
            aria-label={isSpeaking ? t('speaking') : t('readPage')}
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}