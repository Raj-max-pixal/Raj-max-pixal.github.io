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
  index?: number;
}

export const projects: Project[] = [
  {
    id: "multimax-ai-hub",
    name: "Multimax AI Hub",
    category: "All-in-One AI Platform",
    description:
      "All-in-one AI operating system unifying chat, autonomous agents, code execution, multimodal documents, and workflows.",
    longDescription:
      "Multimax AI Hub is an open-source, production-grade AI platform engineered to replace fragmented subscriptions. It brings together chat, code generation, autonomous web agents, PDF/document intelligence with vector RAG, procedural audio, and productivity workflows into a cohesive workspace with local-first model support (Ollama, DeepSeek, Qwen) and cloud LLM fallback.",
    techStack: ["FastAPI", "Python", "Next.js", "TypeScript", "Docker", "ChromaDB", "PostgreSQL", "Ollama"],
    githubUrl: "https://github.com/Raj-max-pixal/multimax-ai-hub",
    liveUrl: "https://multimax-ai-hub.vercel.app/",
    featured: true,
    accentColor: "#3b82f6",
    imageBannerUrl: "/projects/multimax-ai-hub.png",
    problem: "Creators and developers juggle multiple disconnected AI tools, leading to fragmented context, data privacy concerns, and steep recurring subscription costs.",
    solution: "Engineered a self-hostable, all-in-one AI operating system combining specialized local and cloud models, autonomous agents, and document intelligence in a single interface.",
    architecture: ["FastAPI asynchronous service layer with SSE streaming", "Next.js App Router with Vercel AI SDK & Tailwind", "ChromaDB vector database for semantic RAG", "Dockerized deployment with Ollama local model support"],
    features: ["Unified multi-model chat & code streaming", "Autonomous web agents with live browser execution", "Document intelligence & PDF knowledge extraction", "Built-in voice, procedural audio & prompt engineering studio"],
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
  },
  {
    id: "rebound",
    name: "Rebound",
    category: "Gamified EdTech / Cross-Platform",
    description:
      "Gamified student comeback platform turning academic recovery into an adventure with smart scheduling, procedural audio, and focus tracking.",
    longDescription:
      "Rebound is an offline-first academic recovery platform engineered to eliminate student burnout and exam anxiety. It mathematically redistributes overdue assignments into manageable 25-minute Pomodoro bursts, integrates an animated Study Buddy companion, synthesizes procedural ambient soundscapes via the Web Audio API with zero asset overhead, and provides cross-platform desktop/mobile support.",
    techStack: ["JavaScript", "HTML5", "CSS3", "Web Audio API", "Capacitor", "SQLite", "Supabase"],
    githubUrl: "https://github.com/Raj-max-pixal/Rebound",
    liveUrl: "https://rebound-max.vercel.app/",
    featured: true,
    accentColor: "#10b981",
    imageBannerUrl: "/projects/rebound.png",
    problem: "Overwhelmed students face crushing academic burnout and paralysis when deadlines pile up, with conventional planners increasing stress instead of relieving it.",
    solution: "Engineered a gamified comeback operating system that breaks overdue work into micro-missions, rewards progress with XP/streaks, and shields focus with ambient soundscapes.",
    architecture: ["Vanilla JS & HTML5/CSS3 offline-first core", "Web Audio API procedural sound engine", "Capacitor & Electron cross-platform packaging", "SQLite local cache with optional Supabase cloud sync"],
    features: ["Comeback Calculator for smart workload redistribution", "Procedural ambient soundscapes (Binaural, Rain, Lo-Fi)", "Interactive Study Buddy companion with animations", "Pomodoro micro-burst timer with streak tracking"],
  },
    {
    id: "healthmate",
    name: "HealthMate",
    category: "Smart Healthcare / Telehealth",
    description:
      "Patient-centric digital health portal combining symptom pre-screening, doctor appointment scheduling, mental wellness tools, and gamified health goals.",
    longDescription:
      "HealthMate is an intuitive healthcare management platform engineered during a rapid 6-hour hackathon to make health tracking, clinical triaging, and medical care accessible. It streamlines symptom assessment, simplifies doctor appointment management, provides guided mental health resources, and encourages preventive habits through milestone rewards.",
    techStack: ["JavaScript", "HTML5", "CSS3", "Responsive UI", "Vercel"],
    githubUrl: "https://github.com/Raj-max-pixal/Healthmate",
    liveUrl: "https://healthmate-five.vercel.app/",
    featured: true,
    accentColor: "#06b6d4",
    imageBannerUrl: "/projects/healthmate.png",
    problem: "Healthcare services are fragmented, appointment booking is often friction-heavy, and individuals lack a centralized, accessible way to triage symptoms and monitor daily wellness.",
    solution: "Engineered a rapid-access healthcare web application uniting intelligent symptom screening, doctor consultation booking, mindfulness resources, and personal wellness rewards into a unified interface.",
    architecture: ["Responsive vanilla JavaScript and semantic HTML5 core", "State-driven appointment and triage flow engine", "Local persistence and session-based health metric tracking", "Edge-optimized Vercel deployment for zero-latency access"],
    features: ["Interactive symptom pre-screening & guidance", "Doctor consultation booking & management", "Mental wellness & mindfulness practice hub", "Gamified health habit tracking & milestone badges"],
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
  },
];
