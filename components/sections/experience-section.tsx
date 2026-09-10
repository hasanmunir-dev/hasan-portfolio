"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const EXPERIENCES = [
  {
    index: "01",
    company: "TSN",
    role: "Full-Stack Software Engineer",
    period: "1+ Years",
    type: "Full-time",
    url: "https://thesocialnexus.co",
    highlights: [
      "Lead full-stack developer on three multi-tenant B2B SaaS platforms (a school management system, a freight & delivery operations platform, and a repair-shop POS), all on a shared Next.js / React / TypeScript + Express + Supabase stack",
      "Designed multi-tenant, campus- and branch-scoped data models with authorization enforced at the database through PostgreSQL Row-Level Security instead of application code",
      "Built server-side PDF pipelines with Puppeteer for report cards, certificates, ID cards, and fee receipts, driven by visual template designers",
      "Implemented an append-only, trigger-enforced shipment event log so the delivery timeline is a tamper-proof audit record, with live tracking on a Mapbox GL map",
      "Modeled money-handling flows (split tender, partial refunds, trade-ins, deposits) as PostgreSQL RPC functions so cash-drawer and P&L stay correct across every payment path",
      "Integrated Stripe billing (tiered plans, per-tenant module entitlements, webhooks) and dynamic RBAC encoded into the JWT so every route and control renders against the current permission set",
      "Covered 100+ REST resource groups across academics, finance, HR, scheduling, inventory, and inspections, backed by ~215 versioned SQL migrations on the POS alone",
    ],
    stack: ["Next.js", "React", "Python", "TypeScript", "Express", "FastAPI", "Supabase", "MongoDB", "PostgreSQL RLS", "Stripe"],
  },
  {
    index: "02",
    company: "SeeBiz",
    role: "Full-Stack Developer",
    period: "1 Year",
    type: "Apprenticeship",
    url: "https://see.biz",
    highlights: [
      "One-year full-stack software engineering apprenticeship inside a live production MERN codebase",
      "Built and shipped core React UI components used across the main product interface",
      "Translated Figma mockups into responsive, cross-browser layouts",
      "Worked in agile sprints with daily standups, shipping multiple features per week",
      "Grew from fundamentals to end-to-end feature ownership across the Node.js / Express / MongoDB / React stack",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  },
];

function ExperienceDetail({ exp }: { exp: (typeof EXPERIENCES)[number] }) {
  return (
    <article>
      <div className="mb-8 pb-8 border-b border-stroke">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-label text-ink-3 mb-2">{exp.type.toUpperCase()}</p>
            <h3 className="font-display text-4xl md:text-5xl text-fire tracking-wide mb-1">
              {exp.role.toUpperCase()}
            </h3>
            <p className="text-label text-ink-2">
              @ {exp.company} · {exp.period}
            </p>
          </div>
          <a
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-ink-3 hover:text-ink border border-stroke hover:border-fire px-4 py-2 transition-all duration-200"
            data-hover
          >
            VISIT ↗
          </a>
        </div>
      </div>

      <ul className="space-y-4 mb-8 list-none">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex gap-4 text-sm text-ink-2 leading-relaxed">
            <span className="text-fire mt-0.5 shrink-0">-</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {exp.stack.map((s) => (
          <span key={s} className="text-label text-ink-3 border border-stroke px-3 py-1.5">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export function ExperienceSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  // Swap the detail in place — no scrolling, so the viewport stays put.
  const selectRole = (i: number) => setActive(i);

  return (
    <section id="experience" className="section section-bg relative scroll-mt-24">
      <div className="section-inner">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-label text-fire">04</span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="text-label text-ink-3">CHRONICLES</span>
        </div>
        <div className="mb-14">
          <h2 className="text-section text-ink leading-none">WORK</h2>
          <h2 className="text-section text-outlined leading-none">HISTORY</h2>
        </div>

        <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-16 items-start">
          {/* Role list — chips on mobile, sticky list on desktop */}
          <div className="md:sticky md:top-24 md:self-start flex gap-3 md:gap-0 md:flex-col md:border-r border-stroke md:pr-10">
            {EXPERIENCES.map((e, i) => {
              const on = active === i;
              return (
                <button
                  key={e.index}
                  type="button"
                  onClick={() => selectRole(i)}
                  data-hover
                  aria-pressed={on}
                  className={
                    "group text-left transition-colors duration-300 flex flex-col items-start " +
                    "flex-1 rounded-md px-4 py-3 " +
                    (on
                      ? "border-2 border-fire bg-fire/10 "
                      : "border border-white/20 hover:border-fire ") +
                    "md:flex-none md:rounded-none md:border-0 md:border-b md:border-stroke md:bg-transparent md:px-0 md:py-6 md:first:pt-0 md:last:border-0"
                  }
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-1">
                    <motion.div
                      animate={{ width: on ? 20 : 0 }}
                      transition={{ duration: 0.3, ease: easeExpo }}
                      className="hidden md:block h-px bg-fire"
                    />
                    <span className={`text-label ${on ? "text-fire" : "text-ink-3"}`}>{e.index}</span>
                  </div>
                  <span className={`company-name ${on ? "text-fire" : "text-ink-2 md:text-ink-3"}`}>
                    {e.company}
                  </span>
                  <span className={`text-label mt-0.5 md:mt-1 ${on ? "text-ink-2" : "text-ink-3"}`}>
                    {e.period}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Details of the selected role - full height, scrolls with the page */}
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeExpo }}
          >
            <ExperienceDetail exp={EXPERIENCES[active]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
