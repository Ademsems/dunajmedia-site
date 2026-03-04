"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import en from "@/messages/en.json";
import sk from "@/messages/sk.json";
import { MapPin, Mail, Phone, CheckCircle2, AlertCircle, Send } from "lucide-react";

export default function ContactForm() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Own the work: Manual JSON array access
  const dict = language === 'en' ? en : sk;
  // Ensure your JSON has "contact.form.services" defined!
  const services = (dict as any).contact?.form?.services || ["Web Development", "Marketing"];

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
    setForm({ name: "", email: "", company: "", service: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputClass = "w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3.5 text-slate-lightest placeholder-slate-text/50 focus:outline-none focus:border-aqua/50 focus:bg-navy/80 transition-all duration-200 text-sm font-body";

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-navy" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-aqua mb-4 block">— Get in touch —</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-lightest mb-4">{t('contact.title')}</h2>
          <p className="max-w-xl mx-auto text-slate-text text-lg">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div className="lg:col-span-2 space-y-6" initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            {[
              { Icon: MapPin, value: t("contact.info.location") },
              { Icon: Mail, value: t("contact.info.email") },
              { Icon: Phone, value: t("contact.info.phone") },
            ].map(({ Icon, value }, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-white/5" style={{ background: "rgba(17,34,64,0.5)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(100,255,218,0.08)", border: "1px solid rgba(100,255,218,0.15)" }}><Icon size={18} className="text-aqua" /></div>
                <span className="text-slate-light text-sm">{value}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="p-8 rounded-2xl border border-white/5" style={{ background: "rgba(17,34,64,0.6)" }}>
              <input name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder={t("contact.form.name")} className={inputClass} />
              <input name="email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder={t("contact.form.email")} className={inputClass + " mt-4"} />
              <textarea name="message" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder={t("contact.form.message")} rows={5} className={inputClass + " mt-4 resize-none mb-6"} />
              <motion.button onClick={handleSubmit} className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-display font-semibold text-navy transition-all" style={{ background: "linear-gradient(135deg, #64FFDA, #00E5FF)" }}>
                {status === "sending" ? "..." : <><Send size={18} /> {t("contact.form.submit")}</>}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
