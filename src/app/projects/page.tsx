"use client";

import Link from "next/link";
import { ArrowLeft, Layers3 } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-24 sm:pt-36 sm:pb-32">
        <div className="section-shell">
          {/* Top Breadcrumb & Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/80 transition hover:border-[#f46c38] hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Home
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#c5ff41]">
                <Layers3 className="h-3.5 w-3.5" />
                <span>{projects.length} Total Projects</span>
              </div>
            </div>

            <p className="eyebrow mb-3">Portfolio Archives</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              ALL PROJECTS
              <span className="ghost-word">& SYSTEMS</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/60">
              A comprehensive archive of full-stack web applications, business management platforms, custom software solutions, and production architecture.
            </p>
          </motion.div>

          {/* Full List of Projects - Responsive 2-Column Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
