"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Dunaj<span className="text-aqua">media</span></Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-aqua">{t('nav.home')}</Link>
          <Link href="/#services" className="text-sm hover:text-aqua">{t('nav.services')}</Link>
          <Link href="/pricing" className="text-sm hover:text-aqua">{t('nav.pricing')}</Link>
          <Link href="/#contact" className="text-sm hover:text-aqua">{t('nav.contact')}</Link>
          
          <button 
            onClick={() => setLanguage(language === 'sk' ? 'en' : 'sk')}
            className="flex items-center gap-2 border border-white/10 px-3 py-1 rounded hover:border-aqua transition-all text-xs"
          >
            <Globe size={14} /> {language.toUpperCase()}
          </button>
        </div>
      </nav>
    </header>
  );
}
