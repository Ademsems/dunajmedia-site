"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/messages/en.json';
import sk from '@/messages/sk.json';

type Language = 'en' | 'sk';
const LanguageContext = createContext({
  language: 'sk',
  setLanguage: (lang: Language) => {},
  t: (key: string) => any
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('sk');

  // Helper to get text from JSON using "section.key" (like "nav.home")
  const t = (path: string) => {
    const dictionary = language === 'en' ? en : sk;
    return path.split('.').reduce((obj: any, key) => obj?.[key], dictionary) || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);