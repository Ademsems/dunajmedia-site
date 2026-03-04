"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import en from "@/messages/en.json"; // Required for raw mapping
import sk from "@/messages/sk.json"; // Required for raw mapping
import { Globe, Users, Search, TrendingUp, CheckCircle2 } from "lucide-react";

const serviceIcons = [Globe, Users, Search, TrendingUp];
const serviceKeys = ["web", "social", "seo", "growth"] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-navy-light" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aqua/30 to-transparent" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(100,255,218,0.04) 0%, transparent 70%)" }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-aqua mb-4 block">— What we do —</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-slate-lightest mb-4">
            {t('services.title')}
          </h2>
          <p className="max-w-xl mx-auto text-slate-text text-lg">{t("services.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[i];
            // Own the work: Manual JSON lookup because t.raw doesn't exist in our simple context
            const dict = language === 'en' ? en : sk;
            const items = (dict as any).services[key].items as string[];
            
            return (
              <motion.div key={key} custom={i} variants={cardVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="group relative rounded-2xl p-8 border border-white/5 overflow-hidden cursor-default" style={{ background: "rgba(17,34,64,0.6)" }} whileHover={{ scale: 1.02 }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 relative" style={{ background: "rgba(100,255,218,0.08)", border: "1px solid rgba(100,255,218,0.15)" }}>
                  <Icon size={24} className="text-aqua" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-lightest mb-3">{t(`services.${key}.title`)}</h3>
                <p className="text-slate-text leading-relaxed mb-6">{t(`services.${key}.description`)}</p>
                <ul className="space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-light">
                      <CheckCircle2 size={14} className="text-aqua flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-6 right-8 font-display font-bold text-6xl opacity-5 group-hover:opacity-10 transition-opacity duration-300 select-none pointer-events-none">0{i + 1}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
