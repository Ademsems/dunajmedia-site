"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone, CheckCircle2, AlertCircle, Send } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations('hero');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const services = t.raw("form.services") as string[];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aqua/20 to-transparent" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(100,255,218,0.03) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-aqua mb-4 block">
            — Get in touch —
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-lightest mb-4">
            {t('ContactForm.title')}
          </h2>
          <p className="max-w-xl mx-auto text-slate-text text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { Icon: MapPin, value: t("info.location") },
              { Icon: Mail, value: t("info.email") },
              { Icon: Phone, value: t("info.phone") },
            ].map(({ Icon, value }, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-white/5"
                style={{ background: "rgba(17,34,64,0.5)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(100,255,218,0.08)", border: "1px solid rgba(100,255,218,0.15)" }}>
                  <Icon size={18} className="text-aqua" />
                </div>
                <span className="text-slate-light text-sm">{value}</span>
              </div>
            ))}

            {/* Danube flow decoration */}
            <div className="mt-8 p-6 rounded-2xl border border-aqua/10 relative overflow-hidden"
              style={{ background: "rgba(100,255,218,0.03)" }}>
              <div className="font-display text-slate-lightest font-semibold mb-2">Bratislava, Slovakia</div>
              <p className="text-slate-text text-sm leading-relaxed">
                Flowing like the Danube — our team moves with energy, precision, and momentum.
              </p>
              <div className="mt-4 h-0.5 rounded-full overflow-hidden">
                <div className="h-full w-full" style={{
                  background: "linear-gradient(90deg, #64FFDA, #00E5FF, #64FFDA)",
                  backgroundSize: "200% 100%",
                  animation: "flow 3s ease infinite"
                }} />
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="p-8 rounded-2xl border border-white/5" style={{ background: "rgba(17,34,64,0.6)" }}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("form.name")}
                  className={inputClass}
                  disabled={status === "sending" || status === "success"}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("form.email")}
                  className={inputClass}
                  disabled={status === "sending" || status === "success"}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder={t("form.company")}
                  className={inputClass}
                  disabled={status === "sending" || status === "success"}
                />
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={inputClass + " cursor-pointer"}
                  disabled={status === "sending" || status === "success"}
                >
                  <option value="" disabled>{t("form.service")}</option>
                  {services.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("form.message")}
                rows={5}
                className={inputClass + " resize-none mb-6"}
                disabled={status === "sending" || status === "success"}
              />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: "rgba(100,255,218,0.1)", border: "1px solid rgba(100,255,218,0.3)" }}
                  >
                    <CheckCircle2 size={20} className="text-aqua" />
                    <span className="text-aqua text-sm">{t("form.success")}</span>
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl mb-4"
                    style={{ background: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.3)" }}
                  >
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-red-400 text-sm">{t("form.error")}</span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="button"
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-display font-semibold text-navy transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
                      boxShadow: "0 0 20px rgba(100,255,218,0.3)",
                    }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(100,255,218,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        {t("form.sending")}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t("form.submit")}
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
