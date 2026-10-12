"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <AnimatedSection id="projects" className="light-band py-20 sm:py-28" variants={staggerContainer}>
      <div className="section-shell">
        <motion.div
          variants={fadeUp}
          className="mb-10 sm:mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#f46c38] mb-2 sm:mb-3">
              Selected Works
            </p>
            <h2 className="display-heading text-[#151312]">
              Recent
              <span className="ghost-word !text-[#151312]/12">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-semibold leading-relaxed text-[#151312]/65">
            Practical full-stack systems, business platforms, and product engineering initiatives built for reliability and scale.
          </p>
        </motion.div>

        {/* 3 Featured Projects */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        {/* Primary CTA: View All Projects */}
        <motion.div variants={fadeUp} className="mt-12 sm:mt-16 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#151312] px-8 py-4 text-sm font-black text-white shadow-xl shadow-black/15 transition-all duration-300 hover:bg-[#f46c38] hover:scale-105 active:scale-95 focus:outline"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
