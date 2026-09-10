import type { Metadata } from "next";
import { HeroSection }            from "@/components/sections/hero-section";
import { AboutSection }           from "@/components/sections/about-section";
import { SkillsSection }          from "@/components/sections/skills-section";
import { ExperienceSection }      from "@/components/sections/experience-section";
import { ProjectsSection }        from "@/components/sections/projects-section";
import { ContactSection }         from "@/components/sections/contact-section";
import { CertificationsSection }  from "@/components/sections/certifications-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
