"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import AnimatedSection from "@/components/AnimatedSection";
import { profile } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function About() {
  return (
    <AnimatedSection className="section-shell py-20 sm:py-28" variants={staggerContainer}>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-end">
        <motion.div variants={fadeUp}>
          <p className="eyebrow mb-4">About</p>
          <h2 className="display-heading">
            NOMAN
            <span className="ghost-word">BUILDS</span>
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="premium-card rounded-lg p-6 sm:p-8">
          <p className="text-xl font-bold leading-8 text-white/86">{profile.bio}</p>
          <p className="mt-4 text-sm text-white/70">{profile.tagline}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a href="#projects" className="inline-flex flex-col items-start justify-between rounded-lg border border-white/10 p-4 text-sm font-black transition hover:border-[#c5ff41] hover:text-[#c5ff41] focus:outline">
              <span className="text-xs font-bold uppercase">WEB APPLICATIONS</span>
              <span className="mt-2 text-sm">Modern responsive interfaces and full-stack applications.</span>
              <ArrowRight className="mt-3 h-4 w-4" />
            </a>
            <a href="#projects" className="inline-flex flex-col items-start justify-between rounded-lg border border-white/10 p-4 text-sm font-black transition hover:border-[#f46c38] hover:text-[#f46c38] focus:outline">
              <span className="text-xs font-bold uppercase">BUSINESS SYSTEMS</span>
              <span className="mt-2 text-sm">POS, dashboards, inventory, authentication and role-based workflows.</span>
              <ArrowRight className="mt-3 h-4 w-4" />
            </a>
            <a href="#experience" className="inline-flex flex-col items-start justify-between rounded-lg border border-white/10 p-4 text-sm font-black transition hover:border-[#6a6b6e] hover:text-[#6a6b6e] focus:outline">
              <span className="text-xs font-bold uppercase">PRODUCT ENGINEERING</span>
              <span className="mt-2 text-sm">From planning and UI to backend logic, deployment and production handoff.</span>
              <ArrowRight className="mt-3 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
