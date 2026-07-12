"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroScene } from "@/components/scene-bg/hero-scene";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function useTextScramble(text: string, started: boolean, delay = 0) {
  const [display, setDisplay] = useState(text.replace(/[^\s]/g, "_"));
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

export function HeroSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yName   = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yRole   = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const hasanDisplay = useTextScramble("HASAN", started, 400);
  const munirDisplay = useTextScramble("MUNIR", started, 700);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
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
      <HeroScene />
      <div className="grid-overlay" />

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

      {/* Available badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute top-20 right-6 md:right-10 hidden md:flex items-center gap-2 z-10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 available-dot" />
        <span className="text-label text-ink-2">OPEN TO WORK</span>
      </motion.div>

      {/* Main content — parallax wrapper */}
      <motion.div
        style={{ y: yName, opacity }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 pt-32 pb-24"
      >
        <div className="max-w-[1400px] mx-auto w-full">

          {/* Name */}
          <div className="select-none">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: easeExpo, delay: 0.3 }}
              >
                <h1 className="text-hero text-ink leading-none">{hasanDisplay}</h1>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: easeExpo, delay: 0.5 }}
              >
                <h1 className="text-hero text-outlined leading-none">{munirDisplay}</h1>
              </motion.div>
            </div>
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
                  FULL–STACK ENGINEER
                </motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: easeExpo, delay: 1.15 }}
                  className="text-label text-ink-2"
                >
                  NEXT.JS · NODE.JS · FASTAPI · MONGODB · POSTGRESQL
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Bio + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeExpo, delay: 1.4 }}
            className="mt-10 md:mt-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          >
            <p className="max-w-xs text-sm leading-relaxed text-ink-2">
              Building production-grade systems that scale. Real-world engineering
              across the full stack — from REST APIs to reactive UIs.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo("#projects")}
                className="btn-accent"
              >
                View Work <span>↗</span>
              </button>
              <a
                href="/resume/Muhammad Hasan Munir Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Resume
              </a>
              <div className="flex items-center gap-3 ml-2">
                <a
                  href="https://github.com/hasanmunir-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label text-ink-2 hover:text-ink transition-colors duration-200"
                  data-hover
                >
                  GH
                </a>
                <span className="text-ink-3 text-xs">·</span>
                <a
                  href="https://www.linkedin.com/in/hasanmunir-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label text-ink-2 hover:text-ink transition-colors duration-200"
                  data-hover
                >
                  LI
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:left-10 flex items-center gap-3"
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
        className="absolute bottom-8 right-6 md:right-10"
      >
        <span className="text-label text-ink-3">2026</span>
      </motion.div>
    </section>
  );
}
