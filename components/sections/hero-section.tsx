"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function useTextScramble(text: string, started: boolean, delay = 0) {
  // Initialise with the real text so it is present in the server-rendered HTML
  // (SEO / no-JS); the decode animation runs on the client after mount.
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (!started) return;
    frame.current = 0;
    const timer = setTimeout(() => {
      const total = 36;
      const animate = () => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (frame.current > (i / text.length) * total) return char;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        frame.current++;
        if (frame.current <= total) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, started, delay]);

  return display;
}

const easeExpo = [0.16, 1, 0.3, 1] as const;

const STATS = [
  // { k: "2+ YRS", v: "YEARS BUILDING" },
  // { k: "BUILD → SHIP", v: "END-TO-END" },
  { k: "FULL-STACK", v: "ENGINEERING" },
  { k: "5", v: "PLATFORMS SHIPPED" },
  // { k: "END-TO-END", v: "PRODUCT ENGINEERING" },
  { k: "END-TO-END", v: "PRODUCT DELIVERY" },
];

const SPECS: { k: string; v: string; accent?: boolean }[] = [
  { k: "ROLE", v: "Full-Stack Engineer" },
  { k: "FOCUS", v: "Multi-tenant SaaS" },
  { k: "STACK", v: "Polyglot · Full-Stack" },
  { k: "BASED", v: "Pakistan · UTC+5" },
  { k: "STATUS", v: "Open to work", accent: true },
];

