"use client";

import { motion } from "motion/react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Projects() {
  return (
    <AnimatedSection id="projects" className="light-band py-20 sm:py-28" variants={staggerContainer}>
      <div className="section-shell">
        <motion.div variants={fadeUp} className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="display-heading text-[#151312]">
            Recent
            <span className="ghost-word !text-[#151312]/12">Projects</span>
          </h2>
          <p className="max-w-sm text-sm font-semibold leading-6 text-[#151312]/58">
            Practical systems and product work, presented with clean previews until real project media is added.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
