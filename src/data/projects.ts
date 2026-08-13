export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  accentColor: string;
  index?: number;
}

export const projects: Project[] = [
  {
    id: "multimax-ai-hub",
    name: "Multimax AI Hub",
    category: "AI Platform",
    description:
      "Production AI content platform serving real users — the flagship product of Multimax.",
    longDescription:
      "The core product of Multimax startup. A production-grade AI content platform designed, built, and shipped from scratch. Handles concurrent user requests through a distributed backend on Firebase and Google Cloud Platform with real-time data sync, focusing on reliability and performance at scale.",
    techStack: ["Next.js", "TypeScript", "Firebase", "GCP", "AI/LLM", "CI/CD"],
    githubUrl: "https://github.com/Raj-max-pixal",
    liveUrl: null,
    featured: true,
    accentColor: "#3b7eff",
  },
  {
    id: "maxie",
    name: "MAXie",
    category: "AI Companion / Desktop Pet",
    description:
      "An intelligent desktop companion — an AI-powered pet that lives on your screen and responds to you.",
    longDescription:
      "MAXie is an AI-powered desktop companion experience combining personality-driven LLM responses with a delightful visual presence. Built as part of the Multimax product family, MAXie blurs the line between productivity tool and interactive companion.",
    techStack: ["Python", "LLM APIs", "Prompt Engineering", "Desktop App", "AI Agent Design"],
    githubUrl: "https://github.com/Raj-max-pixal",
    liveUrl: null,
    featured: true,
    accentColor: "#ec4899",
  },
  {
    id: "studybuddy-ai",
    name: "StudyBuddy AI",
    category: "AI / Education",
    description:
      "An AI-powered study companion that adapts to your learning style and accelerates comprehension.",
    longDescription:
      "StudyBuddy AI is an intelligent learning assistant that leverages LLM technology to create personalized study sessions. It generates adaptive quizzes, explains concepts in multiple ways, and tracks progress — turning passive reading into active, measurable learning.",
    techStack: ["React", "Next.js", "LLM APIs", "Firebase", "TypeScript"],
    githubUrl: "https://github.com/Raj-max-pixal",
    liveUrl: null,
    featured: true,
    accentColor: "#a855f7",
  },
  {
    id: "janvoice-ai",
    name: "JanVoice AI",
    category: "AI / Voice",
    description:
      "A voice-first AI interface enabling natural, real-time spoken conversation with an intelligent assistant.",
    longDescription:
      "JanVoice AI is a voice-first interaction platform that brings natural language AI to life through speech. Users can have real-time spoken conversations with an intelligent assistant, powered by LLM APIs and optimized for low-latency audio processing.",
    techStack: ["Python", "LLM APIs", "Voice Processing", "WebSocket", "FastAPI"],
    githubUrl: "https://github.com/Raj-max-pixal",
    liveUrl: null,
    featured: false,
    accentColor: "#22c55e",
  },
  {
    id: "multimax-growth-studio",
    name: "Multimax AI Growth Studio",
    category: "AI / Web",
    description:
      "An AI-powered growth platform helping creators and brands scale content, reach, and engagement.",
    longDescription:
      "Multimax AI Growth Studio is a web platform built to help creators and brands scale smarter. It uses AI to automate content strategy, optimize posting schedules, analyze engagement patterns, and generate platform-specific content — all from a single dashboard.",
    techStack: ["Next.js", "React", "Node.js", "Firebase", "AI/LLM", "TypeScript"],
    githubUrl: "https://github.com/Raj-max-pixal",
    liveUrl: null,
    featured: false,
    accentColor: "#f59e0b",
  },
  {
    id: "animeverse",
    name: "AnimeVerse",
    category: "Web Development",
    description:
      "A beautifully crafted anime discovery and community platform built for enthusiasts.",
    longDescription:
      "AnimeVerse is a full-stack anime discovery platform with curated content, community features, and a rich browsing experience. Built with modern web technologies and optimized for performance and discoverability, it showcases full-stack engineering across the entire product lifecycle.",
    techStack: ["React", "Next.js", "Firebase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Raj-max-pixal",
    liveUrl: null,
    featured: false,
    accentColor: "#f97316",
  },
];
