"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const tierKeys = ["tier1", "tier2", "tier3"] as const;

export default function PricingTable() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-lightest mb-4">
            {t('pricingtable.title')}
          </h1>
          <p className="text-slate-text text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tierKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                i === 1 ? "border-aqua bg-navy-light shadow-xl" : "border-white/5 bg-navy/50"
              }`}
            >
              {i === 1 && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-aqua text-navy text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-display font-bold text-white mb-2">{t(`tiers.${key}.name`)}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-aqua">€{t(`tiers.${key}.price`)}</span>
                <span className="text-slate-text text-sm">/ fixed</span>
              </div>
              <p className="text-slate-text text-sm mb-8">{t(`tiers.${key}.desc`)}</p>
              
              <ul className="space-y-4 mb-10">
                {(t.raw(`tiers.${key}.features`) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-light text-sm">
                    <Check size={16} className="text-aqua mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href="#contact"
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                  i === 1 
                  ? "bg-aqua text-navy hover:bg-white" 
                  : "border border-aqua/30 text-aqua hover:bg-aqua/10"
                }`}
              >
                {t("cta")} <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
