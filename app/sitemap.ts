import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PROJECTS } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,           lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`,      lastModified, changeFrequency: "yearly",  priority: 0.8 },
    { url: `${SITE_URL}/projects`,   lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/experience`, lastModified, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${SITE_URL}/skills`,     lastModified, changeFrequency: "yearly",  priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
