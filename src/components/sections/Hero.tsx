"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

const Particle = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-aqua pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, opacity: 0 }}
    animate={{ opacity: [0, 0.6, 0], y: [0, -80, -160], scale: [1, 1.5, 0.5] }}
    transition={{ duration: 4 + delay, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

const WaveForm = () => (
  <svg
    className="absolute bottom-0 left-0 w-full opacity-20 pointer-events-none"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M0 60 C240 20, 480 100, 720 60 C960 20, 1200 100, 1440 60 L1440 120 L0 120 Z"
      fill="url(#waveGrad)"
      animate={{
        d: [
          "M0 60 C240 20, 480 100, 720 60 C960 20, 1200 100, 1440 60 L1440 120 L0 120 Z",
          "M0 60 C240 100, 480 20, 720 60 C960 100, 1200 20, 1440 60 L1440 120 L0 120 Z",
          "M0 60 C240 20, 480 100, 720 60 C960 20, 1200 100, 1440 60 L1440 120 L0 120 Z",
        ],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <defs>
      <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#64FFDA" />
        <stop offset="50%" stopColor="#00E5FF" />
        <stop offset="100%" stopColor="#64FFDA" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Hero() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = params?.locale ?? "en";
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const springY = useSpring(rawY, { stiffness: 100, damping: 30 });

  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: (i * 8.33) + Math.sin(i) * 5,
    y: 20 + Math.cos(i) * 30,
    size: 2 + (i % 3),
    delay: i * 0.4,
  }));

  const words = t("headline").split(" ");

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex items-center justify-center"
      aria-label="Hero section"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: springY }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay bg-black/40 */}
      <div className="absolute inset-0 z-10 bg-black/40" aria-hidden="true" />

      {/* Gradient fade to navy at bottom */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(10,25,47,0.2) 0%, rgba(10,25,47,0.0) 40%, rgba(10,25,47,0.85) 100%)" }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-grid-pattern bg-grid opacity-40"
        aria-hidden="true"
      />

      {/* Particles */}
      <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* Waveform */}
      <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
        <WaveForm />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-30 max-w-6xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-aqua" />
          <span
            className="font-mono text-xs tracking-[0.3em] uppercase text-aqua"
            style={{ textShadow: "0 0 20px rgba(100,255,218,0.6)" }}
          >
            {t("tagline")}
          </span>
          <span className="w-8 h-px bg-aqua" />
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6">
          <span className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block overflow-hidden"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.77, 0, 0.175, 1] }}
              >
                <motion.span
                  className="inline-block"
                  style={
                    i % 3 === 2
                      ? {
                          background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : { color: "#E6F1FF" }
                  }
                >
                  {word}
                </motion.span>
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-light/80 font-light leading-relaxed mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        >
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-semibold text-navy text-base overflow-hidden transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #64FFDA, #00E5FF)", boxShadow: "0 0 30px rgba(100,255,218,0.4)" }}
          >
            <span className="relative z-10">{t("cta")}</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={18} />
            </motion.div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>

          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-medium text-aqua text-base border border-aqua/30 hover:border-aqua/70 hover:bg-aqua/5 transition-all duration-300"
          >
            {t("ctaSecondary")}
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="font-mono text-xs text-slate tracking-widest uppercase">{t("scrollHint")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-aqua/60" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 z-30 w-12 h-12 pointer-events-none border-t border-l border-aqua/30" aria-hidden="true" />
      <div className="absolute top-8 right-8 z-30 w-12 h-12 pointer-events-none border-t border-r border-aqua/30" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 z-30 w-12 h-12 pointer-events-none border-b border-l border-aqua/30" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 z-30 w-12 h-12 pointer-events-none border-b border-r border-aqua/30" aria-hidden="true" />
    </section>
  );
}
