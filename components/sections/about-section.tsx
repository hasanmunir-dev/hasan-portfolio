"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArchitectScene } from "@/components/scene-bg/architect-scene";

const easeExpo = [0.16, 1, 0.3, 1] as const;

function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "105%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, ease: easeExpo, delay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeExpo, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const MARQUEE_ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js", "Express",
  "FastAPI", "Python", "MongoDB", "PostgreSQL", "REST APIs",
  "System Design", "Tailwind CSS", "Docker", "AWS", "Redis",
];

const PHILOSOPHY = [
  {
    num: "01",
    title: "Ship with intention",
    body: "Every feature shipped should solve a real problem. I resist the urge to over-engineer and favor pragmatic solutions that can be iterated on.",
  },
  {
    num: "02",
    title: "Systems over hacks",
    body: "Quick fixes accumulate debt. I build systems that scale — proper abstractions, clean architecture, and code that the next engineer can own.",
  },
  {
    num: "03",
    title: "Data-driven decisions",
    body: "Opinions are cheap without evidence. I measure, monitor, and let real user behavior guide technical and product decisions.",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="section section-bg relative">
      <ArchitectScene />
      <div className="grid-overlay opacity-50" />
      <div className="section-inner">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-label text-fire">02</span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="text-label text-ink-3">IDENTITY</span>
        </div>

        {/* Main headline */}
        <div className="mb-16 md:mb-24">
          <RevealText className="text-section text-ink leading-none">
            THE
          </RevealText>
          <RevealText delay={0.08} className="text-section text-outlined leading-none">
            ARCHITECT
          </RevealText>
        </div>

        {/* Two-column editorial layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl leading-relaxed text-ink font-light font-body">
              I build systems that matter — from database schema
              to pixel-perfect interfaces. Not a frontend dev who
              dabbles in backend, not a backend dev who avoids CSS.
              A genuine full-stack engineer.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-6">
            <FadeIn delay={0.15}>
              <div className="border-l-2 border-fire pl-6">
                <p className="text-sm text-ink-2 leading-relaxed">
                  Based in Pakistan, I've built and deployed production systems
                  at TSN and Websolixs — handling everything from API design and
                  database optimization to building the UIs users interact with daily.
                  I specialize in the MERN stack, Next.js, and Python/FastAPI ecosystems.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-2 mt-2">
                {["MERN Stack", "Next.js", "FastAPI", "System Design", "REST APIs"].map((t) => (
                  <span
                    key={t}
                    className="text-label text-ink-3 border border-stroke px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-stroke py-4 mb-20 md:mb-28 overflow-hidden">
          <div className="marquee-track">
            <div className="marquee-content">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="text-label text-ink-3 px-8">
                  {item}
                  <span className="text-fire ml-8">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Engineering philosophy */}
        <div>
          <FadeIn>
            <p className="text-label text-ink-3 mb-10">ENGINEERING PHILOSOPHY</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {PHILOSOPHY.map((item, i) => (
              <FadeIn key={item.num} delay={i * 0.1}>
                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-label text-fire">{item.num}</span>
                    <div className="h-px flex-1 bg-stroke group-hover:bg-fire transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-3 tracking-wide">
                    {item.title.toUpperCase()}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
