"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Parallax } from "@/components/parallax";
import { FadeIn } from "@/components/reveal";
import { PROJECTS, type Project } from "@/lib/data/projects";

const easeExpo = [0.16, 1, 0.3, 1] as const;

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
              key={project.slug}
              project={project}
              index={i}
              isHovered={hovered === i}
              onHover={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>

        {/* See all */}
        <FadeIn className="mt-12">
          <Link
            href="/projects"
            data-hover
            className="inline-flex items-center gap-2 text-label text-fire hover:opacity-70 transition-opacity"
          >
            ALL PROJECTS
            <span aria-hidden>→</span>
          </Link>
        </FadeIn>
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
  project: Project;
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
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <Link
                href={`/projects/${project.slug}`}
                data-hover
                className="inline-flex items-center gap-2 text-label text-fire hover:opacity-70 transition-opacity"
              >
                MORE DETAILS
                <span aria-hidden>→</span>
              </Link>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="inline-flex items-center gap-2 text-label text-ink-2 hover:text-fire transition-colors"
                >
                  VISIT LIVE
                  <span aria-hidden>↗</span>
                </a>
              )}
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
