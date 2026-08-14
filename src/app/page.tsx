import { Navigation } from "@/components/navigation/Navigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { StatsSection } from "@/components/stats/StatsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { EducationSection } from "@/components/education/EducationSection";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";
import { HackathonsSection } from "@/components/hackathons/HackathonsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <StatsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
      <HackathonsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
