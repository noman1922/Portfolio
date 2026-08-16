"use client";

import Image from 'next/image';
import { ArrowUpRight, GitBranch } from "lucide-react";
import { motion } from "motion/react";
import { hoverLift } from "@/lib/animations";

type ProjectCardProps = {
  project: {
    title: string;
    description: string;
    tech: string[];
    image?: string;
    href?: string;
    github?: string;
    accent: string;
  };
  index: number;
};

const accentStyles = {
  orange: "from-[#f46c38] to-[#ffb088]",
  acid: "from-[#c5ff41] to-[#efffb0]",
  steel: "from-[#6a6b6e] to-[#d9d9dc]"
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const gradient = accentStyles[project.accent as keyof typeof accentStyles] ?? accentStyles.steel;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: index * 0.03 } }
      }}
      whileHover={hoverLift}
      className="group grid gap-5 border-t border-[#151312]/12 py-6 sm:grid-cols-[160px_1fr_auto] sm:items-center"
    >
      <div className={`relative aspect-[1.45/1] overflow-hidden rounded-lg bg-gradient-to-br ${gradient} p-3 shadow-xl shadow-black/10`}>
        {project.image ? (
          <div className="relative h-full w-full rounded-md border border-black/10 bg-[#151312]/90 p-3">
            <Image
              src={(function(s: string){
                if (!s) return s;
                if (/^https?:\/\//.test(s)) return s;
                const assetPrefix = (typeof window !== 'undefined' && (window as any).__NEXT_DATA__?.assetPrefix) || process.env.NEXT_PUBLIC_BASE_PATH || '';
                return `${assetPrefix}${s}`;
              })(project.image)}
              alt={project.title}
              fill
              sizes="160px"
              className="rounded-md object-cover"
              loading="lazy"
              unoptimized
            />
          </div>
        ) : (
          <div className="h-full rounded-md border border-black/10 bg-[#151312]/90 p-3 text-white">
            <div className="mb-3 flex gap-1">
              <span className="h-2 w-2 rounded-full bg-[#f46c38]" />
              <span className="h-2 w-2 rounded-full bg-[#c5ff41]" />
              <span className="h-2 w-2 rounded-full bg-white/50" />
            </div>
            <div className="h-3 w-2/3 rounded bg-white/80" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <span className="h-12 rounded bg-white/12" />
              <span className="h-12 rounded bg-white/18" />
              <span className="h-12 rounded bg-white/10" />
            </div>
          </div>
        )}
      </div>

      <div>
        <p className="text-xl font-black text-[#151312]">{project.title}</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#151312]/62">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full border border-[#151312]/12 px-3 py-1 text-[0.68rem] font-bold uppercase text-[#151312]/62">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 sm:flex-col">
        {project.href ? (
          <a href={project.href} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#151312] px-4 text-sm font-black text-white transition hover:bg-[#f46c38] focus:outline">
            View
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : null}

        {project.github ? (
          <a href={project.github} aria-label={`${project.title} GitHub`} className="grid h-11 w-11 place-items-center rounded-full border border-[#151312]/12 text-[#151312] transition hover:bg-[#151312] hover:text-white focus:outline">
            <GitBranch className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
