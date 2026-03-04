"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/90 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">Dunaj<span className="text-aqua">media</span></Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-aqua">{t('nav.home')}</Link>
          <Link href="/pricing" className="text-sm hover:text-aqua">{t('nav.pricing')}</Link>
          <button 
            onClick={() => setLanguage(language === 'sk' ? 'en' : 'sk')}
            className="flex items-center gap-2 border border-white/10 px-3 py-1 rounded text-xs hover:border-aqua transition-all"
          >
            <Globe size={14} /> {language.toUpperCase()}
          </button>
        </div>
      </nav>
    </header>
  );
}
