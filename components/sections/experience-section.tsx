"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExperienceScene } from "@/components/scene-bg/experience-scene";

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

const EXPERIENCES = [
  {
    index: "01",
    company: "TSN",
    role: "Full-Stack Software Engineer",
    period: "6+ Months",
    type: "Full-time",
    url: "https://tsn.com",
    highlights: [
      "Architected and shipped full-stack features across the core product using Next.js and Node.js",
      "Designed MongoDB schemas optimized for complex query patterns at scale",
      "Built RESTful APIs consumed by web and mobile clients with sub-100ms response times",
      "Implemented real-time features using WebSockets, reducing user-perceived latency by 40%",
      "Conducted code reviews and established engineering standards across the frontend team",
      "Optimized critical database queries, cutting average load time from 2.1s to 340ms",
      "Integrated third-party payment and notification services into the core platform",
    ],
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Express", "REST API"],
  },
  {
    index: "02",
    company: "Websolixs",
    role: "Backend Engineer",
    period: "6+ Months",
    type: "Full-time",
    url: "https://websolixs.com",
    highlights: [
      "Designed and maintained PostgreSQL database architecture for high-traffic SaaS products",
      "Built Python/FastAPI microservices handling 50k+ daily requests with 99.9% uptime",
      "Implemented advanced indexing strategies reducing complex query times by 65%",
      "Developed automated data pipeline scripts for ETL operations across multiple clients",
      "Collaborated with frontend team on API contract definition and OpenAPI documentation",
    ],
    stack: ["FastAPI", "Python", "PostgreSQL", "Docker", "REST API"],
  },
  {
    index: "03",
    company: "SeeBiz",
    role: "Full-Stack Web Developer Trainee",
    period: "Internship",
    type: "Trainee",
    url: "https://seebiz.com",
    highlights: [
      "Developed core UI components in React, contributing to the main product interface",
      "Gained hands-on experience with MERN stack in a production codebase",
      "Implemented responsive designs from Figma mockups with cross-browser compatibility",
      "Participated in agile sprints and daily standups, shipping 3+ features per week",
    ],
    stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
  },
];

export function ExperienceSection() {
  const [active, setActive] = useState(0);
  const exp = EXPERIENCES[active];

  return (
    <section id="experience" className="section section-bg relative">
      <ExperienceScene />
      <div className="grid-overlay opacity-50" />
      <div className="section-inner">

        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-label text-fire">04</span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="text-label text-ink-3">CHRONICLES</span>
        </div>

        {/* Headline */}
        <div className="mb-16">
          <FadeIn>
            <h2 className="text-section text-ink leading-none">WORK</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-section text-outlined leading-none">HISTORY</h2>
          </FadeIn>
        </div>

        {/* Experience layout */}
        <div className="grid md:grid-cols-[280px_1fr] gap-0 md:gap-0">

          {/* Company selector */}
          <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-stroke mb-10 md:mb-0 md:pr-12">
            {EXPERIENCES.map((e, i) => (
              <button
                key={e.index}
                type="button"
                onClick={() => setActive(i)}
                data-hover
                className="group flex flex-col items-start p-4 md:p-0 md:py-6 border-r md:border-r-0 md:border-b border-stroke last:border-0 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-1">
                  <motion.div
                    animate={{ width: active === i ? 24 : 0 }}
                    transition={{ duration: 0.3, ease: easeExpo }}
                    className="h-px bg-fire overflow-hidden"
                  />
                  <span className={`text-label ${active === i ? "text-fire" : "text-ink-3"}`}>
                    {e.index}
                  </span>
                </div>
                <span className={`company-name ${active === i ? "text-ink" : "text-ink-3"}`}>
                  {e.company}
                </span>
                <span className={`text-label mt-1 ${active === i ? "text-ink-2" : "text-ink-3"}`}>
                  {e.period}
                </span>
              </button>
            ))}
          </div>

          {/* Detail pane */}
          <div className="md:pl-16">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeExpo }}
            >
              {/* Role header */}
              <div className="mb-8 pb-8 border-b border-stroke">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-label text-fire mb-2">{exp.type.toUpperCase()}</p>
                    <h3 className="font-display text-4xl md:text-5xl text-ink tracking-wide mb-1">
                      {exp.role.toUpperCase()}
                    </h3>
                    <p className="text-label text-ink-2">@ {exp.company} · {exp.period}</p>
                  </div>
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-ink-3 hover:text-ink border border-stroke hover:border-ink-2 px-4 py-2 transition-all duration-200"
                    data-hover
                  >
                    VISIT ↗
                  </a>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-4 mb-8 list-none">
                {exp.highlights.map((h, i) => (
                  <li key={i}>
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: easeExpo, delay: i * 0.06 }}
                      className="flex gap-4 text-sm text-ink-2 leading-relaxed"
                    >
                      <span className="text-fire mt-0.5 shrink-0">—</span>
                      <span>{h}</span>
                    </motion.div>
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((s) => (
                  <span key={s} className="text-label text-ink-3 border border-stroke px-3 py-1.5">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
