"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.startsWith("/sk") ? "sk" : "en";

  const navLinks = [
    { key: "home", href: "/" },
    { key: "services", href: "/#services" },
    { key: "about", href: "/#about" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/#contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-navy-light" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(100,255,218,0.3), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="font-display font-extrabold text-2xl tracking-tight block mb-4">
              <span className="text-slate-lightest">Dunaj</span>
              <span style={{
                background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>media</span>
            </Link>
            <p className="text-slate-text text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-text hover:text-aqua border border-white/10 hover:border-aqua/30 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-display font-semibold text-slate-lightest text-sm mb-4 tracking-wide">Pages</h4>
            <ul className="space-y-2">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-slate-text text-sm hover:text-aqua transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-slate-lightest text-sm mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-2 text-slate-text text-sm">
              <li>{t("contact.info.location")}</li>
              <li>
                <a href={`mailto:${t("contact.info.email")}`} className="hover:text-aqua transition-colors">
                  {t("contact.info.email")}
                </a>
              </li>
              <li>
                <a href={`tel:${t("contact.info.phone")}`} className="hover:text-aqua transition-colors">
                  {t("contact.info.phone")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-text text-xs">
            © {new Date().getFullYear()} Dunajmedia. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="text-xs text-slate-text hover:text-aqua transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href={`/${locale}/terms`} className="text-xs text-slate-text hover:text-aqua transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
