import type { Metadata } from "next";
import Link from "next/link";
import { SkillsSection } from "@/components/sections/skills-section";
import { FadeIn } from "@/components/reveal";
import { SKILLS } from "@/lib/data/skills";
import { WORK_AREAS } from "@/lib/data/about";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "My technical skills across frontend, backend, databases and DevOps, React, Next.js, TypeScript, Node.js, Express, FastAPI, Python, PostgreSQL, and deployment, plus the problem domains I work across.";

export const metadata: Metadata = {
  title: "Skills",
  description: DESCRIPTION,
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Skills - Hasan Munir",
    description: DESCRIPTION,
    url: `${SITE_URL}/skills`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills - Hasan Munir",
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Skills - Hasan Munir",
      description: DESCRIPTION,
      url: `${SITE_URL}/skills`,
      itemListElement: [
        ...SKILLS.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "DefinedTerm", name: s.name, inDefinedTermSet: s.cat },
        })),
        ...WORK_AREAS.map((name, i) => ({
          "@type": "ListItem",
          position: SKILLS.length + i + 1,
          item: { "@type": "DefinedTerm", name, inDefinedTermSet: "Areas" },
        })),
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Skills", item: `${SITE_URL}/skills` },
      ],
    },
  ],
};

export default function SkillsPage() {
  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">My Skills &amp; Areas of Expertise</h1>
      <div className="section-inner px-6 md:px-10 pt-6">
        <div className="flex items-center gap-3 text-label text-ink-3">
          <Link href="/" data-hover className="hover:text-fire transition-colors">HOME</Link>
          <span aria-hidden>/</span>
          <span className="text-ink-2">SKILLS</span>
        </div>
      </div>

      <SkillsSection standalone />

      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-label text-fire">04</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">AREAS I WORK ACROSS</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {WORK_AREAS.map((area, i) => (
              <FadeIn key={area} delay={i * 0.02}>
                <span className="text-label text-ink-2 border border-stroke px-3.5 py-2 hover:border-fire hover:text-fire transition-colors">
                  {area}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
