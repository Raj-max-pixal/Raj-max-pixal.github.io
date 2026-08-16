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
  imageBannerUrl?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  features?: string[];
  metrics?: string[];
  index?: number;
}

export const projects: Project[] = [
  {
    id: "ai-content-platform",
    name: "AI Content Platform",
    category: "AI Platform",
    description:
      "A production-grade AI content platform serving real users — designed, built, and shipped from scratch.",
    longDescription:
      "A production-grade AI content platform designed and built from scratch. Handles concurrent user requests through a distributed backend on Firebase and Google Cloud Platform with real-time data sync, focusing on reliability and performance at scale. Engineered for real user load with CI/CD pipelines for continuous delivery.",
    techStack: ["Next.js", "TypeScript", "Firebase", "GCP", "AI/LLM", "CI/CD"],
    githubUrl: "https://github.com/Raj-max-pixal/ai-content-platform",
    liveUrl: "https://ai-content-platform.demo",
    featured: true,
    accentColor: "#3b7eff",
    imageBannerUrl: "/projects/ai-content-platform.png",
    problem: "Content creators struggle with slow manual generation workflows and fragmented toolsets across platforms.",
    solution: "Built a centralized cloud-native AI generation platform with sub-second response times and automated deployment pipelines.",
    architecture: ["Next.js App Router frontend", "Firebase Firestore real-time state engine", "GCP Cloud Functions API gateway", "LLM API streaming responses"],
    features: ["Real-time AI generation", "Distributed user session management", "Automated CI/CD build deployment", "Sub-second streaming API endpoint"],
    metrics: ["10k+ Monthly Generations", "Sub-second API Latency"],
  },
  {
    id: "maxie",
    name: "MAXie",
    category: "AI Companion / Desktop App",
    description:
      "An intelligent desktop companion — an AI-powered pet that lives on your screen and responds to you.",
    longDescription:
      "MAXie is an AI-powered desktop companion experience combining personality-driven LLM responses with a delightful visual presence. Blurs the line between productivity tool and interactive companion — built with Python, prompt engineering, and desktop app frameworks.",
    techStack: ["Python", "LLM APIs", "Prompt Engineering", "Desktop App", "AI Agent Design"],
    githubUrl: "https://github.com/Raj-max-pixal/MAXie-desktop-pet",
    liveUrl: "https://github.com/Raj-max-pixal/MAXie-desktop-pet/releases",
    featured: true,
    accentColor: "#ec4899",
    imageBannerUrl: "/projects/maxie.png",
    problem: "Traditional desktop utilities lack interactive presence and personal assistant intelligence.",
    solution: "Engineered a screen-aware desktop AI agent with custom prompt persona logic and lightweight system footprint.",
    architecture: ["Python GUI event loop", "Custom System Prompt Engine", "Asynchronous LLM API Handler", "Local Memory State"],
    features: ["Screen overlay companion", "Interactive conversation loop", "Context-aware prompt persona", "Low CPU/Memory footprint"],
    metrics: ["1,500+ Downloads", "<50MB RAM Usage"],
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
    githubUrl: "https://github.com/Raj-max-pixal/studybuddy-ai",
    liveUrl: "https://studybuddy-ai.app",
    featured: true,
    accentColor: "#a855f7",
    problem: "Students waste hours reading static textbooks without active recall or concept verification.",
    solution: "Created an adaptive knowledge-graph study engine that turns text materials into interactive quizzes and concept maps.",
    architecture: ["React Next.js UI", "Knowledge Graph Extraction Parser", "LLM Quiz Generator Engine", "Firebase Progress Database"],
    features: ["Adaptive quiz generation", "Multi-level concept explanations", "Visual knowledge progression tracking", "Personalized study scheduling"],
    metrics: ["98% Accuracy in Quiz Gen", "5,000+ Active Students"],
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
    githubUrl: "https://github.com/Raj-max-pixal/janvoice-ai",
    liveUrl: null,
    featured: false,
    accentColor: "#22c55e",
    problem: "High latency in traditional speech-to-text-to-speech pipelines disrupts conversational flow.",
    solution: "Architected a full-duplex WebSocket stream connecting FastAPI with real-time speech processing and fast LLM inference.",
    architecture: ["FastAPI WebSocket Server", "PyAudio Voice Stream Buffer", "Whisper Speech Parser", "Text-to-Speech Audio Output"],
    features: ["Full-duplex real-time voice stream", "Sub-500ms audio turnaround", "Noise-filtered speech capture", "Natural voice output"],
    metrics: ["Sub-500ms Audio Latency", "99% Speech Recognition Rate"],
  },
  {
    id: "growth-intelligence-studio",
    name: "Growth Intelligence Studio",
    category: "AI / Web",
    description:
      "An AI-powered growth platform helping creators and brands scale content, reach, and engagement.",
    longDescription:
      "Growth Intelligence Studio is a web platform built to help creators and brands scale smarter. It uses AI to automate content strategy, optimize posting schedules, analyze engagement patterns, and generate platform-specific content — all from a single dashboard.",
    techStack: ["Next.js", "React", "Node.js", "Firebase", "AI/LLM", "TypeScript"],
    githubUrl: "https://github.com/Raj-max-pixal/growth-intelligence",
    liveUrl: "https://growthstudio.app",
    featured: false,
    accentColor: "#f59e0b",
    problem: "Brands lack actionable intelligence on how content performance translates into actual audience growth.",
    solution: "Designed an analytics engine combining engagement data modeling with predictive AI content recommendations.",
    architecture: ["Next.js App Dashboard", "Node.js Analytics Engine", "Firebase Realtime Store", "Predictive Growth Model"],
    features: ["Content performance analytics", "Predictive posting schedule AI", "Multi-platform strategy insights", "Automated engagement reports"],
    metrics: ["Analyzed 2M+ Posts", "40% Engagement Lift"],
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
    githubUrl: "https://github.com/Raj-max-pixal/animeverse",
    liveUrl: "https://animeverse.demo",
    featured: false,
    accentColor: "#f97316",
    problem: "Existing media discovery sites are cluttered with slow load times and intrusive ads.",
    solution: "Shipped a clean, lightning-fast media discovery platform with instant search, rich imagery, and community lists.",
    architecture: ["Next.js React Frontend", "Jikan Media API Connector", "Firebase Authentication & Saved Lists", "Tailwind Responsive UI"],
    features: ["Instant title search & filtering", "Curated community watchlists", "High-contrast dark UI theme", "Optimized image lazy-loading"],
    metrics: ["100/100 Lighthouse Score", "500ms Page Load Time"],
  },
];

