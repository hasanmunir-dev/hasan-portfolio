import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, RevealText } from "@/components/reveal";
import { PROJECTS } from "@/lib/data/projects";
import { EXPERIENCES } from "@/lib/data/experience";
import {
  PERSON_DESCRIPTION,
  QUICK_FACTS,
  BIO_PARAGRAPHS,
  HOW_I_WORK,
  PHILOSOPHY,
  WORK_AREAS,
  MARQUEE_ITEMS,
  KNOWS_ABOUT,
  SOCIAL_LINKS,
} from "@/lib/data/about";
import { PERSON_ID, SITE_URL, SOCIAL_PROFILES } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: PERSON_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Hasan Munir",
    description: PERSON_DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hasan Munir",
    description: PERSON_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Muhammad Hasan Munir",
      alternateName: "Hasan Munir",
      url: `${SITE_URL}/`,
      mainEntityOfPage: `${SITE_URL}/about`,
      jobTitle: "Full-Stack Software Engineer",
      description: PERSON_DESCRIPTION,
      sameAs: SOCIAL_PROFILES,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
      worksFor: { "@type": "Organization", name: "TSN", url: "https://thesocialnexus.co" },
      knowsAbout: KNOWS_ABOUT,
      knowsLanguage: ["English", "Urdu"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
      ],
    },
  ],
};

export default function AboutPage() {
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
          <div className="flex items-center gap-3 mb-10 text-label text-ink-3">
            <Link href="/" data-hover className="hover:text-fire transition-colors">HOME</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-2">ABOUT</span>
          </div>

          {/* Headline */}
          <h1 className="sr-only">About Me</h1>
          <div className="mb-12" aria-hidden="true">
            <RevealText className="text-section text-ink leading-none">ABOUT</RevealText>
            <RevealText delay={0.08} className="text-section text-outlined leading-none">HASAN</RevealText>
          </div>

          {/* Lead: first-person entity description */}
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl leading-relaxed text-ink font-light max-w-4xl">
              {PERSON_DESCRIPTION}
            </p>
          </FadeIn>

          {/* Quick facts */}
          <FadeIn delay={0.15}>
            <dl className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 border-t border-stroke pt-10">
              {QUICK_FACTS.map(({ k, v, accent }) => (
                <div key={k} className="flex flex-col gap-1">
                  <dt className="text-label text-ink-3">{k}</dt>
                  <dd className={`text-sm ${accent ? "text-[color:rgba(74,222,128,0.9)]" : "text-ink"}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      {/* Background */}
      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-label text-fire">01</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">BACKGROUND</span>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl">
            {BIO_PARAGRAPHS.map((para, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <p className="text-sm md:text-base text-ink-2 leading-relaxed">{para}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-label text-fire">02</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">HOW I WORK</span>
          </div>
          <p className="text-sm text-ink-2 leading-relaxed max-w-2xl mb-10">
            The project pages show what I&apos;ve built solo. Inside an engineering team, this
            is how I operate day to day.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4 list-none max-w-4xl">
            {HOW_I_WORK.map((item, i) => (
              <FadeIn key={item} delay={i * 0.04}>
                <li className="flex gap-3 text-sm md:text-base text-ink-2 leading-relaxed border-b border-stroke pb-4">
                  <span className="text-fire shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-label text-fire">03</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">ENGINEERING PHILOSOPHY</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PHILOSOPHY.map((item, i) => (
              <FadeIn key={item.num} delay={i * 0.08}>
                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-label text-fire">{item.num}</span>
                    <div className="h-px flex-1 bg-stroke group-hover:bg-fire transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-3 tracking-wide">
                    {item.title.toUpperCase()}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Marquee */}
          <div className="border-y border-stroke py-4 mt-16 overflow-hidden">
            <div className="marquee-track">
              <div className="marquee-content">
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                  <span key={i} className="text-label text-ink-3 px-8">
                    {item}
                    <span className="text-fire ml-8">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas I work across */}
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

      {/* Selected work + links */}
      <section className="section section-bg section-compact relative">
        <div className="section-inner">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-label text-fire">05</span>
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-label text-ink-3">SELECTED WORK</span>
          </div>
          <div>
            {PROJECTS.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                data-hover
                className="group flex items-start md:items-center gap-5 border-b border-stroke py-6"
              >
                <span className="text-label text-ink-3 shrink-0">{p.index}</span>
                <div className="flex-1 min-w-0">
                  <span className="project-title text-ink group-hover:text-fire transition-colors">
                    {p.title}
                  </span>
                  <p className="text-label text-ink-3 mt-1">{p.subtitle}</p>
                </div>
                <span className="hidden md:block text-label text-ink-3 shrink-0">{p.type}</span>
                <span className="text-fire shrink-0" aria-hidden>→</span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/projects" data-hover className="text-label text-fire hover:opacity-70 transition-opacity">
              ALL PROJECTS →
            </Link>
            <Link href="/experience" data-hover className="text-label text-fire hover:opacity-70 transition-opacity">
              WORK HISTORY ({EXPERIENCES.length} ROLES) →
            </Link>
            <Link href="/skills" data-hover className="text-label text-fire hover:opacity-70 transition-opacity">
              SKILLS →
            </Link>
          </div>

          {/* Links */}
          <div className="mt-16 border-t border-stroke pt-10">
            <p className="text-label text-ink-3 mb-6">ELSEWHERE</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-10 gap-y-3">
              {SOCIAL_LINKS.map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  data-hover
                  className="group flex items-baseline gap-3"
                >
                  <span className="text-label text-ink-3 group-hover:text-fire transition-colors">{label}</span>
                  <span className="text-sm text-ink-2 group-hover:text-ink transition-colors">{value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
