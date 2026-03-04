"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

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
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-navy" />
      <div
        className="absolute bottom-0 left-0 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,229,255,0.03) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.span
              className="font-mono text-xs tracking-[0.3em] uppercase text-aqua mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              — About us —
            </motion.span>
            <motion.h2
              className="font-display text-4xl sm:text-5xl font-bold text-slate-lightest mb-4 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('about.title')}
            </motion.h2>
            <motion.p
              className="font-display text-aqua text-xl mb-6 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("subtitle")}
            </motion.p>
            <motion.p
              className="text-slate-text text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t("body")}
            </motion.p>

            {/* Danube visual element */}
            <motion.div
              className="mt-10 relative h-1 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ transformOrigin: "left" }}
            >
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, #64FFDA, #00E5FF, #64FFDA)", backgroundSize: "200% 100%", animation: "flow 4s ease infinite" }}
              />
            </motion.div>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                className="relative p-8 rounded-2xl border border-white/5 text-center group"
                style={{ background: "rgba(17,34,64,0.6)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, rgba(100,255,218,0.06) 0%, transparent 70%)" }}
                  aria-hidden="true"
                />
                <div
                  className="font-display text-5xl font-extrabold mb-2"
                  style={{
                    background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-slate-text text-sm font-medium">
                  {t(`stats.${stat.key}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
