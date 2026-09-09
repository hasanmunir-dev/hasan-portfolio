"use client";

import { HeroSection }      from "@/components/sections/hero-section";
import { AboutSection }     from "@/components/sections/about-section";
import { SkillsSection }    from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection }  from "@/components/sections/projects-section";
import { ContactSection }          from "@/components/sections/contact-section";
import { CertificationsSection }   from "@/components/sections/certifications-section";
import { Navigation }              from "@/components/navigation";
import { Footer }                  from "@/components/footer";
import { CustomCursor }            from "@/components/cursor";
import { ScrollProgress }          from "@/components/scroll-progress";
import { Backdrop }                from "@/components/backdrop";

export default function Home() {
  return (
    <>
      <Backdrop />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
