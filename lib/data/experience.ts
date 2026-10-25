/**
 * Work history — shared by the homepage ExperienceSection and the /experience page.
 */

export interface Experience {
  index: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate?: string;
  type: string;
  location: string;
  url: string;
  highlights: string[];
  stack: string[];
}

export const EXPERIENCES: Experience[] = [
  {
  index: "01",
  company: "Kloudville",
  role: "Application Developer",
  period: "Oct 26 - Present",
  startDate: "2026-10",
  type: "Full-time",
  location: "Remote",
  url: "https://kloudville.com",
  highlights: [
    "Working on enterprise telecom applications and digital marketplace solutions for Ooredoo, supporting product catalog management and application operations.",
    "Managing and configuring marketplace product listings, including pricing, specifications, images, and product information.",
    "Reviewing and testing REST APIs using Postman, including TM Forum Open API specifications such as TMF622 for product ordering.",
    "Collaborating with the development team to analyze API behavior, validate requests and responses, and identify required enhancements.",
    "Working with enterprise development workflows, including SVN version control, technical documentation, and task tracking.",
  ],
  stack: [
    "REST APIs",
    "Postman",
    "TM Forum APIs",
    "JSON",
    "SVN",
    "API Testing",
  ],
},
  {
    index: "02",
    company: "TSN",
    role: "Full-Stack Software Engineer",
    period: "1+ Years",
    startDate: "2025-07",
    endDate: "2026-10",
    type: "Full-time",
    location: "Remote",
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
    index: "03",
    company: "SeeBiz",
    role: "Full-Stack Developer",
    period: "1 Year", 
    startDate: "2024-08",
    endDate: "2025-07",
    type: "Apprenticeship",
    location: "Onsite",
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
