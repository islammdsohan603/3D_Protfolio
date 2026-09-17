import { ElementType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiHeroui,
  SiDaisyui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiZod,
  SiStripe,
  SiVercel,
  SiNetlify,
  SiGit,
  SiGithub,
  SiDocker,
  SiSocketdotio,
  SiAnthropic,
  SiFramer,
  SiPostman,
} from "react-icons/si";
import { Cpu, Terminal, Radio } from "lucide-react";

export type TechCategoryType = "all" | "frontend" | "backend" | "devops" | "frontier";

export type ProficiencyTier =
  | "Mastered Engine"
  | "Production Hardened"
  | "Core Architecture"
  | "Active Radar / Lab";

export type StatusTag =
  | "Production Ready"
  | "Core Engine"
  | "Enterprise Standard"
  | "Actively Leveling Up"
  | "Realtime Pipeline";

export interface TechItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "devops" | "frontier";
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  brandColor: string;
  proficiency: number;
  proficiencyTier: ProficiencyTier;
  statusTag: StatusTag;
  typicalUseCase: string;
  featured?: boolean;
  bentoSpan?: string; // e.g. "col-span-1 md:col-span-2"
}

export interface CategoryFilter {
  id: TechCategoryType;
  label: string;
  iconName: string;
  count: number;
}

