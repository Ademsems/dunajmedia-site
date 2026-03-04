"use client";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="pt-32 pb-20 text-center">
      <h1 className="text-6xl font-bold">{t('pricing.title')}</h1> {/* Note the section.key format */}
      <p className="mt-4 text-slate-400">{t('pricing.subtitle')}</p>
      <Link href="#contact" className="mt-8 inline-block bg-aqua text-navy px-8 py-3 rounded-full font-bold">
        {t('pricing.cta')}
      </Link>
    </section>
  );
}
