/**
 * Work history — shared by the homepage ExperienceSection and the /experience page.
 */

export interface Experience {
  index: string;
  company: string;
  role: string;
  period: string;
  type: string;
  url: string;
  highlights: string[];
  stack: string[];
}

export const EXPERIENCES: Experience[] = [
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
