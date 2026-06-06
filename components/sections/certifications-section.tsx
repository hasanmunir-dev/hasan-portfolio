"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CertScene } from "@/components/scene-bg/cert-scene";

const easeExpo = [0.16, 1, 0.3, 1] as const;

function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "105%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, ease: easeExpo, delay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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

const CERTS = [
  {
    index: "01",
    title: "Meta Back-End Developer",
    provider: "Meta · Coursera",
    type: "PROFESSIONAL CERTIFICATE",
    duration: "8 Months",
    year: "2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/383BWT7NBYK3",
    badgeId: "484481cb-706a-4a4c-bdfd-5472c4b02eb4",
    hasBadge: true,
    skills: [
      "Python",
      "Django REST",
      "SQL",
      "Git & Version Control",
      "Full-Stack Dev",
      "API Design",
      "Bootstrap",
      "OOP",
      "Cloud Hosting",
      "Unix Commands",
    ],
    highlights: [
      "8-course professional program covering back-end and full-stack development",
      "Built and deployed RESTful APIs using Python, Django, and MySQL",
      "Covered cloud hosting, version control, Linux CLI, and data structures",
    ],
  },
  {
    index: "02",
    title: "Python 3 Programming",
    provider: "University of Michigan · Coursera",
    type: "SPECIALIZATION",
    duration: "3 Months",
    year: "2023",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/2PDHHY3L3X32",
    hasBadge: false,
    skills: [
      "Python 3",
      "OOP",
      "Unit Testing",
      "Web Scraping",
      "JSON / REST APIs",
      "Data Structures",
      "File I/O",
      "Debugging",
    ],
    highlights: [
      "5-course specialization from basics through advanced Python programming",
      "Built programs that fetch and process data from live internet APIs",
      "Hands-on practice with error handling, unit testing, and software design",
    ],
  },
  {
    index: "03",
    title: "Intro to Python Programming",
    provider: "University of Pennsylvania · Coursera",
    type: "COURSE",
    duration: "3 Weeks",
    year: "2023",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/4SV6X5GSUN40",
    hasBadge: false,
    skills: [
      "Python",
      "Computational Thinking",
      "Data Structures",
      "Functions",
      "Scripting",
      "File I/O",
    ],
    highlights: [
      "Foundational course covering Python syntax, data structures, and functions",
      "Designed and wrote fully-functional Python programs end-to-end",
      "Introduction to Jupyter and integrated development environments",
    ],
  },
];

function CertRow({
  cert,
  index,
}: {
  cert: (typeof CERTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: easeExpo, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-b border-stroke"
    >
      {/* ── MAIN ROW ── always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        data-hover
        className="w-full text-left py-8 flex items-start md:items-center gap-5 group"
      >
        {/* Index + animated orange bar */}
        <div className="flex items-center gap-3 shrink-0 w-14">
          <motion.div
            animate={{ width: hovered ? 16 : 0 }}
            transition={{ duration: 0.3, ease: easeExpo }}
            className="h-px bg-fire overflow-hidden"
          />
          <span className={`text-label transition-colors duration-300 ${hovered ? "text-fire" : "text-ink-3"}`}>
            {cert.index}
          </span>
        </div>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-3 mb-1">
            <span className={`cert-title transition-colors duration-300 ${hovered ? "text-fire" : "text-ink"}`}>
              {cert.title}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="text-label text-ink-3">{cert.provider}</span>
            <span className="text-ink-3 text-xs">·</span>
            <span className={`text-label px-2 py-0.5 border ${hovered ? "border-fire text-fire" : "border-stroke text-ink-3"} transition-all duration-300`}>
              {cert.type}
            </span>
          </div>
        </div>

        {/* Meta + link */}
        <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
          <span className="text-label text-ink-3">{cert.year}</span>
          <span className="text-label text-ink-3">{cert.duration}</span>
        </div>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-xl shrink-0 transition-colors duration-300 ${hovered ? "text-fire" : "text-ink-3"}`}
        >
          +
        </motion.div>
      </button>

      {/* ── EXPANDED PANEL ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeExpo }}
            className="overflow-hidden"
          >
            <div className="pb-10 grid md:grid-cols-2 gap-10">
              {/* Highlights */}
              <div>
                <p className="text-label text-fire mb-5">WHAT I LEARNED</p>
                <ul className="space-y-3 list-none mb-6">
                  {cert.highlights.map((h, i) => (
                    <li key={i}>
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: easeExpo, delay: i * 0.07 }}
                        className="flex gap-3 text-sm text-ink-2 leading-relaxed"
                      >
                        <span className="text-fire mt-0.5 shrink-0">→</span>
                        <span>{h}</span>
                      </motion.div>
                    </li>
                  ))}
                </ul>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="inline-flex items-center gap-2 text-label text-ink-2 border border-stroke px-4 py-2 hover:border-fire hover:text-fire transition-all duration-300"
                >
                  VIEW CREDENTIAL ↗
                </a>
              </div>

              {/* Skills + badge */}
              <div>
                <p className="text-label text-fire mb-5">SKILLS COVERED</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: easeExpo, delay: i * 0.04 }}
                      className="text-label text-ink-3 border border-stroke px-3 py-1.5 hover:border-ink-2 hover:text-ink-2 transition-all duration-200 cursor-none"
                      data-hover
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Credly badge for cert 01 */}
                {cert.hasBadge && (
                  <div>
                    <p className="text-label text-ink-3 mb-3">VERIFIED BADGE</p>
                    <div className="badge-frame inline-block">
                      <iframe
                        src={`https://www.credly.com/embedded_badge/${cert.badgeId}`}
                        width="160"
                        height="240"
                        frameBorder="0"
                        scrolling="no"
                        title="Credly Verified Badge"
                        className="block"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function CertificationsSection() {
  return (
    <section id="credentials" className="section section-bg relative overflow-hidden">
      <CertScene />
      <div className="grid-overlay opacity-40" />
      <div className="section-inner relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-label text-fire">05</span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="text-label text-ink-3">CREDENTIALS</span>
        </div>

        {/* Headline */}
        <div className="mb-6">
          <RevealText className="text-section text-ink leading-none">VERIFIED</RevealText>
          <RevealText delay={0.08} className="text-section text-outlined leading-none">EXPERTISE</RevealText>
        </div>

        {/* Lead */}
        <FadeIn delay={0.15} className="mb-16">
          <p className="text-label text-ink-3 max-w-sm">
            Issued by Meta, University of Michigan, and University of Pennsylvania. Publicly verifiable.
          </p>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.2} className="mb-16 flex flex-wrap gap-8 border-b border-stroke pb-10">
          {[
            { value: "3", label: "Certificates" },
            { value: "14", label: "Months of study" },
            { value: "1", label: "Professional certificate" },
            { value: "40+", label: "Skills certified" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-4xl md:text-5xl text-ink">{value}</p>
              <p className="text-label text-ink-3 mt-1">{label}</p>
            </div>
          ))}
        </FadeIn>

        {/* Cert rows */}
        <div>
          {CERTS.map((cert, i) => (
            <CertRow key={cert.index} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
