import { projects } from "./projects";
import { skillCategories } from "./skills";

// Dynamically compute unique technology count across skills and project tech stacks
const uniqueTechNames = new Set([
  ...skillCategories.flatMap((cat) => cat.skills.map((s) => s.name.trim().toLowerCase())),
  ...projects.flatMap((p) => (p.techStack || []).map((t) => t.trim().toLowerCase())),
]);

export const PORTFOLIO_STATS = [
  {
    value: Math.max(30, projects.length),
    suffix: "+",
    label: "Repositories",
    sublabel: "& Open Source Projects",
  },
  {
    value: 10,
    suffix: "+",
    label: "Hackathons",
    sublabel: "Competitions & Sprints",
  },
  {
    value: uniqueTechNames.size,
    suffix: "+",
    label: "Technologies",
    sublabel: "Tools & Frameworks",
  },
  {
    value: 5,
    suffix: "",
    label: "Certifications",
    sublabel: "Verified Credentials",
  },
];