export const TECH_ITEMS: TechItem[] = [
  // 1. FRONTEND ARCHITECTURE & DESIGN SYSTEMS
  {
    id: "react",
    name: "React.js 19",
    category: "frontend",
    icon: SiReact,
    brandColor: "#61DAFB",
    proficiency: 95,
    proficiencyTier: "Mastered Engine",
    statusTag: "Core Engine",
    typicalUseCase: "Component composition, Hooks pattern, Concurrent Rendering, and virtual DOM state management.",
    featured: true,
    bentoSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    id: "nextjs",
    name: "Next.js (App Router)",
    category: "frontend",
    icon: SiNextdotjs,
    brandColor: "#38BDF8",
    proficiency: 94,
    proficiencyTier: "Production Hardened",
    statusTag: "Production Ready",
    typicalUseCase: "Server Components (RSC), SSR/SSG pre-rendering, Turbopack, and automated route handlers.",
    featured: true,
    bentoSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    icon: SiTypescript,
    brandColor: "#3178C6",
    proficiency: 92,
    proficiencyTier: "Production Hardened",
    statusTag: "Enterprise Standard",
    typicalUseCase: "Strict type checking, generics, custom interfaces, and runtime safety across full-stack repositories.",
    featured: true,
    bentoSpan: "col-span-1",
  },
  {
    id: "javascript",
    name: "JavaScript ES6+",
    category: "frontend",
    icon: SiJavascript,
    brandColor: "#F7DF1E",
    proficiency: 96,
    proficiencyTier: "Mastered Engine",
    statusTag: "Core Engine",
    typicalUseCase: "Asynchronous execution loops, Promises, Event Emitters, and ESNext modern syntax.",
    bentoSpan: "col-span-1",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS v4",
    category: "frontend",
    icon: SiTailwindcss,
    brandColor: "#06B6D4",
    proficiency: 95,
    proficiencyTier: "Mastered Engine",
    statusTag: "Production Ready",
    typicalUseCase: "Utility-first design systems, custom dark modes, glassmorphism UI tokens, and container queries.",
    bentoSpan: "col-span-1",
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "frontend",
    icon: SiFramer,
    brandColor: "#E11D48",
    proficiency: 90,
    proficiencyTier: "Production Hardened",
    statusTag: "Production Ready",
    typicalUseCase: "Complex layout animations, gesture physics, layoutId transitions, and scroll-driven interactions.",
    bentoSpan: "col-span-1",
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    category: "frontend",
    icon: SiShadcnui,
    brandColor: "#F4F4F5",
    proficiency: 92,
    proficiencyTier: "Production Hardened",
    statusTag: "Enterprise Standard",
    typicalUseCase: "Accessible Radix UI primitive abstractions with Tailwind customized design tokens.",
    bentoSpan: "col-span-1",
  },
  {
    id: "heroui",
    name: "HeroUI (NextUI)",
    category: "frontend",
    icon: SiHeroui,
    brandColor: "#EC4899",
    proficiency: 88,
    proficiencyTier: "Production Hardened",
    statusTag: "Production Ready",
    typicalUseCase: "Polished modern component systems with built-in dark glass aesthetics and smooth ripple effects.",
    bentoSpan: "col-span-1",
  },
  {
    id: "daisyui",
    name: "DaisyUI",
    category: "frontend",
    icon: SiDaisyui,
    brandColor: "#5A0EF8",
    proficiency: 90,
    proficiencyTier: "Production Hardened",
    statusTag: "Production Ready",
    typicalUseCase: "Semantic component class utilities for rapid UI prototyping and multi-theme management.",
    bentoSpan: "col-span-1",
  },

  // 2. BACKEND ENGINES & DATABASE SYSTEMS
  {
    id: "nodejs",
    name: "Node.js Engine",
    category: "backend",
    icon: SiNodedotjs,
    brandColor: "#5FA04E",
    proficiency: 91,
    proficiencyTier: "Production Hardened",
    statusTag: "Core Engine",
    typicalUseCase: "Event-driven asynchronous backend services, HTTP server modules, and stream processing.",
    featured: true,
    bentoSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    icon: SiExpress,
    brandColor: "#E2E8F0",
    proficiency: 92,
    proficiencyTier: "Production Hardened",
    statusTag: "Enterprise Standard",
    typicalUseCase: "RESTful routing, custom middleware pipelines, CORS enforcement, and error payload formatting.",
    bentoSpan: "col-span-1",
  },
  {
    id: "mongodb",
    name: "MongoDB Atlas",
    category: "backend",
    icon: SiMongodb,
    brandColor: "#47A248",
    proficiency: 89,
    proficiencyTier: "Production Hardened",
    statusTag: "Production Ready",
    typicalUseCase: "NoSQL document store, index optimization, aggregation pipelines, and replica sets.",
    featured: true,
    bentoSpan: "col-span-1",
  },
  {
    id: "mongoose",
    name: "Mongoose ODM",
    category: "backend",
    icon: SiMongoose,
    brandColor: "#880000",
    proficiency: 90,
    proficiencyTier: "Production Hardened",
    statusTag: "Core Engine",
    typicalUseCase: "Document schema modeling, validation hooks, population references, and virtual properties.",
    bentoSpan: "col-span-1",
  },
  {
    id: "zod",
    name: "Zod Validation",
    category: "backend",
    icon: SiZod,
    brandColor: "#3E8E41",
    proficiency: 92,
    proficiencyTier: "Production Hardened",
    statusTag: "Enterprise Standard",
    typicalUseCase: "Type-safe runtime schema parsing, request payload validation, and environment variable parsing.",
    bentoSpan: "col-span-1",
  },
  {
    id: "stripe",
    name: "Stripe API Integration",
    category: "backend",
    icon: SiStripe,
    brandColor: "#635BFF",
    proficiency: 86,
    proficiencyTier: "Production Hardened",
    statusTag: "Production Ready",
    typicalUseCase: "Secure payment gateway checkout, webhook event verification, and subscription workflows.",
    bentoSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
  },

  // 3. CLOUD INFRASTRUCTURE & DEVOPS
  {
    id: "vercel",
    name: "Vercel Platform",
    category: "devops",
    icon: SiVercel,
    brandColor: "#FFFFFF",
    proficiency: 95,
    proficiencyTier: "Mastered Engine",
    statusTag: "Production Ready",
    typicalUseCase: "Edge Network deployment, Serverless functions, instant preview environments, and domain routing.",
    bentoSpan: "col-span-1",
  },
  {
    id: "netlify",
    name: "Netlify",
    category: "devops",
    icon: SiNetlify,
    brandColor: "#00C7B7",
    proficiency: 88,
    proficiencyTier: "Production Hardened",
    statusTag: "Production Ready",
    typicalUseCase: "Static site hosting, automated CI/CD builds, form handling, and split testing.",
    bentoSpan: "col-span-1",
  },
  {
    id: "git",
    name: "Git VCS",
    category: "devops",
    icon: SiGit,
    brandColor: "#F05032",
    proficiency: 93,
    proficiencyTier: "Mastered Engine",
    statusTag: "Core Engine",
    typicalUseCase: "Distributed version control, branch strategies, interactive rebasing, and cherry-picking.",
    bentoSpan: "col-span-1",
  },
  {
    id: "github",
    name: "GitHub Ecosystem",
    category: "devops",
    icon: SiGithub,
    brandColor: "#F0F6FC",
    proficiency: 94,
    proficiencyTier: "Mastered Engine",
    statusTag: "Enterprise Standard",
    typicalUseCase: "Collaborative code review, PR automation, issue tracking, and repository security.",
    bentoSpan: "col-span-1",
  },
  {
    id: "postman",
    name: "Postman API Studio",
    category: "devops",
    icon: SiPostman,
    brandColor: "#FF6C37",
    proficiency: 90,
    proficiencyTier: "Production Hardened",
    statusTag: "Production Ready",
    typicalUseCase: "API collection testing, environment variable suites, mock servers, and automated runner scripts.",
    bentoSpan: "col-span-1",
  },

  // 4. ACTIVE FRONTIER / CONTINUOUS LEARNING RADAR
  {
    id: "docker",
    name: "Docker Containerization",
    category: "frontier",
    icon: SiDocker,
    brandColor: "#2496ED",
    proficiency: 78,
    proficiencyTier: "Active Radar / Lab",
    statusTag: "Actively Leveling Up",
    typicalUseCase: "Dockerfile creation, multi-stage container builds, and local service orchestration.",
    featured: true,
    bentoSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    id: "websockets",
    name: "WebSockets & Realtime WS",
    category: "frontier",
    icon: SiSocketdotio,
    brandColor: "#00F2FE",
    proficiency: 82,
    proficiencyTier: "Active Radar / Lab",
    statusTag: "Realtime Pipeline",
    typicalUseCase: "Bi-directional event sockets, live chat channels, and instant broadcast telemetry.",
    featured: true,
    bentoSpan: "col-span-1",
  },
  {
    id: "ai-augmented",
    name: "AI-Augmented Engineering",
    category: "frontier",
    icon: SiAnthropic,
    brandColor: "#A855F7",
    proficiency: 94,
    proficiencyTier: "Mastered Engine",
    statusTag: "Core Engine",
    typicalUseCase: "Cursor agentic coding, custom LLM prompt engineering, automated code refactoring, and test synthesis.",
    featured: true,
    bentoSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
];
