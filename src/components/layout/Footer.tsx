"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { key: "home", href: "/" },
    { key: "services", href: "/#services" },
    { key: "pricing", href: "/pricing" },
    { key: "contact", href: "/#contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-navy-light" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-display font-extrabold text-2xl tracking-tight block mb-4 text-white">Dunaj<span className="text-aqua">media</span></Link>
            <p className="text-slate-text text-sm leading-relaxed max-w-xs mb-6">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="text-slate-lightest text-sm mb-4">Pages</h4>
            <ul className="space-y-2">
              {navLinks.map(({ key, href }) => (
                <li key={key}><Link href={href} className="text-slate-text text-sm hover:text-aqua transition-colors flex items-center gap-1.5">{t(`nav.${key}`)}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex justify-between text-xs text-slate-text">
          <p>© {new Date().getFullYear()} Dunajmedia. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
