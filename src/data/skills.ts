export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  relatedProjects?: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Python", relatedProjects: ["careerforge-ai", "maxie"] },
      { name: "JavaScript", relatedProjects: ["animeverse", "ecomind-ai"] },
      { name: "TypeScript", relatedProjects: ["multimax-ai-hub", "animeverse"] },
      { name: "Java" },
      { name: "Dart", relatedProjects: ["focusflow"] },
      { name: "C++" },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React.js", relatedProjects: ["ecomind-ai", "animeverse"] },
      { name: "Next.js", relatedProjects: ["multimax-ai-hub", "animeverse"] },
      { name: "Flutter", relatedProjects: ["focusflow"] },
      { name: "HTML / CSS" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", relatedProjects: ["ecomind-ai"] },
      { name: "Express.js" },
      { name: "FastAPI", relatedProjects: ["careerforge-ai"] },
      { name: "RESTful APIs", relatedProjects: ["careerforge-ai"] },
      { name: "Firebase", relatedProjects: ["focusflow", "multimax-ai-hub"] },
      { name: "Firestore", relatedProjects: ["focusflow"] },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    skills: [
      { name: "LLM Integration", relatedProjects: ["careerforge-ai", "ecomind-ai"] },
      { name: "Prompt Engineering", relatedProjects: ["maxie"] },
      { name: "AI Agent Design" },
      { name: "Anthropic Claude API", relatedProjects: ["ecomind-ai"] },
      { name: "ML Fundamentals" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    skills: [
      { name: "Google Cloud Platform", relatedProjects: ["multimax-ai-hub"] },
      { name: "Compute Engine" },
      { name: "Firebase Hosting" },
      { name: "Docker" },
      { name: "CI/CD Pipelines" },
      { name: "Cloud Build" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "DSA" },
      { name: "OOP" },
    ],
  },
];
