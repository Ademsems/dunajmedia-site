"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const stats = [
  { value: "80+", key: "clients" },
  { value: "150+", key: "projects" },
  { value: "5+", key: "years" },
  { value: "12", key: "countries" },
];

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 bg-navy px-6" ref={ref}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('about.title')}</h2>
          <p className="text-aqua text-xl mb-6">{t("about.subtitle")}</p>
          <p className="text-slate-400 text-lg">{t("about.body")}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div key={stat.key} className="p-8 rounded-2xl bg-navy-light border border-white/5 text-center">
              <div className="text-4xl font-bold text-aqua mb-2">{stat.value}</div>
              <div className="text-slate-500 text-sm">{t(`about.stats.${stat.key}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
