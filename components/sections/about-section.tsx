"use client";

import { useRef } from "react";
import Link from "next/link";
import { Parallax } from "@/components/parallax";
import { FadeIn, RevealText } from "@/components/reveal";
import { MARQUEE_ITEMS, PHILOSOPHY } from "@/lib/data/about";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="section section-bg relative">
      <div className="grid-overlay opacity-50" />
      <div className="section-inner">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-label text-fire">02</span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="text-label text-ink-3">IDENTITY</span>
        </div>

        {/* Main headline */}
        <Parallax speed={46} className="mb-16 md:mb-24">
          <RevealText className="text-section text-ink leading-none">
            THE
          </RevealText>
          <RevealText delay={0.08} className="text-section text-outlined leading-none">
            ARCHITECT
          </RevealText>
        </Parallax>

        {/* Two-column editorial layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl leading-relaxed text-ink font-light font-body">
              I build multi-tenant SaaS platforms end to end, from
              Row-Level-Security data models and Express APIs to the
              interfaces people use every day. Not a frontend dev who
              dabbles in backend, not a backend dev who avoids CSS.
              A genuine full-stack engineer.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-6">
            <FadeIn delay={0.15}>
              <div className="border-l-2 border-fire pl-6">
                <p className="text-sm text-ink-2 leading-relaxed">
                  Based in Lahore, Pakistan. Over a year at TSN as lead developer on
                  three multi-tenant B2B platforms, a school management system,
                  a freight &amp; delivery platform, and a repair-shop POS, all on
                  Next.js, Express, and Supabase with PostgreSQL Row-Level Security.
                  Before that, a year-long apprenticeship at SeeBiz in a production
                  MERN codebase. Solo, I&apos;ve shipped Zikron, a personal-knowledge
                  app, and Attrisense, an ML attrition-risk tool.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Multi-tenant SaaS", "Next.js", "Supabase", "PostgreSQL RLS", "System Design"].map((t) => (
                  <span
                    key={t}
                    className="text-label text-ink-3 border border-stroke px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <Link
                href="/about"
                data-hover
                className="inline-flex items-center gap-2 text-label text-fire hover:opacity-70 transition-opacity"
              >
                MORE ABOUT HASAN
                <span aria-hidden>→</span>
              </Link>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
