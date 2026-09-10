/**
 * Single source of truth for portfolio projects.
 * Consumed by the homepage ProjectsSection (short form), the /projects index,
 * and the /projects/[slug] detail pages (long form).
 */

export interface ProjectSection {
  title: string;
  body: string;
}

export interface Project {
  /** URL slug: /projects/<slug> */
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  /** Short blurb used on the homepage list. */
  description: string;
  /** Longer overview for the detail page. */
  overview: string;
  category: string;
  /** Short badge label. */
  type: string;
  role: string;
  year?: string;
  link: string;
  accent: string;
  stack: string[];
  /** Three-bullet highlight reel shown on the homepage. */
  impact: string[];
  architecture: ProjectSection[];
  features: ProjectSection[];
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "school-management-system",
    index: "01",
    title: "School Management System",
    subtitle: "Multi-tenant SIS + LMS for schools",
    description:
      "A cloud platform that runs a school's entire operation, from one place: admissions, academics and grading, attendance, fees and accounting, timetabling, communication, and reporting. Each school is an isolated tenant with campus-level scoping on every record, plus role-based portals for admins, teachers, students, parents, librarians, finance supervisors, and external inspectors.",
    overview:
      "A cloud-hosted platform that lets a school run its entire operation from one place: admissions and enrollment, academics and grading, attendance, fees and accounting, timetabling, communication, and reporting. Each school is an isolated tenant with its own users, data, branding, and configuration while sharing a single deployed codebase and database, the SaaS model. Separate role-based portals serve administrators, teachers, students, parents, librarians, finance supervisors, and external inspectors. The system is campus-scoped: a school can operate one or many campuses, and every record, permission, and report respects that boundary so data never leaks across campuses or tenants.",
    category: "Multi-tenant SaaS / PaaS - combined Student Information System (SIS) and Learning Management System (LMS)",
    type: "Multi-tenant SaaS",
    role: "Full-Stack Developer - architecture, backend API, frontend, database design, deployment",
    link: "",
    accent: "#FF4500",
    stack: [
      "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Radix UI / shadcn",
      "Zustand", "SWR", "React Hook Form", "Zod", "Recharts", "TipTap", "@dnd-kit",
      "Node.js", "Express", "Supabase", "PostgreSQL", "Row-Level Security", "JWT + TOTP 2FA",
      "Puppeteer", "Nodemailer", "web-push", "node-cron", "ExcelJS", "@anthropic-ai/sdk", "Jest",
    ],
    impact: [
      "Multi-tenant, campus-scoped data model with authorization enforced at the database via Postgres Row-Level Security, not just application code",
      "Server-side PDF pipelines with Puppeteer for report cards, certificates, ID cards, and receipts, driven by visual template designers",
      "100+ REST resource groups spanning academics, finance, HR, scheduling, library, hostel, and external inspections",
    ],
    architecture: [
      {
        title: "Multi-tenancy & access control",
        body: "Tenant-per-school isolation with campus-level scoping on every query. Role-based portals for admin, teacher, student, parent, librarian, finance supervisor, inspector, and superadmin, with granular per-module permissions, teacher messaging controls, and configurable sidebars and login pages per school.",
      },
      {
        title: "Database as the authorization layer",
        body: "Supabase-managed PostgreSQL with Row-Level Security policies as the primary authorization layer, so tenant and campus isolation never depends on application code. JWT auth with TOTP-based two-factor (otplib) and social login on top.",
      },
      {
        title: "Single multi-tenant deployment",
        body: "One shared codebase and database behind a Passenger-compatible Node entrypoint. Supabase Storage holds media, documents, and generated files. node-cron drives scheduled jobs - automatic attendance records, reminders, and year rollovers.",
      },
    ],
    features: [
      { title: "Student Information System", body: "Admissions, online signup links, pending-signup review, and enrollment workflows. Bulk student import from Excel/CSV with de-duplication and retry-safe ingestion. Custom fields with drag-and-drop category ordering per campus." },
      { title: "Academics & LMS", body: "Courses, marking periods, grading scales, gradebook, final grades, and report cards. Assignments, quizzes, lesson plans, class diary, learning resources. Automated timetable generation with teacher constraints, plus online classes via Jitsi and subject-specific tools." },
      { title: "Attendance & discipline", body: "Daily and period attendance with calendars, automatic record generation via scheduled jobs, discipline incidents and alerts, entry/exit and evening-leave tracking, and hostel management." },
      { title: "Fees & accounting", body: "Campus-scoped fee structures, billing elements, and payment timelines. Manual receipt numbers, editable amounts, multi-currency display, staff salary and payroll, school inventory, and accounting ledgers." },
      { title: "Documents & communication", body: "Designers for certificates, ID cards, and letter templates with server-rendered PDF output. In-app messaging, mail, feedback, and grievance channels backed by web-push and email on cron schedules." },
      { title: "External inspection module", body: "A dedicated inspector portal: scheduled visits, rubric-based evaluations, coaching notes, appeals, digital signatures, media evidence, a forum, and broadcast messaging." },
      { title: "AI setup assistant", body: "An AI-guided assistant that helps a new school configure grades, sections, and settings during onboarding." },
    ],
    highlights: [
      "Designed a multi-tenant, campus-scoped data model where authorization is enforced at the database layer via Postgres Row-Level Security, not just in application code.",
      "Built retry-safe bulk import that prevents duplicate students when an upload is re-run after a partial failure.",
      "Implemented server-side PDF pipelines with Puppeteer for report cards, certificates, ID cards, and receipts, driven by visual template designers.",
      "Added real-time cross-session sync so edits propagate to other open sessions without a manual refresh.",
      "Shipped fine-grained module and messaging permissions, configurable per school and per role.",
      "Covered 100+ REST resource groups spanning academics, finance, HR, scheduling, library, hostel, and inspections.",
    ],
  },
  {
    slug: "irepairly",
    index: "02",
    title: "iRepairly POS",
    subtitle: "Multi-tenant POS & repair-shop operations",
    description:
      "A subscription-billed platform that runs repair businesses and retail shops from a single multi-tenant codebase: point of sale, inventory, repair-ticket workflows, CRM, staff management, and billing. Each business gets a subdomain-scoped workspace; a superadmin console onboards tenants and applies industry-specific vertical templates that preconfigure catalogues, statuses, and pricing.",
    overview:
      "A cloud-hosted platform that runs the full operations of repair businesses and retail shops (point of sale, inventory, repair-ticket workflows, CRM, staff management, and billing) from a single multi-tenant codebase. Each business gets an isolated, subdomain-scoped workspace; a superadmin console onboards tenants, manages subscription plans, and applies industry-specific vertical templates (e.g. phone repair, mobile tyre fitting) that preconfigure catalogues, statuses, and pricing.",
    category: "SaaS - multi-tenant, subscription-billed B2B web application",
    type: "Multi-tenant SaaS",
    role: "Full-stack developer - architecture, backend, and frontend",
    link: "https://repairbooking.co.uk/",
    accent: "#FF4500",
    stack: [
      "Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Row-Level Security",
      "Realtime", "Storage", "Stripe", "Redis (ioredis)", "TanStack Query & Table", "Zustand",
      "Zod", "Tailwind CSS v4", "Radix UI", "Recharts", "@react-pdf/renderer", "Playwright",
    ],
    impact: [
      "Money-handling flows (split tender, partial refunds, trade-ins, deposits) kept correct across every payment path via Postgres RPC functions",
      "Configuration-driven module system lets each plan or tenant enable or hide entire feature areas without code branches",
      "~215 versioned SQL migrations, with tenant isolation enforced at the database via RLS",
    ],
    architecture: [
      { title: "Multi-tenancy & isolation", body: "Subdomain-based tenant resolution with a middleware chain (auth → tenant → branch → RBAC → rate-limit). PostgreSQL Row-Level Security enforces per-business and per-branch data isolation at the database layer." },
      { title: "Layered backend", body: "~40 controller/service modules over the Next.js API layer, with business logic pushed into ~215 versioned SQL migrations and Postgres RPC functions for money-critical operations - profit & loss, split-tender reconciliation, refund sign handling, cash-movement ledgers." },
      { title: "State & data", body: "TanStack Query for server-state caching and optimistic updates, Zustand for POS/session/UI stores, Supabase Realtime for live messaging and dashboard updates, Redis for rate limiting and hot-path caching." },
    ],
    features: [
      { title: "Point of Sale", body: "Register sessions with cash-drawer tracking, split-tender payments, refunds and exchanges, gift cards, store credits, trade-ins / buyback, loyalty points, HID barcode-scanner support, and live KPI dashboards." },
      { title: "Inventory", body: "Product variants and attributes, bundles, suppliers and purchase orders (incl. auto-generation from low stock), supplier returns, stock counts, damage/returns, bin management, Excel bulk import/export, and batch barcode-label printing." },
      { title: "Repairs", body: "Repair tickets with configurable statuses and drag-and-drop workflows, device/fault catalogues, technician assignment, estimates, warranty lookup, and vehicle records for automotive verticals." },
      { title: "Appointments & booking", body: "Public booking widgets and an embeddable price/status tracker, availability engine, business hours, and blocked dates." },
      { title: "CRM & staff", body: "Customer groups, custom fields, asset history and record merging; employee time clock, shifts, payroll, commission rules, IP whitelisting, PIN auth, activity logging, and role-based permissions." },
      { title: "Billing", body: "Stripe checkout, customer portal, and webhooks driving tiered plans, custom-negotiated pricing, per-tenant module entitlements, plan-limit enforcement, and a nightly subscription-reconciliation cron." },
      { title: "Superadmin", body: "Tenant onboarding, plan and module-template management, broadcasts, cross-tenant analytics, helpdesk, manual payments, and automated business backups." },
    ],
    highlights: [
      "Designed money-handling flows (split tender, partial refunds, trade-ins, deposits) so cash-drawer expectations and P&L stay correct across every payment path.",
      "Built a configuration-driven module system letting each plan/tenant enable or hide entire feature areas without code branches.",
      "Kept tenant isolation enforced at the database via RLS rather than trusting application code.",
    ],
  },
  {
    slug: "freight-operations-management",
    index: "03",
    title: "Freight Operations Management",
    subtitle: "Multi-tenant freight & delivery management",
    description:
      "A cloud platform running the full operations of a freight/delivery business from one multi-tenant codebase: booking, dispatch, live shipment tracking, quotations, invoicing, and customer management. Isolated workspaces per shipping company, an internal admin console over every tenant, and separate corporate and residential customer portals with a sales pipeline and loyalty points.",
    overview:
      "A cloud platform that runs the full operations of a freight/delivery business (booking, dispatch, live shipment tracking, quotations, invoicing, and customer management) from a single multi-tenant codebase. Each shipping company gets an isolated workspace where it onboards its own employees with scoped logins; an internal admin console oversees every tenant, assigns work across companies, and configures roles, pricing, statuses, and templates without a code deploy. Separate corporate and residential customer portals let end customers track shipments, manage their account through a sales pipeline, and (residential) earn and redeem loyalty points.",
    category: "SaaS - multi-tenant B2B transportation / delivery management system",
    type: "Multi-tenant SaaS",
    role: "Full-stack developer - architecture, backend, and frontend",
    link: "",
    accent: "#FF4500",
    stack: [
      "Next.js 16", "React 19", "TypeScript", "Express 5", "Supabase", "PostgreSQL",
      "Row-Level Security", "Stripe", "Redis (Upstash)", "BullMQ", "WebSocket",
      "TanStack Query & Table", "Zustand", "Zod", "React Hook Form", "Tailwind CSS v4",
      "shadcn/ui + Radix UI", "Recharts", "Mapbox GL", "PDFKit", "Typesense",
    ],
    impact: [
      "Permission-first architecture: every module gated by dynamic RBAC encoded into the JWT, so new features inherit access control",
      "Shipment history built as an append-only event log enforced by database triggers, a tamper-proof delivery audit record",
      "Portal access modeled as a computed consequence of the corporate sales-pipeline stage, removing a manual approve/reject workflow",
    ],
    architecture: [
      { title: "Multi-tenancy & isolation", body: "Admin → Shipping Company → Employee hierarchy with three route-group-scoped workspaces (admin / corporate / residential). PostgreSQL Row-Level Security enforces per-company and per-employee isolation at the database, backed by a JWT that carries the user's role plus an \"all vs. own/assigned\" permission scope, so a role like Driver only ever sees its assigned deliveries, quotations, and invoices." },
      { title: "Layered backend", body: "24 feature modules, each split route → controller → service → repository → Zod schema over Express 5, behind a middleware chain (auth → role → rate-limit → request-logger → timeout → error). ~80 versioned SQL migrations push money- and retention-critical logic into Postgres functions and pg_cron jobs - rewards-redemption caps, 90-day purge of abandoned accounts, immutable tracking-event triggers." },
      { title: "State & data", body: "TanStack Query for server-state caching and optimistic updates, Zustand for auth/session/UI stores, WebSocket push for live dashboard and tracking updates, Redis + BullMQ for queued email dispatch and hot-path rate limiting, Typesense for full-text search across shipments and documents." },
    ],
    features: [
      { title: "Deliveries", body: "Company-scoped shipment list with a configurable status machine (received → confirmed → assigned → picked up → in transit → out for delivery → delivered, plus cancellation and ETA/delay changes), multi-employee assignment via a dedicated join table, and colour-coded status badges throughout." },
      { title: "Live tracking & map", body: "An append-only, tamper-proof event timeline per shipment (city reached, status change, who logged it, when) with a Mapbox GL map pinning the current location and an inline \"add a new city\" flow against a shared master list." },
      { title: "Quotations & invoices", body: "Create, edit, duplicate, and export to PDF (PDFKit); standalone or linked to a delivery; status lifecycle (draft → sent → accepted → paid → overdue); Terms & Conditions must be actively accepted before approval, creating an auditable agreement record; Stripe-backed invoice payment." },
      { title: "RBAC & staff", body: "Four internal roles (CEO, VP, Manager, Assistant) with the CEO as super-admin over custom roles; permissions toggled from a settings UI and encoded into the JWT, with every button, menu item, and route rendering conditionally against the current permission set." },
      { title: "Accounts & CRM pipeline", body: "A 7-stage corporate sales pipeline (prospect → … → active → lost) on company accounts, with portal login access derived from pipeline stage via a sync routine, an account-activity feed, and dual human-readable IDs." },
      { title: "Residential rewards", body: "A points program where residential customers earn and redeem points against quotations, capped at 50% of quote value; admins can inspect any customer's balance and full ledger." },
      { title: "Notifications", body: "A rule-driven engine fanning lifecycle events out to every stakeholder over templated email and in-app alerts grouped into tabs (All, Unread, Deliveries, Invoices, Quotes, Account) with unread counts and bulk actions." },
    ],
    highlights: [
      "Designed a permission-first architecture where every module is gated by dynamic RBAC from day one, so new features inherit access control instead of bolting it on later.",
      "Built the shipment history as an append-only event log enforced by database triggers, making the delivery timeline a trustworthy audit record that cannot be silently edited.",
      "Modeled portal access as a computed consequence of the corporate sales pipeline stage, removing an entire manual approve/reject workflow.",
      "Kept tenant isolation enforced at the database via Row-Level Security rather than trusting application code.",
    ],
  },
  {
    slug: "zikron",
    index: "04",
    title: "Zikron",
    subtitle: "Personal knowledge management app",
    description:
      "A cloud personal-knowledge platform that replaces the scattered habit of saving things in WhatsApp self-chat, Drive, screenshots, and bookmarks with one place to capture, organize, link, search, remember, and share. Quick capture drops text and links into an inbox; items become notes, list entries, self-chat messages, calendar events, or contacts, each taggable, linkable, versioned, schedulable, and shareable through tracked links.",
    overview:
      "Zikron is a cloud personal-knowledge platform that replaces the scattered habit of saving things in WhatsApp self-chat, Drive, screenshots, and bookmarks with one place to capture, organize, link, search, remember, and share everything that matters. A single quick-capture flow drops text and links into an inbox; items become notes, list entries, self-chat messages, calendar events, or contacts, and every object can be tagged, linked to related objects, versioned, scheduled, and shared through tracked public/protected/private links. A separate admin console oversees every account. Each user gets a fully isolated workspace; the product is structured for a later free/premium split.",
    category: "SaaS - B2C consumer productivity app in the personal knowledge management space",
    type: "B2C SaaS",
    role: "Full-stack developer - architecture, database design, backend API, and frontend",
    link: "https://zikron.hasanmunir.dev/",
    accent: "#FF4500",
    stack: [
      "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui + Radix/Base UI",
      "Framer Motion", "TanStack Query", "Express 4", "Node.js", "Supabase", "PostgreSQL",
      "Row-Level Security", "FullCalendar", "React Flow (@xyflow/react)", "web-push",
      "node-cron", "Resend", "Google People API", "react-markdown", "cmdk",
    ],
    impact: [
      "A linking layer and universal tag system every module inherits, so “connect anything to anything” works the same across notes, contacts, lists, and events",
      "Tenant isolation enforced at the database with RLS and independently re-verified in the Express API middleware",
      "Capture-to-organize built as a pipeline (quick capture, inbox triage, typed object, tagged/linked/collected/shared), with automatic version history and restore",
    ],
    architecture: [
      { title: "Multi-tenancy & isolation", body: "A user / admin role model across three route-group-scoped areas: (public) for landing/login, (protected)/app for the user workspace, (admin)/admin for the admin console. PostgreSQL Row-Level Security enforces per-user isolation at the database; the Express API independently re-checks the Supabase JWT and role in middleware (requireAuth, requireAdmin), so isolation never depends on client code." },
      { title: "Two-app monorepo", body: "apps/web (Next.js frontend, port 3000) and apps/api (Express + TypeScript backend, port 4000), with ~60 ordered SQL migrations under supabase/migrations/ and a single canonical schema in docs/supabase-schema.sql. Backend is layered route → controller → service → middleware." },
      { title: "State, data & delivery", body: "TanStack Query for server-state caching and optimistic updates; an in-memory pub/sub bus plus a page-state item cache for zero-latency dialog opens; Supabase Auth (email/password + Google OAuth). node-cron drives reminder dispatch, web-push sends browser notifications, Resend handles transactional email, and Google People API powers contact import." },
    ],
    features: [
      { title: "Capture, Inbox & Self Chat", body: "Frictionless text/link capture with an inbox triage flow (inbox / favorites / archived) and a chat-style personal message stream, both searchable." },
      { title: "Notes & Lists", body: "Full CRUD notes with markdown rendering, favorite/archive, and a masonry grid; structured lists with reorderable items." },
      { title: "Reminders", body: "Scheduled reminders with browser push notifications delivered via web-push + node-cron, including delivery state tracking." },
      { title: "Collections", body: "User-defined groupings that span every module, so one collection can hold notes, links, contacts, and list items together." },
      { title: "Contacts", body: "A rich contact schema with multiple emails/phones/addresses, CSV import, and Google Contacts import via OAuth + People API." },
      { title: "Sharing", body: "Per-item public / protected (auth-required) / private links, native share and copy-link, tracked link views, and an authenticated shared-item preview that opens the object in its home module." },
      { title: "Knowledge Linking & Graph", body: "Bidirectional links between any two objects, surfaced as an interactive, pannable knowledge graph built on React Flow." },
      { title: "Calendar & Timeline", body: "FullCalendar-based month/week/day/list views over scheduled fields, milestones, and a chronological timeline of dated knowledge." },
      { title: "Version History & Activity Timeline", body: "Automatic version snapshots with restore, plus a per-user activity feed of every create/edit/delete." },
    ],
    highlights: [
      "Enforced tenant isolation at the database with Row-Level Security and re-verified it in API middleware, so a single-codebase multi-tenant app never trusts the client for access control.",
      "Designed a linking layer and universal tag system that every module inherits, making “connect anything to anything” and “tag anything” work the same way across notes, contacts, lists, and events.",
      "Turned dated content from every module into one calendar and timeline view driven by shared scheduled fields.",
      "Built capture-to-organize as a pipeline (quick capture → inbox triage → typed object → tagged/linked/collected/shared) rather than isolated CRUD screens.",
      "Added automatic version history with restore and a full activity timeline so knowledge edits are auditable and reversible.",
    ],
  },
  {
    slug: "attrisense",
    index: "05",
    title: "Attrition Console",
    subtitle: "Employee attrition risk - ML scoring & operator console",
    description:
      "A decision-support tool for HR that predicts which employees are at risk of leaving and, more importantly, why. An analyst fills in one employee's details or uploads a headcount CSV; the service returns a calibrated leaving probability, a keep/flag decision against a cost-tuned threshold, and a per-employee breakdown of which factors raised or lowered risk, plus what-if intervention scenarios. Deliberately scoped as a talk-to list, not a manage-out list.",
    overview:
      "Attrition Console predicts which employees are at risk of leaving and, more importantly, why, so an HR partner knows who to have a conversation with. An HR analyst either fills in one employee's details in a guided form or uploads a headcount CSV export; the service returns a calibrated leaving probability, a keep/flag decision against a cost-tuned threshold, and a per-employee breakdown of which factors raised or lowered the risk. A what-if panel lets the analyst toggle real interventions (stop overtime, promote now, raise pay 20%, improve satisfaction) and see the probability move, and a threshold-sweep chart shows how many people get flagged at each cut-off. The product is deliberately scoped as a talk-to list, not a manage-out list, and that constraint is stated in the UI and the OpenAPI description.",
    category: "ML application - internal decision-support tool for HR (supervised binary classification wrapped in a scoring service and operator console)",
    type: "ML Application",
    role: "Solo full-stack ML developer - data cleaning and feature engineering, model selection and threshold tuning, the inference service and its train/serve-parity test suite, the API contract, and the entire frontend console",
    link: "https://attrisense.hasanmunir.dev/",
    accent: "#FF4500",
    stack: [
      "Python 3.12", "pandas", "NumPy", "scikit-learn 1.6", "imbalanced-learn (SMOTE)",
      "SHAP", "Jupyter / Colab", "joblib", "FastAPI", "Pydantic v2", "Uvicorn", "pytest",
      "Docker / docker-compose", "Next.js 14", "React 18", "TypeScript", "Tailwind CSS v4",
      "shadcn/ui + Radix / Base UI", "Recharts",
    ],
    impact: [
      "Train/serve skew made a failing test, a 4-decimal parity assertion between the training notebook and the service, which caught three silent-degradation bugs",
      "Every business decision (threshold, cost ratio, fitted medians, library versions) pushed into a persisted metadata.json, so the model re-tunes and redeploys without a code change",
      "Decision threshold tuned from an explicit 10·FN + 1·FP cost function, turning a timid 0.38-recall classifier into an 0.85-recall talk-to list",
    ],
    architecture: [
      { title: "Three layers, one-way artifact flow", body: "An offline Colab notebook does all learning and writes model.pkl, encoder.pkl, scaler.pkl, label_encoder.pkl, feature_order.json and a rich metadata.json. The FastAPI service loads that directory once at startup and never re-derives anything from request data. The Next.js console never touches the scorer directly. Artifacts only ever move notebook → backend/artifacts/, never back." },
      { title: "Train/serve skew as a tested invariant", body: "backend/app/ml/preprocessing.py is a hand-verified port of the notebook's transformation functions, and test_parity_with_notebook_pipeline asserts the service reproduces the notebook's probability to four decimal places. Skew is the failure mode that degrades predictions silently, so it gets a test rather than a comment, and three real skew bugs were found and fixed this way." },
      { title: "Stateless load-once predictor", body: "Artifacts load in the FastAPI lifespan handler; a failed load leaves the app up with /health reporting degraded rather than crash-looping. handle_unknown=\"ignore\" on the encoder turns an unseen JobRole into an all-zero block instead of a 500, since availability beats purity in a scoring endpoint." },
      { title: "Business logic in metadata, not code", body: "The decision threshold (0.12) is chosen in the notebook by minimising 10·FN + 1·FP, persisted to metadata.json, and overridable per request. scikit-learn is pinned in requirements.txt to metadata[\"versions\"][\"sklearn\"] because unpickling across minor versions is undefined behaviour." },
      { title: "Two-process split with a proxy seam", body: "The browser talks only to Next.js route handlers, which call FastAPI server-side. API_BASE_URL is server-only and never NEXT_PUBLIC_*, keeping the scoring service off the public internet and giving one place for auth, rate limiting and audit logging." },
    ],
    features: [
      { title: "Single-employee scoring form", body: "One FIELD_SPECS table in lib/types.ts is the single source of truth: every field renders as number / select / scale, validates (mirroring the Pydantic schema), and shows a hint automatically. Presets seed realistic profiles." },
      { title: "CSV batch scoring", body: "Upload an HR export (up to 1,000 rows) to /predict/csv; missing required columns are named back, unseen categories degrade gracefully, and the response carries per-row decisions plus a flagged count." },
      { title: "Probability gauge", body: "A hand-rolled SVG radial gauge with a decision-threshold tick (Recharts has no good radial-with-marker equivalent)." },
      { title: "Contribution breakdown", body: "Signed bars showing which factors raised or lowered this person's risk; direction is carried in text (“↑ raises risk”), never by colour alone." },
      { title: "What-if scenarios", body: "Toggle HR-actionable levers (stop overtime, promote now, +20% pay, raise satisfaction) and compare probabilities side by side. Immutable attributes are deliberately excluded from the levers." },
      { title: "Threshold-sweep chart", body: "Flag count and precision/recall across every threshold, so HR can tune flag volume to staffing capacity; callers can override the threshold per request." },
      { title: "Model card & honesty banners", body: "/model/info surfaces live metrics, threshold rationale, required fields and pinned library versions; an amber banner shows whenever the model was not trained on real data or a sklearn version drift is detected." },
    ],
    highlights: [
      "Made train/serve skew a failing test instead of a code comment, a 4-decimal parity assertion between the notebook and the service, and used it to catch three separate silent-degradation bugs.",
      "Pushed every business decision (threshold, cost ratio, fitted medians, valid ranges, library versions) into a persisted metadata.json so the model can be re-tuned and redeployed without a code change.",
      "Tuned the decision threshold from an explicit 10·FN + 1·FP cost function rather than accepting 0.5, turning a timid 0.38-recall classifier into an 0.85-recall talk-to list, and exposed the whole threshold curve in the UI.",
      "Engineered 30 raw HR columns into 85 features (log transforms, peer-relative pay gaps, tenure and promotion-stagnation ratios, composite satisfaction/burnout scores) and kept the model a regularised logistic regression so every prediction stays explainable.",
      "Treated it as an HR system throughout: the model outputs who to talk to, not who to manage out, stated in both the UI and the OpenAPI description, with a fairness checklist shipped in the README as a precondition for real use.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
