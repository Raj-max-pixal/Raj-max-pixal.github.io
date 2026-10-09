export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
  relatedProjects?: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: "react", relatedProjects: ["multimax-ai-hub", "animeverse"] },
      { name: "Next.js", icon: "nextjs", relatedProjects: ["multimax-ai-hub", "animeverse"] },
      { name: "TypeScript", icon: "typescript", relatedProjects: ["multimax-ai-hub", "animeverse"] },
      { name: "JavaScript", icon: "javascript", relatedProjects: ["rebound", "healthmate"] },
      { name: "HTML", icon: "html", relatedProjects: ["rebound", "healthmate"] },
      { name: "CSS", icon: "css", relatedProjects: ["rebound", "healthmate"] },
      { name: "Tailwind CSS", icon: "tailwind", relatedProjects: ["multimax-ai-hub"] },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Python", icon: "python", relatedProjects: ["multimax-ai-hub", "maxie", "janvoice-ai"] },
      { name: "FastAPI", icon: "fastapi", relatedProjects: ["multimax-ai-hub", "janvoice-ai"] },
      { name: "Node.js", icon: "nodejs", relatedProjects: ["rebound", "healthmate"] },
      { name: "Express.js", icon: "express" },
      { name: "Java", icon: "java" },
      { name: "RESTful APIs", icon: "api", relatedProjects: ["multimax-ai-hub"] },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    skills: [
      { name: "LLM Integration", icon: "llm", relatedProjects: ["multimax-ai-hub", "studybuddy-ai", "janvoice-ai"] },
      { name: "Prompt Engineering", icon: "prompt", relatedProjects: ["multimax-ai-hub", "maxie"] },
      { name: "AI Agent Design", icon: "agent", relatedProjects: ["multimax-ai-hub", "maxie"] },
      { name: "Gemini API", icon: "gemini" },
      { name: "Claude API", icon: "claude" },
      { name: "ML Fundamentals", icon: "ml" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
      { name: "Android", icon: "android", relatedProjects: ["rebound", "healthmate"] },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    skills: [
      { name: "Firebase", icon: "firebase", relatedProjects: ["studybuddy-ai"] },
      { name: "Firestore", icon: "firestore" },
      { name: "Google Cloud", icon: "gcp" },
      { name: "Docker", icon: "docker", relatedProjects: ["multimax-ai-hub"] },
      { name: "CI/CD", icon: "cicd", relatedProjects: ["multimax-ai-hub"] },
      { name: "Vercel", icon: "vercel", relatedProjects: ["multimax-ai-hub", "rebound", "healthmate"] },
    ],
  },
  {
    id: "cloudsecops",
    label: "CloudSecOps",
    skills: [
      { name: "Docker", icon: "docker", relatedProjects: ["multimax-ai-hub"] },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Google Cloud", icon: "gcp" },
      { name: "Firebase", icon: "firebase" },
      { name: "CI/CD", icon: "cicd", relatedProjects: ["multimax-ai-hub"] },
      { name: "FastAPI", icon: "fastapi", relatedProjects: ["multimax-ai-hub"] },
      { name: "Linux", icon: "linux" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Figma", icon: "figma" },
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql", relatedProjects: ["multimax-ai-hub"] },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    id: "cloudservices",
    label: "Cloud Services",
    skills: [
      { name: "AWS", icon: "aws" },
      { name: "Azure", icon: "azure" },
      { name: "Google Cloud", icon: "gcp" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Python", icon: "python", relatedProjects: ["multimax-ai-hub", "maxie"] },
      { name: "JavaScript", icon: "javascript", relatedProjects: ["rebound", "healthmate"] },
      { name: "TypeScript", icon: "typescript", relatedProjects: ["multimax-ai-hub"] },
      { name: "Java", icon: "java" },
      { name: "Go", icon: "go" },
      { name: "Rust", icon: "rust" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "Dart", icon: "dart" },
    ],
  },
];
