import {
  Briefcase,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Link2,
  GraduationCap,
  Layers3,
  Mail,
  Palette,
  Server,
  TerminalSquare
} from "lucide-react";

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
// Socials order MUST be: LinkedIn, GitHub, Facebook, Mail
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-abdullah-al-noman-khan/", icon: Link2 },
  { label: "GitHub", href: "https://github.com/noman1922", icon: GitBranch },
  { label: "Facebook", href: "https://www.facebook.com/md.noman.blz/", icon: Globe2 },
  { label: "Mail", href: `mailto:${profile.email}`, icon: Mail }
];

export const navItems = [
  { label: "Home", href: "#home", icon: Code2 },
  { label: "Projects", href: "#projects", icon: Layers3 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Tools", href: "#tools", icon: TerminalSquare },
  { label: "Certifications", href: "#certifications", icon: Link2 },
  { label: "Contact", href: "#contact", icon: Mail }
];

export const stats = [
  { value: "3+", label: "YEARS BUILDING" },
  { value: "6", label: "FEATURED PROJECTS" },
  { value: "2", label: "LEADERSHIP ROLES" }
];

// Product / Engineering cards (replaces previous highlights)
export const highlights = [
  {
    title: "PRODUCT ENGINEERING",
    description: "Planning, interface design, backend logic, deployment, testing, and handoff for client-ready digital systems.",
    tone: "orange"
  },
  {
    title: "FULL-STACK SYSTEMS",
    description: "Authentication, dashboards, POS workflows, REST APIs, databases, payment integration, and role-based business systems.",
    tone: "acid"
  },
  {
    title: "DEVOPS & DELIVERY",
    description: "Deployment, Git/GitHub workflows, environment configuration, API testing, database hosting, production troubleshooting, and performance optimization.",
    tone: "steel"
  }
];

// Put project images in public/images/projects/
export const projects = [
  {
    title: "ENKRYX",
    description: "A software solutions initiative focused on modern web platforms, business systems, automation, and custom digital products.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/enkryx.jpg",
    accent: "orange"
  },
  {
    title: "TH TRADE CORPORATION",
    description: "Stock Management System covering authentication, inventory, POS, invoices, customer dues, and role-based workflows.",
    tech: ["Laravel", "PHP", "PostgreSQL", "Bootstrap"],
        image: "/images/projects/th-trade.jpg",
    accent: "acid"
  },
  {
    title: "TICKET MANAGEMENT SYSTEM",
    description: "Full-stack ticket management platform with authentication, REST APIs, database integration, and payment functionality.",
    tech: ["ASP.NET Core Web API", "MongoDB", "Stripe"],
        image: "/images/projects/ticket-management.jpg",
    accent: "steel"
  },
  {
    title: "ECOMSTACK",
    description: "Full-stack e-commerce and POS platform for product, order, payment, and sales management.",
    tech: ["React", "Node.js", "Stripe"],
        image: "/images/projects/ecomstack.jpg",
    accent: "orange"
  },
  {
    title: "HIKMA ABROAD",
    description: "Backend API supporting education and abroad-service workflows with database-driven operations.",
    tech: ["ASP.NET Core", "PostgreSQL"],
        image: "/images/projects/hikma-abroad.jpg",
    accent: "acid"
  },
  {
    title: "SMART HOSPITAL SYSTEM",
    description: "Hospital management system designed around patient, staff, records, and operational workflows.",
    tech: ["Web development", "Database systems"],
        image: "/images/projects/smart-hospital.jpg",
    accent: "steel"
  }
];

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
  },
  
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

// Tools sections used by UI (keeps visual card layout)
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

// Add verified LinkedIn/certificate information here.
// Do not invent certificate names.
// Put certificate images (optional) in public/images/certifications/
export const certifications = [
  {
    title: "NASA International Space Apps Challenge 2025 – 1st Runners-Up (Dhaka Region)",
    issuer: "NASA International Space Apps Challenge",
    date: "Oct 2025",
    skills: ["Artificial Intelligence (AI)", "Content Strategy"],
    image: "/images/certifications/nasa-runners-up.jpg"
  },
  {
    title: "Galactic Problem Solver",
    issuer: "NASA International Space Apps Challenge",
    date: "Oct 2025",
    image: "/images/certifications/galactic-problem-solver.jpg"
  },
  {
    title: "Email Marketing. Increase Sales with Email Marketing!",
    issuer: "Udemy",
    date: "Feb 2025",
    credentialId: "UC-a9e65966-1300-48bb-ae26-335e8ded581a",
    image: "/images/certifications/email-marketing.jpg"
  },
  {
    title: "AI-Powered Email Marketing: A Complete Guide",
    issuer: "Udemy",
    date: "Feb 2025",
    skills: ["Email Marketing", "Newsletters"],
    image: "/images/certifications/ai-email-marketing.jpg"
  },
  {
    title: "Mastering Short Article Writing: A Workshop for Aspiring Writers",
    issuer: "Campus Radio",
    date: "Dec 2024",
    skills: ["Creative Writing", "Article Writing"],
    image: "/images/certifications/short-article-writing.jpg"
  },
  {
    title: "Fundamentals of Machine Learning",
    issuer: "Microsoft",
    date: "Nov 2024",
    skills: ["Machine Learning", "Artificial Intelligence (AI)"],
    image: "/images/certifications/microsoft-ml.jpg"
  },
  {
    title: "Fundamentals of Azure AI Services",
    issuer: "Microsoft",
    date: "Nov 2024",
    skills: ["Microsoft Azure", "Artificial Intelligence (AI)"],
    image: "/images/certifications/azure-ai.jpg"
  },
  {
    title: "Fundamentals of Generative AI",
    issuer: "Microsoft",
    date: "Nov 2024",
    skills: ["Generative AI", "Artificial Intelligence (AI)"],
    image: "/images/certifications/generative-ai.jpg"
  }
];

export const education = {
  icon: GraduationCap,
  title: profile.education.institution,
  subtitle: profile.education.degree,
  date: profile.education.date
};
