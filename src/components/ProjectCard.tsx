"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, GitBranch, Layers, Sparkles, X } from "lucide-react";
import assetPath from "@/lib/assetPath";
import { AnimatePresence, motion } from "motion/react";
import { hoverLift } from "@/lib/animations";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const accentStyles = {
  orange: "from-[#f46c38] to-[#ffb088]",
  acid: "from-[#c5ff41] to-[#efffb0]",
  steel: "from-[#6a6b6e] to-[#d9d9dc]"
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const gradient = accentStyles[project.accent as keyof typeof accentStyles] ?? accentStyles.steel;

  const liveHref = project.liveUrl || project.href;
  const githubHref = project.githubUrl || project.github;

  return (
    <>
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, delay: index * 0.05 }
          }
        }}
        whileHover={hoverLift}
        className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#151312]/10 bg-white/90 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-[#151312]/20 hover:bg-white transition-all duration-300 w-full"
      >
        <div>
          {/* Project Visual Banner */}
          <div
            className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-2.5 shadow-inner mb-5`}
          >
            {project.image ? (
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#151312]/90 shadow-md">
                <Image
                  src={assetPath(project.image)}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between rounded-lg border border-black/10 bg-[#151312]/90 p-4 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#f46c38]" />
                    <span className="h-2 w-2 rounded-full bg-[#c5ff41]" />
                    <span className="h-2 w-2 rounded-full bg-white/40" />
                  </div>
                  <span className="text-[0.65rem] font-mono text-white/50 uppercase tracking-widest">
                    Preview
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-3/4 rounded bg-white/80" />
                  <div className="h-2 w-1/2 rounded bg-white/30" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="h-8 rounded bg-white/10" />
                  <span className="h-8 rounded bg-white/15" />
                  <span className="h-8 rounded bg-white/10" />
                </div>
              </div>
            )}
          </div>

          {/* Project Header & Description */}
          <h3 className="text-xl sm:text-2xl font-black text-[#151312] tracking-tight group-hover:text-[#f46c38] transition-colors">
            {project.title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#151312]/70">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#151312]/10 bg-[#151312]/[0.04] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-[#151312]/75"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action / Status Footer */}
        <div className="mt-6 pt-4 border-t border-[#151312]/8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {liveHref ? (
              <a
                href={liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#151312] px-4 text-xs font-black text-white transition hover:bg-[#f46c38] focus:outline shadow-sm active:scale-95"
              >
                Live Demo
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#f46c38] px-4 text-xs font-black text-white transition hover:bg-[#ff7b4b] focus:outline shadow-sm active:scale-95"
              >
                Project Specs
                <Sparkles className="h-3.5 w-3.5" />
              </button>
            )}

            {githubHref && (
              <a
                href={githubHref}
                aria-label={`${project.title} GitHub`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#151312]/15 bg-white px-3 text-xs font-bold text-[#151312] transition hover:bg-[#151312] hover:text-white focus:outline active:scale-95"
              >
                <GitBranch className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
          </div>

          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#151312]/40">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.article>

      {/* Project Specs Interactive Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#181514] p-6 text-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f46c38]/20 px-3 py-1 text-[0.68rem] font-black uppercase tracking-wider text-[#f46c38]">
                  <Layers className="h-3 w-3" /> System Specs
                </span>
                <span className="text-xs font-bold text-white/50">
                  Case Study Details
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mt-1">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {project.description}
              </p>

              {/* Technical Specifications */}
              <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs">
                <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/8">
                  <span className="text-white/50 font-bold uppercase tracking-wider">Architecture</span>
                  <span className="text-white font-semibold text-right">{project.specs || "Production Modular Service"}</span>
                </div>
                <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/8">
                  <span className="text-white/50 font-bold uppercase tracking-wider">Core Technologies</span>
                  <span className="text-white font-semibold text-right">{project.tech.join(", ")}</span>
                </div>
                <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/8">
                  <span className="text-white/50 font-bold uppercase tracking-wider">Status</span>
                  <span className="inline-flex items-center gap-1 text-[#c5ff41] font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Deployed & Internal System
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-white/50 font-bold uppercase tracking-wider">Repository</span>
                  <span className="text-white/80 font-mono">
                    {githubHref ? "Available on GitHub" : "Private Client Codebase"}
                  </span>
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3">
                {githubHref && (
                  <a
                    href={githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition"
                  >
                    <GitBranch className="h-3.5 w-3.5" /> View GitHub Repo
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full bg-white px-5 py-2.5 text-xs font-black text-[#151312] hover:bg-[#c5ff41] transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
