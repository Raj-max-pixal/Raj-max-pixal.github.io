import { Navigation } from "@/components/navigation/Navigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { StatsSection } from "@/components/stats/StatsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { HackathonsSection } from "@/components/hackathons/HackathonsSection";
import { EducationSection } from "@/components/education/EducationSection";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";
import { PlatformMarquee } from "@/components/ui/PlatformMarquee";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/ui/Footer";
import { GlobalCursorNucleus } from "@/components/ui/GlobalCursorNucleus";

export default function Home() {
  return (
    <main>
      <GlobalCursorNucleus />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <StatsSection />
      <ExperienceSection />
      <SkillsSection />
      <section style={{ padding: "clamp(3rem, 6vw, 5rem) 0", position: "relative", overflow: "hidden" }}>
        <PlatformMarquee />
      </section>
      <HackathonsSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}



