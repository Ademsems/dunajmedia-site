"use client";
import React, { createContext, useContext, useState } from 'react';
import en from '@/messages/en.json';
import sk from '@/messages/sk.json';

const LanguageContext = createContext({
  language: 'sk',
  setLanguage: (lang: 'en' | 'sk') => {},
  t: (path: string) => ({} as any)
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'sk'>('sk');

  const t = (path: string) => {
    const dictionary = language === 'en' ? en : sk;
    const keys = path.split('.');
    let result: any = dictionary;
    for (const key of keys) {
      if (result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
