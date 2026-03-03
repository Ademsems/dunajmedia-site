"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const t = useTranslations("blog");
  const params = useParams();
  const locale = params?.locale ?? "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const posts = t.raw("posts") as Array<{ title: string; excerpt: string; date: string; tag: string }>;

  return (
    <section id="blog" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-navy-light" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aqua/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-aqua mb-4 block">
            — Insights —
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-lightest mb-4">
            {t("title")}
          </h2>
          <p className="max-w-xl mx-auto text-slate-text text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              className="group relative rounded-2xl overflow-hidden border border-white/5 flex flex-col"
              style={{ background: "rgba(10,25,47,0.8)" }}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
            >
              {/* Thumbnail placeholder with gradient */}
              <div
                className="h-48 flex-shrink-0 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, hsl(${210 + i * 15}, 70%, 12%), hsl(${190 + i * 15}, 80%, 16%))`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at ${30 + i * 20}% ${40 + i * 10}%, rgba(100,255,218,0.3) 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-4 left-4 font-mono text-xs px-3 py-1 rounded-full"
                  style={{ background: "rgba(100,255,218,0.15)", border: "1px solid rgba(100,255,218,0.3)", color: "#64FFDA" }}
                >
                  {post.tag}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <time className="font-mono text-xs text-slate-text mb-3 block">
                  {new Date(post.date).toLocaleDateString(locale === "sk" ? "sk-SK" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <h3 className="font-display text-lg font-bold text-slate-lightest mb-3 leading-snug group-hover:text-aqua transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-slate-text text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                <Link
                  href={`/${locale}/blog`}
                  className="mt-6 inline-flex items-center gap-2 text-aqua text-sm font-medium group/link"
                >
                  <span className="group-hover/link:underline">{t("readMore")}</span>
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(100,255,218,0.2)" }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
