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
      { name: "React", icon: "react", relatedProjects: ["ai-content-platform", "animeverse"] },
      { name: "Next.js", icon: "nextjs", relatedProjects: ["ai-content-platform", "animeverse"] },
      { name: "TypeScript", icon: "typescript", relatedProjects: ["ai-content-platform", "animeverse"] },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Python", icon: "python", relatedProjects: ["maxie", "janvoice-ai"] },
      { name: "FastAPI", icon: "fastapi", relatedProjects: ["janvoice-ai"] },
      { name: "Node.js", icon: "nodejs", relatedProjects: ["growth-intelligence-studio"] },
      { name: "Express.js", icon: "express" },
      { name: "Java", icon: "java" },
      { name: "RESTful APIs", icon: "api" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    skills: [
      { name: "LLM Integration", icon: "llm", relatedProjects: ["studybuddy-ai", "janvoice-ai"] },
      { name: "Prompt Engineering", icon: "prompt", relatedProjects: ["maxie"] },
      { name: "AI Agent Design", icon: "agent" },
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
      { name: "Android", icon: "android" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    skills: [
      { name: "Firebase", icon: "firebase", relatedProjects: ["ai-content-platform", "studybuddy-ai"] },
      { name: "Firestore", icon: "firestore" },
      { name: "Google Cloud", icon: "gcp", relatedProjects: ["ai-content-platform"] },
      { name: "Docker", icon: "docker" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
  {
    id: "cloudsecops",
    label: "CloudSecOps",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Google Cloud", icon: "gcp" },
      { name: "Firebase", icon: "firebase" },
      { name: "CI/CD", icon: "cicd" },
      { name: "FastAPI", icon: "fastapi" },
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
      { name: "PostgreSQL", icon: "postgresql" },
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
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Java", icon: "java" },
      { name: "Go", icon: "go" },
      { name: "Rust", icon: "rust" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "Dart", icon: "dart" },
    ],
  },
];
