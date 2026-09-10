import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, RevealText } from "@/components/reveal";
import { PROJECTS } from "@/lib/data/projects";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "A selection of what I've built, multi-tenant B2B SaaS platforms across education, logistics and retail, a personal-knowledge app, and an ML attrition-risk tool, built end to end with Next.js, Express, FastAPI and Supabase.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects - Hasan Munir",
    description: DESCRIPTION,
    url: `${SITE_URL}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Hasan Munir",
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Projects - Hasan Munir",
      description: DESCRIPTION,
      url: `${SITE_URL}/projects`,
      hasPart: PROJECTS.map((p) => ({
        "@type": "SoftwareApplication",
        name: p.title,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        url: `${SITE_URL}/projects/${p.slug}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      ],
    },
  ],
};

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section section-bg section-flush relative">
        <div className="grid-overlay opacity-50" />
        <div className="section-inner">

          <div className="flex items-center gap-3 mb-10 text-label text-ink-3">
            <Link href="/" data-hover className="hover:text-fire transition-colors">HOME</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-2">PROJECTS</span>
          </div>

          <h1 className="sr-only">My Projects</h1>
          <div className="mb-10" aria-hidden="true">
            <RevealText className="text-section text-ink leading-none">SELECTED</RevealText>
            <RevealText delay={0.08} className="text-section text-outlined leading-none">PROJECTS</RevealText>
          </div>

          <FadeIn delay={0.1}>
            <p className="text-sm md:text-base text-ink-2 leading-relaxed max-w-2xl mb-14">
              {DESCRIPTION}
            </p>
          </FadeIn>

          <div>
            {PROJECTS.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.05}>
                <Link
                  href={`/projects/${project.slug}`}
                  data-hover
                  className="group flex items-start md:items-center gap-6 border-b border-stroke py-8"
                >
                  <span className="text-label text-ink-3 shrink-0 group-hover:text-fire transition-colors">
                    {project.index}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <span className="project-title text-ink group-hover:text-fire transition-colors">
                        {project.title}
                      </span>
                      <span className="text-label text-ink-3 hidden md:inline">{project.subtitle}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((s) => (
                        <span key={s} className="text-label text-ink-3">{s}</span>
                      ))}
                      {project.stack.length > 5 && (
                        <span className="text-label text-ink-3">+{project.stack.length - 5}</span>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
                    <span className="text-label text-ink-3">{project.type}</span>
                  </div>
                  <span className="text-fire text-xl shrink-0" aria-hidden>→</span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
