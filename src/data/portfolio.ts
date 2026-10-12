import {
  Briefcase,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Palette,
  Server,
  TerminalSquare
} from "lucide-react";
import { Facebook, Github, Linkedin, Mail } from "@/components/SocialIcons";
import projectsData from "./projects.json";
import certificationsData from "./certifications.json";

export type Project = {
  id?: string;
  title: string;
  description: string;
  specs?: string;
  tech: string[];
  image?: string;
  accent: string;
  featured: boolean;
  liveUrl: string | null;
  githubUrl: string | null;
  credentialUrl?: string | null;
  href?: string;
  github?: string;
};

export type Certification = {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string | null;
  credentialUrl: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  skills?: string[];
  image?: string;
};

export const profile = {
  name: "Md. Abdullah Al Noman Khan",
  displayName: "Noman",
  profileImage: "/images/profile.jpg",
  role: "Full-Stack Web Developer",
  secondaryRole: "CSE @ IUBAT",
  education: {
    institution: "IUBAT",
    degree: "Bachelor of Computer Science & Engineering",
    date: "2023 - Present",
    note: "Final-year CSE student"
  },
  bio: "I build modern web applications, management systems and digital products with a focus on clean UI, useful features and reliable backend systems.",
  heroCopy: "Final-year CSE student building full-stack web applications, business management systems, and digital products.",
  tagline: "CSE student. Full-stack developer. Product builder.",
  availability: "Available for freelance & collaboration",
  email: "mdnomanahamed22@gmail.com"
};

// Socials order: LinkedIn, GitHub, Facebook, Mail
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-abdullah-al-noman-khan/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/noman1922", icon: Github },
  { label: "Facebook", href: "https://www.facebook.com/md.noman.blz/", icon: Facebook },
  { label: "Mail", href: `mailto:${profile.email}`, icon: Mail }
];

export const navItems = [
  { label: "Home", href: "/#home", icon: Code2 },
  { label: "Projects", href: "/#projects", icon: Layers3 },
  { label: "Experience", href: "/#experience", icon: Briefcase },
  { label: "Tools", href: "/#tools", icon: TerminalSquare },
  { label: "Certifications", href: "/#certifications", icon: Layers3 },
  { label: "Contact", href: "/#contact", icon: Mail }
];

export const stats = [
  { value: "3+", label: "YEARS BUILDING" },
  { value: "6", label: "FEATURED PROJECTS" },
  { value: "2", label: "LEADERSHIP ROLES" }
];

// Product / Engineering cards
export const highlights = [
  {
    title: "PRODUCT ENGINEERING",
    description: "Planning, UI/UX architecture, backend logic, testing, and delivery for production-ready systems.",
    tone: "orange"
  },
  {
    title: "FULL-STACK SYSTEMS",
    description: "Authentication, dashboards, POS workflows, REST APIs, databases, and payment integration.",
    tone: "acid"
  },
  {
    title: "DEVOPS & CLOUD",
    description: "CI/CD pipelines, Git/GitHub workflows, Vercel & Render hosting, Docker, and environment configuration.",
    tone: "steel"
  },
  {
    title: "DATABASE & APIS",
    description: "Relational & NoSQL schema design (PostgreSQL, MongoDB), secure RESTful endpoints, and query optimization.",
    tone: "dark"
  }
];

// Read from JSON files
export const projects: Project[] = projectsData as Project[];

export const experience = [
  {
    organization: "ENKRYX",
    position: "Co-Founder, Product & Engineering",
    date: "Present",
    description: "Working across product direction, full-stack delivery, UI/UX, team coordination, and client projects.",
    skills: ["Product development", "Full-stack development", "Team coordination", "UI/UX", "Client projects"]
  },
  {
    organization: "CODETREE",
    position: "IT Executive / Intern",
    date: "Recent",
    description: "Supported IT operations, web-related tasks, technical problem solving, and business/technical coordination.",
    skills: ["IT support", "Web tasks", "Technical problem solving", "Coordination"]
  }
];

export const leadership = [
  {
    title: "ENKRYX Youth Development Program",
    description: "Organized and guided students through programming, networking, web development, SQL, React, GitHub, and client-hunting sessions."
  }
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "Laravel", "PHP", "ASP.NET Core", "REST APIs"]
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Supabase"]
  },
  {
    title: "DevOps & Delivery",
    icon: Palette,
    skills: ["Git", "GitHub", "Vercel", "Render", "Docker", "Postman", "CI/CD basics"]
  }
];

export const tools = [
  {
    category: "FRONTEND",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap"
    ]
  },
  {
    category: "BACKEND",
    items: ["Node.js", "Express.js", "Laravel", "PHP", "ASP.NET Core", "REST APIs"]
  },
  {
    category: "DATABASE",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Supabase"]
  },
  {
    category: "DEVOPS & DELIVERY",
    items: ["Git", "GitHub", "Vercel", "Render", "Docker", "Postman", "Environment Variables", "API Deployment", "Database Deployment", "CI/CD basics"]
  },
  {
    category: "DESIGN",
    items: ["Figma", "Canva"]
  }
];

// Read from JSON files
export const certifications: Certification[] = certificationsData as Certification[];

export const education = {
  icon: GraduationCap,
  title: profile.education.institution,
  subtitle: profile.education.degree,
  date: profile.education.date
};
