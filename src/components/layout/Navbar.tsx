"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

const navKeys = ["home", "services", "about", "blog", "contact"] as const;
const navHrefs: Record<string, string> = {
  home: "/",
  services: "/#services",
  about: "/#about",
  blog: "/blog",
  contact: "/#contact",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const locale = pathname.startsWith("/sk") ? "sk" : "en";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "en" ? "sk" : "en";
    const withoutLocale = pathname.replace(/^\/(en|sk)/, "") || "/";
    router.push(`/${newLocale}${withoutLocale}`);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,25,47,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(100,255,218,0.08)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="font-display font-extrabold text-xl tracking-tight group">
          <span className="text-slate-lightest group-hover:text-white transition-colors">Dunaj</span>
          <span
            style={{
              background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            media
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`/${locale}${navHrefs[key]}`}
              className="px-4 py-2 rounded-lg font-body text-sm text-slate-text hover:text-slate-lightest hover:bg-white/5 transition-all duration-200"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-text hover:text-aqua border border-white/10 hover:border-aqua/30 transition-all duration-200"
            aria-label="Switch language"
          >
            <Globe size={13} />
            {locale.toUpperCase()}
            <span className="text-white/30">|</span>
            {locale === "en" ? "SK" : "EN"}
          </button>

          {/* CTA */}
          <Link
            href={`/${locale}/#contact`}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full font-display font-semibold text-navy text-sm transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
              boxShadow: "0 0 15px rgba(100,255,218,0.25)",
            }}
          >
            {t("getStarted")}
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-text hover:text-slate-lightest"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 overflow-hidden"
            style={{ background: "rgba(10,25,47,0.98)", backdropFilter: "blur(20px)" }}
          >
            <div className="px-6 py-4 space-y-1">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={`/${locale}${navHrefs[key]}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-slate-text hover:text-slate-lightest hover:bg-white/5 transition-all"
                >
                  {t(key)}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button onClick={switchLocale} className="flex items-center gap-2 text-sm text-aqua">
                  <Globe size={14} />
                  Switch to {locale === "en" ? "Slovenčina" : "English"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