export function HeroSection() {
  const [started, setStarted] = useState(false);
  const [clock, setClock] = useState("");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yName   = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yRole   = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const line1 = useTextScramble("HASAN", started, 350);
  const line2 = useTextScramble("MUNIR", started, 600);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    setClock(fmt());
    const id = setInterval(() => setClock(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="hero-bg relative min-h-screen flex flex-col overflow-hidden"
    >
      <div className="grid-overlay" />

      {/* Corner frame marks */}
      {[
        "top-6 left-6 md:top-8 md:left-8 border-t border-l",
        "top-6 right-6 md:top-8 md:right-8 border-t border-r",
        "bottom-6 left-6 md:bottom-8 md:left-8 border-b border-l",
        "bottom-6 right-6 md:bottom-8 md:right-8 border-b border-r",
      ].map((c) => (
        <span
          key={c}
          className={`pointer-events-none absolute z-10 w-4 h-4 ${c}`}
          style={{ borderColor: "var(--text-3)" }}
        />
      ))}

      {/* Scan line reveal */}
      <motion.div
        className="hero-scan"
        initial={{ top: "0%", opacity: 0 }}
        animate={{ top: ["0%", "100%"], opacity: [0, 0.7, 0.7, 0] }}
        transition={{ duration: 2.4, ease: "linear", delay: 0.3, times: [0, 0.05, 0.95, 1] }}
      />

      {/* Scene label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-20 left-6 md:left-10 flex items-center gap-3 z-10"
      >
        <span className="text-label text-ink-3">SCENE</span>
        <span className="text-label text-fire">01</span>
        <span className="text-label text-ink-3">/ ARRIVAL</span>
      </motion.div>

      {/* Available badge + live clock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute top-20 right-6 md:right-10 hidden md:flex flex-col items-end gap-1.5 z-10"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 available-dot" />
          <span className="text-label text-ink-2">OPEN TO WORK</span>
        </div>
        <span className="text-label text-ink-3 tabular-nums">KHI {clock || "--:--:--"}</span>
      </motion.div>

      {/* Vertical edge label */}
      <div className="pointer-events-none absolute left-6 md:left-8 top-1/2 -translate-y-1/2 hidden lg:block z-10">
        <span className="text-label text-ink-3 tracking-[0.35em] [writing-mode:vertical-rl] rotate-180">
          PORTFOLIO / 2026
        </span>
      </div>

      {/* Main content - parallax wrapper */}
      <motion.div
        style={{ y: yName, opacity }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 pt-32 pb-28"
      >
        <div className="max-w-[1400px] mx-auto w-full">

          {/* Name + spec sheet (spec fills the right side on desktop) */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
            <div className="select-none w-fit">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: easeExpo, delay: 0.3 }}
                >
                  <h1 className="text-name is-spread text-ink" aria-label="Hasan">
                    {line1.split("").map((c, i) => (
                      <span key={i} aria-hidden="true">{c}</span>
                    ))}
                  </h1>
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: easeExpo, delay: 0.45 }}
                >
                  <h1 className="text-name text-outlined whitespace-nowrap" aria-label="Munir">
                    {line2}
                  </h1>
                </motion.div>
              </div>
            </div>

            {/* Spec sheet */}
            <motion.dl
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: easeExpo, delay: 1.1 }}
              className="hidden lg:flex flex-col gap-3 shrink-0 min-w-[260px] border-l border-stroke pl-8 pb-1"
            >
              {SPECS.map(({ k, v, accent }) => (
                <div key={k} className="flex items-baseline justify-between gap-6">
                  <dt className="text-label text-ink-3">{k}</dt>
                  <dd className={`text-label ${accent ? "text-[color:rgba(74,222,128,0.9)]" : "text-ink-2"}`}>{v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Divider + role */}
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: easeExpo, delay: 0.9 }}
              className="hidden md:block h-px flex-1 bg-stroke origin-left"
            />
            <motion.div style={{ y: yRole }} className="md:pl-10 flex flex-col gap-2">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: easeExpo, delay: 1.0 }}
                  className="font-display text-3xl md:text-5xl lg:text-6xl tracking-wider text-ink"
                >
                  FULL-STACK ENGINEER
                </motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: easeExpo, delay: 1.15 }}
                  className="text-label text-ink-2"
                >
                  {/* NEXT.JS · NODE.JS · FASTAPI · MONGODB · POSTGRESQL */}
                  Product Engineering · Web · Backend · Cloud · DevOps
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeExpo, delay: 1.3 }}
            className="mt-10 md:mt-12 flex flex-wrap gap-x-8 gap-y-4 md:gap-x-12 border-t border-stroke pt-6"
          >
            {STATS.map((s) => (
              <div key={s.k} className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl text-ink leading-none">{s.k}</span>
                <span className="text-label text-ink-3 mt-1">{s.v}</span>
              </div>
            ))}
          </motion.div>

          {/* Bio + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeExpo, delay: 1.5 }}
            className="mt-10 md:mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          >
            <p className="max-w-xs text-sm leading-relaxed text-ink-2">
                I build and ship software end to end, from interfaces and APIs to databases, infrastructure, and deployment. Comfortable across stacks, products, and problem spaces.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo("#projects")}
                className="btn-accent !px-9 !py-4 !text-sm"
                data-hover
              >
                View Work <span>↗</span>
              </button>
              <a
                href="/resume/Muhammad Hasan Munir.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !px-9 !py-4 !text-sm"
                data-hover
              >
                Resume <span>↓</span>
              </a>
              <a
                href="https://github.com/hasanmunir-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !px-9 !py-4 !text-sm"
                data-hover
              >
                GitHub <span>↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/hasanmunir-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !px-9 !py-4 !text-sm"
                data-hover
              >
                LinkedIn <span>↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech marquee strip */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-20 left-0 right-0 border-y border-stroke py-2.5 overflow-hidden hidden sm:block"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <div className="marquee-content" key={n}>
              {MARQUEE.map((t) => (
                <span key={`${n}-${t}`} className="flex items-center">
                  <span className="text-label text-ink-3 px-6">{t}</span>
                  <span className="text-fire text-[10px]">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div> */}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:left-10 flex items-center gap-3 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-ink-3"
        />
        <span className="text-label text-ink-3">SCROLL</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 right-6 md:right-10 z-10"
      >
        <span className="text-label text-ink-3">MMXXVI</span>
      </motion.div>
    </section>
  );
}
