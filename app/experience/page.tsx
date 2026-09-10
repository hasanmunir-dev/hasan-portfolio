import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EXPERIENCES } from "@/lib/data/experience";
import { PERSON_ID, SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "My work history, covering lead full-stack developer work at TSN on three multi-tenant B2B SaaS platforms and a year-long production MERN apprenticeship at SeeBiz.";

export const metadata: Metadata = {
  title: "Experience",
  description: DESCRIPTION,
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience - Hasan Munir",
    description: DESCRIPTION,
    url: `${SITE_URL}/experience`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience - Hasan Munir",
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      name: "Experience - Hasan Munir",
      description: DESCRIPTION,
      url: `${SITE_URL}/experience`,
      mainEntity: { "@id": PERSON_ID },
    },
    ...EXPERIENCES.map((e) => ({
      "@type": "OrganizationRole",
      roleName: e.role,
      memberOf: { "@type": "Organization", name: e.company, url: e.url },
      description: e.highlights[0],
    })),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Experience", item: `${SITE_URL}/experience` },
      ],
    },
  ],
};

export default function ExperiencePage() {
  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">My Work Experience</h1>
      <div className="section-inner px-6 md:px-10 pt-6">
        <div className="flex items-center gap-3 text-label text-ink-3">
          <Link href="/" data-hover className="hover:text-fire transition-colors">HOME</Link>
          <span aria-hidden>/</span>
          <span className="text-ink-2">EXPERIENCE</span>
        </div>
      </div>
      <ExperienceSection standalone />
    </main>
  );
}
