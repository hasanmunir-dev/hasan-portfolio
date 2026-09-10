import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Muhammad Hasan Munir - a full-stack software engineer building multi-tenant SaaS platforms end to end with Next.js, Express, and Supabase.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
