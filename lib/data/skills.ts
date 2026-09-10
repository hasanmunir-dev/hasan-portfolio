/**
 * Skill matrix — shared by the homepage SkillsSection and the /skills page.
 */

export interface Skill {
  name: string;
  level: number;
  cat: SkillCategory;
}

export const CATS = ["All", "Frontend", "Backend", "Database", "DevOps"] as const;
export type Cat = (typeof CATS)[number];
export type SkillCategory = Exclude<Cat, "All">;

export const SKILLS: Skill[] = [
  { name: "React",        level: 95, cat: "Frontend" },
  { name: "Next.js",      level: 90, cat: "Frontend" },
  { name: "TypeScript",   level: 90, cat: "Frontend" },
  { name: "Tailwind CSS", level: 85, cat: "Frontend" },
  { name: "Node.js",      level: 92, cat: "Backend" },
  { name: "Express",      level: 90, cat: "Backend" },
  { name: "FastAPI",      level: 85, cat: "Backend" },
  { name: "Python",       level: 85, cat: "Backend" },
  { name: "REST APIs",    level: 88, cat: "Backend" },
  { name: "MongoDB",      level: 88, cat: "Database" },
  { name: "PostgreSQL",   level: 83, cat: "Database" },
  { name: "VPS Deployment",            level: 82, cat: "DevOps" },
  { name: "Environment Configuration", level: 85, cat: "DevOps" },
  { name: "Nginx",                     level: 75, cat: "DevOps" },
  { name: "CI/CD Pipelines",           level: 72, cat: "DevOps" },
];
