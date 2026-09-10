/**
 * Single source of truth for the "About Hasan" narrative — shared by the
 * homepage AboutSection and the dedicated /about entity page.
 */

/**
 * First-person entity description. Feeds the visible /about lead, the
 * `<meta name="description">` on key pages, and the Person / WebSite JSON-LD.
 */
export const PERSON_DESCRIPTION =
  "I'm a Lahore-based Full-Stack Software Engineer specializing in product engineering across frontend, backend, databases, cloud infrastructure and deployment. I work primarily with Next.js, React, TypeScript, Node.js, Express, FastAPI, PostgreSQL and Supabase, and have built multi-tenant B2B platforms across education, logistics and retail.";

export const QUICK_FACTS: { k: string; v: string; accent?: boolean }[] = [
  { k: "Role", v: "Full-Stack Software Engineer" },
  { k: "Location", v: "Lahore, Pakistan · UTC+5" },
  { k: "Focus", v: "Multi-tenant B2B SaaS, end to end" },
  { k: "Experience", v: "2+ years shipping production systems" },
  { k: "Status", v: "Open to work", accent: true },
];

/** Longer-form bio paragraphs for the /about page. */
export const BIO_PARAGRAPHS = [
  "I build multi-tenant SaaS platforms end to end, from Row-Level-Security data models and Express APIs to the interfaces people use every day. Not a frontend dev who dabbles in backend, not a backend dev who avoids CSS. A genuine full-stack engineer.",
  "Over a year at TSN as lead developer on three multi-tenant B2B platforms, a school management system, a freight & delivery platform, and a repair-shop POS, all on Next.js, Express, and Supabase with PostgreSQL Row-Level Security. Before that, a year-long apprenticeship at SeeBiz inside a production MERN codebase.",
  "Solo, I've shipped Zikron, a personal-knowledge app, and Attrisense, an ML attrition-risk tool, from data modelling and model training through to the deployed frontend.",
];

export const MARQUEE_ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js", "Express",
  "FastAPI", "Python", "MongoDB", "PostgreSQL", "REST APIs",
  "System Design", "Tailwind CSS", "Docker", "AWS", "Redis",
];

export const PHILOSOPHY = [
  {
    num: "01",
    title: "Architecture over hacks",
    body: "I prefer systems that remain understandable six months after they are built.",
  },
  {
    num: "02",
    title: "Database design matters",
    body: "A good application starts with a good data model. I pay close attention to relationships, constraints, indexes, transactions, security, and query performance.",
  },
  {
    num: "03",
    title: "Security belongs in the architecture",
    body: "Authentication is only one part of security. Authorization, tenant isolation, validation, database policies, and secure workflows need to be considered together.",
  },
  {
    num: "04",
    title: "Production is part of development",
    body: "Writing code is only one part of shipping software. I care about deployment, infrastructure, monitoring, debugging, and maintaining systems after release.",
  },
  {
    num: "05",
    title: "Use the right tool",
    body: "I'm comfortable across different technologies and choose tools based on requirements, constraints, maintainability, and long-term system needs rather than following a stack for its own sake.",
  },
];

/** Problem domains — surfaced on /about and /skills, and echoed in `knowsAbout`. */
export const WORK_AREAS = [
  "Full-Stack Web Development",
  "Backend Architecture",
  "REST API Design",
  "Database Architecture",
  "Multi-Tenant SaaS",
  "Authentication & Authorization",
  "RBAC & Permission Systems",
  "PostgreSQL Row-Level Security",
  "Server-Side Rendering",
  "API Integrations",
  "Payment Integrations",
  "Real-Time Applications",
  "Performance Optimization",
  "Cloud Infrastructure",
  "CI/CD & Deployment",
  "Production Debugging",
  "AI/ML Application Development",
];

/**
 * How I operate inside an engineering team — the collaboration signal the
 * project pages alone don't carry.
 */
export const HOW_I_WORK = [
  "Translate product requirements into technical plans",
  "Design APIs and database boundaries",
  "Work across frontend and backend",
  "Review and maintain existing codebases",
  "Debug production issues",
  "Deploy and monitor applications",
  "Communicate technical tradeoffs clearly",
];

/** Expanded topic list for Person JSON-LD `knowsAbout`. */
export const KNOWS_ABOUT = [
  "Full-Stack Software Engineering",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "FastAPI",
  "Python",
  "PostgreSQL",
  "Supabase",
  "Row-Level Security",
  "Multi-tenant SaaS Architecture",
  "REST API Design",
  "System Design",
  "Cloud Infrastructure & Deployment",
  "CI/CD Pipelines",
  "Authentication & Authorization",
  "Role-Based Access Control",
  "Real-Time Web Applications",
  "Payment Integrations",
  "Performance Optimization",
  "Production Debugging",
  "Machine Learning Applications",
];

export const SOCIAL_LINKS = [
  { label: "GitHub", value: "github.com/hasanmunir-dev", href: "https://github.com/hasanmunir-dev" },
  { label: "LinkedIn", value: "linkedin.com/in/hasanmunir-dev", href: "https://www.linkedin.com/in/hasanmunir-dev/" },
  { label: "Email", value: "hasanmunir406@gmail.com", href: "mailto:hasanmunir406@gmail.com" },
  { label: "Resume", value: "Download PDF", href: "/resume/Muhammad Hasan Munir.pdf" },
];
