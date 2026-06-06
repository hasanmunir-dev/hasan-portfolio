"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SkillsScene } from "@/components/scene-bg/skills-scene";

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

const SKILLS = [
  { name: "React",        level: 95, cat: "Frontend"  },
  { name: "Next.js",      level: 90, cat: "Frontend"  },
  { name: "TypeScript",   level: 90, cat: "Frontend"  },
  { name: "Tailwind CSS", level: 85, cat: "Frontend"  },
  { name: "Node.js",      level: 92, cat: "Backend"   },
  { name: "Express",      level: 90, cat: "Backend"   },
  { name: "FastAPI",      level: 85, cat: "Backend"   },
  { name: "Python",       level: 85, cat: "Backend"   },
  { name: "REST APIs",    level: 88, cat: "Backend"   },
  { name: "MongoDB",      level: 88, cat: "Database"  },
  { name: "PostgreSQL",   level: 83, cat: "Database"  },
  { name: "Redis",        level: 65, cat: "Database"  },
  { name: "System Design",level: 80, cat: "Systems"   },
  { name: "Docker",       level: 72, cat: "Systems"   },
  { name: "AWS",          level: 68, cat: "Systems"   },
  { name: "GraphQL",      level: 70, cat: "Systems"   },
];

const CATS = ["All", "Frontend", "Backend", "Database", "Systems"] as const;
type Cat = typeof CATS[number];

function SkillRow({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: easeExpo, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center border-b border-stroke py-5 cursor-none"
      data-hover
    >
      {/* Number */}
      <span className="text-label text-ink-3 w-8 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Name */}
      <span className={`skill-name flex-1 ${hovered ? "text-fire" : "text-ink"}`}>
        {skill.name}
      </span>

      {/* Category */}
      <span className="hidden md:block text-label text-ink-3 w-28 text-right">
        {skill.cat}
      </span>

      {/* Level bar */}
      <div className="hidden md:flex items-center gap-3 w-40 justify-end">
        <div className="flex-1 h-px bg-stroke overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: skill.level / 100 } : {}}
            transition={{ duration: 1.2, ease: easeExpo, delay: index * 0.04 + 0.3 }}
            className="h-full bg-fire origin-left"
          />
        </div>
        <span className="text-label text-ink-3 shrink-0">{skill.level}%</span>
      </div>

      {/* Arrow reveal on hover */}
      <motion.span
        initial={{ opacity: 0, x: -8 }}
        animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.2 }}
        className="ml-4 text-fire text-sm shrink-0"
      >
        →
      </motion.span>
    </motion.div>
  );
}

export function SkillsSection() {
  const [active, setActive] = useState<Cat>("All");

  const filtered = active === "All"
    ? SKILLS
    : SKILLS.filter((s) => s.cat === active);

  return (
    <section id="skills" className="section section-bg relative">
      <SkillsScene />
      <div className="grid-overlay opacity-50" />
      <div className="section-inner">

        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-label text-fire">03</span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="text-label text-ink-3">ARSENAL</span>
        </div>

        {/* Headline */}
        <div className="mb-16">
          <FadeIn>
            <h2 className="text-section text-ink leading-none">TECH</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-section text-outlined leading-none">STACK</h2>
          </FadeIn>
        </div>

        {/* Filter tabs */}
        <FadeIn delay={0.1} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {CATS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`text-label px-4 py-2 border transition-all duration-200 ${
                  active === cat
                    ? "border-fire text-fire"
                    : "border-stroke text-ink-2 hover:border-ink-2"
                }`}
                data-hover
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Skills list */}
        <div>
          {filtered.map((skill, i) => (
            <SkillRow key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Bottom stat line */}
        <FadeIn delay={0.2} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Technologies", value: "16+" },
            { label: "Years coding", value: "3+"  },
            { label: "Production systems", value: "5+" },
            { label: "Certifications", value: "3"  },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-display text-5xl md:text-6xl text-ink">{value}</p>
              <p className="text-label text-ink-3 mt-1">{label}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
