"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Parallax } from "@/components/parallax";

const easeExpo = [0.16, 1, 0.3, 1] as const;

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

const PROJECTS = [
  {
    index: "01",
    title: "School Management System",
    subtitle: "Multi-tenant SIS + LMS for schools",
    description:
      "A cloud platform that runs a school's entire operation, from one place: admissions, academics and grading, attendance, fees and accounting, timetabling, communication, and reporting. Each school is an isolated tenant with campus-level scoping on every record, plus role-based portals for admins, teachers, students, parents, librarians, finance supervisors, and external inspectors.",
    impact: [
      "Multi-tenant, campus-scoped data model with authorization enforced at the database via Postgres Row-Level Security, not just application code",
      "Server-side PDF pipelines with Puppeteer for report cards, certificates, ID cards, and receipts, driven by visual template designers",
      "100+ REST resource groups spanning academics, finance, HR, scheduling, library, hostel, and external inspections",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Node.js", "Express", "Supabase", "PostgreSQL RLS", "Zustand", "SWR", "Puppeteer"],
    type: "Multi-tenant SaaS",
    // year: "2025",
    link: "",
    accent: "#FF4500",
  },
  {
    index: "02",
    title: "iRepairly POS",
    subtitle: "Multi-tenant POS & repair-shop operations",
    description:
      "A subscription-billed platform that runs repair businesses and retail shops from a single multi-tenant codebase: point of sale, inventory, repair-ticket workflows, CRM, staff management, and billing. Each business gets a subdomain-scoped workspace; a superadmin console onboards tenants and applies industry-specific vertical templates that preconfigure catalogues, statuses, and pricing.",
    impact: [
      "Money-handling flows (split tender, partial refunds, trade-ins, deposits) kept correct across every payment path via Postgres RPC functions",
      "Configuration-driven module system lets each plan or tenant enable or hide entire feature areas without code branches",
      "~215 versioned SQL migrations, with tenant isolation enforced at the database via RLS",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Stripe", "Redis", "TanStack Query", "Zod", "Tailwind CSS v4", "@react-pdf/renderer"],
    type: "Multi-tenant SaaS",
    // year: "2025",
    link: "https://repairbooking.co.uk/",
    accent: "#FF4500",
  },
  {
    index: "03",
    title: "Freight Operations Platform",
    subtitle: "Multi-tenant freight & delivery management",
    description:
      "A cloud platform running the full operations of a freight/delivery business from one multi-tenant codebase: booking, dispatch, live shipment tracking, quotations, invoicing, and customer management. Isolated workspaces per shipping company, an internal admin console over every tenant, and separate corporate and residential customer portals with a sales pipeline and loyalty points.",
    impact: [
      "Permission-first architecture: every module gated by dynamic RBAC encoded into the JWT, so new features inherit access control",
      "Shipment history built as an append-only event log enforced by database triggers, a tamper-proof delivery audit record",
      "Portal access modeled as a computed consequence of the corporate sales-pipeline stage, removing a manual approve/reject workflow",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Express 5", "Supabase", "Stripe", "WebSocket", "Mapbox GL", "Typesense"],
    type: "Multi-tenant SaaS",
    // year: "2025",
    link: "https://logical-links.vercel.app/",
    accent: "#FF4500",
  },
  {
    index: "04",
    title: "Zikron",
    subtitle: "Personal knowledge management app",
    description:
      "A cloud personal-knowledge platform that replaces the scattered habit of saving things in WhatsApp self-chat, Drive, screenshots, and bookmarks with one place to capture, organize, link, search, remember, and share. Quick capture drops text and links into an inbox; items become notes, list entries, self-chat messages, calendar events, or contacts, each taggable, linkable, versioned, schedulable, and shareable through tracked links.",
    impact: [
      "A linking layer and universal tag system every module inherits, so “connect anything to anything” works the same across notes, contacts, lists, and events",
      "Tenant isolation enforced at the database with RLS and independently re-verified in the Express API middleware",
      "Capture-to-organize built as a pipeline (quick capture, inbox triage, typed object, tagged/linked/collected/shared), with automatic version history and restore",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Express 4", "Supabase", "TanStack Query", "FullCalendar", "React Flow", "web-push", "Resend"],
    type: "B2C SaaS",
    // year: "2025",
    link: "https://zikron.hasanmunir.dev/",
    accent: "#FF4500",
  },
  {
    index: "05",
    title: "Attrition Console",
    subtitle: "Employee attrition risk, ML scoring & operator console",
    description:
      "A decision-support tool for HR that predicts which employees are at risk of leaving and, more importantly, why. An analyst fills in one employee's details or uploads a headcount CSV; the service returns a calibrated leaving probability, a keep/flag decision against a cost-tuned threshold, and a per-employee breakdown of which factors raised or lowered risk, plus what-if intervention scenarios. Deliberately scoped as a talk-to list, not a manage-out list.",
    impact: [
      "Train/serve skew made a failing test, a 4-decimal parity assertion between the training notebook and the service, which caught three silent-degradation bugs",
      "Every business decision (threshold, cost ratio, fitted medians, library versions) pushed into a persisted metadata.json, so the model re-tunes and redeploys without a code change",
      "Decision threshold tuned from an explicit 10·FN + 1·FP cost function, turning a timid 0.38-recall classifier into an 0.85-recall talk-to list",
    ],
    stack: ["Python", "scikit-learn", "FastAPI", "Pydantic v2", "pandas", "SHAP", "Next.js 14", "React 18", "TypeScript", "Recharts"],
    type: "ML Application",
    // year: "2024",
    link: "https://attrisense.hasanmunir.dev/",
    accent: "#FF4500",
  },
];

export function ProjectsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="section section-bg relative">
      <div className="grid-overlay opacity-50" />
      <div className="section-inner">

        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-label text-fire">01</span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="text-label text-ink-3">PORTFOLIO</span>
        </div>

        {/* Headline */}
        <Parallax speed={46} className="mb-16">
          <FadeIn>
            <h2 className="text-section text-ink leading-none">SELECTED</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-section text-outlined leading-none">PROJECTS</h2>
          </FadeIn>
        </Parallax>

        {/* Project list */}
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.index}
              project={project}
              index={i}
              isHovered={hovered === i}
              onHover={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  project: typeof PROJECTS[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: easeExpo, delay: index * 0.08 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="border-b border-stroke"
    >
      {/* Row header - always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        data-hover
        className="w-full text-left py-8 flex items-start md:items-center gap-6 group"
      >
        {/* Index */}
        <span className={`text-label shrink-0 transition-colors duration-300 ${isHovered ? "text-fire" : "text-ink-3"}`}>
          {project.index}
        </span>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-3 mb-1">
            <span className={`project-title ${isHovered ? "text-fire" : "text-ink"}`}>
              {project.title}
            </span>
            <span className="text-label text-ink-3 hidden md:inline">{project.subtitle}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="text-label text-ink-3">{s}</span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-label text-ink-3">+{project.stack.length - 4}</span>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
          {/* <span className="text-label text-ink-3">{project.year}</span> */}
          <span className="text-label text-ink-3">{project.type}</span>
        </div>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-xl shrink-0 transition-colors duration-300 ${isHovered ? "text-fire" : "text-ink-3"}`}
        >
          +
        </motion.div>
      </button>

      {/* Expanded detail */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: easeExpo }}
        className="overflow-hidden"
      >
        <div className="pb-10 grid md:grid-cols-2 gap-10">
          {/* Description */}
          <div>
            <p className="text-label text-fire mb-4">OVERVIEW</p>
            <p className="text-sm text-ink-2 leading-relaxed mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="text-label text-ink-3 border border-stroke px-3 py-1.5">
                  {s}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 mt-6 text-label text-fire hover:opacity-70 transition-opacity"
              >
                VISIT LIVE
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>

          {/* Impact */}
          <div>
            <p className="text-label text-fire mb-4">IMPACT</p>
            <ul className="space-y-3 list-none">
              {project.impact.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-2 leading-relaxed">
                  <span className="text-fire shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
