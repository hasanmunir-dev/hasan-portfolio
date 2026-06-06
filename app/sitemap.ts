import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hasan-munir-portfolio.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
