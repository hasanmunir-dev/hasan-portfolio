import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, RevealText } from "@/components/reveal";
import { PROJECTS, getProject } from "@/lib/data/projects";
import { PERSON_ID, SITE_URL } from "@/lib/site";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const url = `${SITE_URL}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    keywords: project.stack,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} - Hasan Munir`,
      description: project.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Hasan Munir`,
      description: project.description,
    },
  };
}

export default function ProjectDetailPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        url: project.link || `${SITE_URL}/projects/${project.slug}`,
        author: { "@id": PERSON_ID },
        keywords: project.stack.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projects/${project.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section section-bg section-flush relative">
        <div className="grid-overlay opacity-50" />
        <div className="section-inner">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-10 text-label text-ink-3 flex-wrap">
            <Link href="/" data-hover className="hover:text-fire transition-colors">HOME</Link>
            <span aria-hidden>/</span>
            <Link href="/projects" data-hover className="hover:text-fire transition-colors">PROJECTS</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-2">{project.title.toUpperCase()}</span>
          </div>

          {/* Title */}
          <div className="mb-6">
            <RevealText
              as="h1"
              className="font-display text-5xl sm:text-6xl md:text-8xl text-ink leading-[0.95] tracking-wide"
            >
              {project.title.toUpperCase()}
            </RevealText>
          </div>
          <FadeIn delay={0.08}>
            <p className="text-lg md:text-xl text-ink-2 max-w-3xl">{project.subtitle}</p>
          </FadeIn>

          {/* Meta row */}
          <FadeIn delay={0.12}>
            <dl className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 border-y border-stroke py-8">
              <div className="flex flex-col gap-1 lg:col-span-2">
                <dt className="text-label text-ink-3">Category</dt>
                <dd className="text-sm text-ink">{project.category}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-label text-ink-3">Type</dt>
                <dd className="text-sm text-ink">{project.type}</dd>
              </div>
              <div className="flex flex-col gap-1 lg:col-span-3">
                <dt className="text-label text-ink-3">Role</dt>
                <dd className="text-sm text-ink">{project.role}</dd>
              </div>
            </dl>
          </FadeIn>

          {project.link && (
            <FadeIn delay={0.16}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="btn-accent !px-8 !py-4 !text-xs mt-8"
              >
                VISIT LIVE <span aria-hidden>↗</span>
              </a>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-label text-fire">01</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">OVERVIEW</span>
          </div>
          <FadeIn>
            <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-4xl">
              {project.overview}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Architecture */}
      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-label text-fire">02</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">ARCHITECTURE</span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {project.architecture.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <h3 className="font-display text-2xl text-ink mb-3 tracking-wide">
                  {item.title.toUpperCase()}
                </h3>
                <p className="text-sm text-ink-2 leading-relaxed">{item.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Key modules */}
      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-label text-fire">03</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">KEY MODULES</span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {project.features.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.04}>
                <div className="border-l-2 border-fire pl-5">
                  <h3 className="text-sm font-medium text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-label text-fire">04</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">HIGHLIGHTS</span>
          </div>
          <ul className="space-y-4 list-none max-w-4xl">
            {project.highlights.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <li className="flex gap-4 text-sm md:text-base text-ink-2 leading-relaxed">
                  <span className="text-fire shrink-0 mt-1">→</span>
                  <span>{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>

          {/* Stack */}
          <div className="mt-16">
            <p className="text-label text-fire mb-5">FULL STACK</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="text-label text-ink-3 border border-stroke px-3 py-1.5">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Footer nav */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-stroke pt-10">
            <Link href="/projects" data-hover className="text-label text-fire hover:opacity-70 transition-opacity">
              ← ALL PROJECTS
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              data-hover
              className="text-label text-fire hover:opacity-70 transition-opacity text-right"
            >
              NEXT: {next.title.toUpperCase()} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
