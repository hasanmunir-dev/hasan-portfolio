import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/sections/about-section";

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
