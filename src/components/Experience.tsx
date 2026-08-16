"use client";

import { ArrowUpRight, CircleDot } from "lucide-react";
import { motion } from "motion/react";
import AnimatedSection from "@/components/AnimatedSection";
import { education, experience } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Experience() {
  const EducationIcon = education.icon;

  return (
    <AnimatedSection id="experience" className="section-shell py-20 sm:py-28" variants={staggerContainer}>
      <motion.div variants={fadeUp} className="mb-12">
        <p className="eyebrow mb-4">Experience</p>
        <h2 className="display-heading">
          Work
          <span className="ghost-word">Timeline</span>
        </h2>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-[1fr_0.52fr]">
        <motion.div variants={staggerContainer} className="space-y-5">
          {experience.map((item) => (
            <motion.article
              key={item.organization}
              variants={fadeUp}
              className="group relative border-t border-white/12 py-7"
            >
              <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-3">
                    <CircleDot className="h-5 w-5 text-[#f46c38]" />
                    <p className="text-2xl font-black">{item.organization}</p>
                  </div>
                  <p className="mt-2 text-lg font-bold text-white/76">{item.position}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-white/52">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase text-white/54">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 sm:flex-col sm:items-end">
                  <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-white/62">{item.date}</span>
                  <ArrowUpRight className="h-5 w-5 text-[#f46c38] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.aside variants={fadeUp} className="premium-card h-fit rounded-lg p-6">
          <EducationIcon className="mb-7 h-8 w-8 text-[#c5ff41]" />
          <p className="eyebrow mb-3">Education</p>
          <h3 className="text-2xl font-black">{education.title}</h3>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/58">{education.subtitle}</p>
          <p className="mt-6 text-sm font-black text-[#f46c38]">{education.date}</p>
        </motion.aside>
      </div>
    </AnimatedSection>
  );
}
