"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
    title: "Enterprise Dashboard",
    subtitle: "Analytics & Business Intelligence Platform",
    description:
      "A full-scale analytics dashboard delivering real-time business metrics to 500+ active users. Built with a Next.js frontend consuming a FastAPI backend, with PostgreSQL for structured reporting data and Redis for session caching.",
    impact: [
      "Reduced report generation time by 72% via query optimization",
      "Real-time data streaming with WebSocket connections",
      "Role-based access control for 5 user permission levels",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "TypeScript", "Tailwind CSS"],
    type: "Full-Stack",
    year: "2024",
    accent: "#FF4500",
  },
  {
    index: "02",
    title: "Booking Platform",
    subtitle: "Multi-tenant Scheduling & Reservation System",
    description:
      "A multi-tenant SaaS booking system with dynamic availability calendars, automated email notifications, and Stripe payment integration. Handles concurrent booking conflicts with optimistic locking patterns.",
    impact: [
      "Processes 2,000+ bookings per day across 50+ tenants",
      "Automated conflict resolution with zero double-bookings",
      "Payment success rate of 98.4% via Stripe integration",
    ],
    stack: ["React", "Node.js", "MongoDB", "Express", "Stripe", "SendGrid"],
    type: "Full-Stack",
    year: "2024",
    accent: "#FF4500",
  },
  {
    index: "03",
    title: "REST API Service",
    subtitle: "High-Performance Microservices Backend",
    description:
      "A production-grade RESTful API suite powering a mobile-first product. Designed with clean architecture principles, comprehensive OpenAPI documentation, JWT authentication, and automated test coverage above 85%.",
    impact: [
      "Sub-80ms average response time across all endpoints",
      "85%+ test coverage with Jest and Supertest",
      "OpenAPI docs auto-generated and versioned",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Jest", "Docker", "JWT"],
    type: "Backend",
    year: "2023",
    accent: "#FF4500",
  },
  {
    index: "04",
    title: "AI Chatbot Integration",
    subtitle: "Conversational Interface for Customer Support",
    description:
      "An intelligent customer support chatbot that integrates with an LLM API, maintaining conversation context across sessions and escalating complex queries to human agents with full conversation history.",
    impact: [
      "Deflects 60% of Tier-1 support tickets automatically",
      "Context-aware multi-turn conversation support",
      "Seamless handoff to human agents with full history",
    ],
    stack: ["Python", "FastAPI", "OpenAI API", "PostgreSQL", "React", "WebSocket"],
    type: "Full-Stack",
    year: "2024",
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
          <span className="text-label text-ink-3">SELECTED WORK</span>
        </div>

        {/* Headline */}
        <div className="mb-16">
          <FadeIn>
            <h2 className="text-section text-ink leading-none">CASE</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-section text-outlined leading-none">STUDIES</h2>
          </FadeIn>
        </div>

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
      {/* Row header — always visible */}
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
          <span className="text-label text-ink-3">{project.year}</span>
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
