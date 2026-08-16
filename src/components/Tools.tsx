"use client";

import { motion } from "motion/react";
import AnimatedSection from "@/components/AnimatedSection";
import { skillGroups, tools as toolsData } from "@/data/portfolio";
import { fadeUp, hoverLift, staggerContainer } from "@/lib/animations";

export default function Tools() {
  return (
    <AnimatedSection id="tools" className="section-shell py-20 sm:py-28" variants={staggerContainer}>
      <motion.div variants={fadeUp} className="mb-12">
        <p className="eyebrow mb-4">Tools</p>
        <h2 className="display-heading">
          Premium
          <span className="ghost-word">Tools</span>
        </h2>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <motion.article key={group.title} variants={fadeUp} whileHover={hoverLift} className="premium-card rounded-lg p-5">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#151312]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-white/7 px-3 py-1 text-[0.68rem] font-bold uppercase text-white/58">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] py-4">
        <div className="flex w-max animate-[marquee_24s_linear_infinite] gap-3 px-4">
          {(() => {
            function isStringArray(v: unknown): v is string[] {
              return Array.isArray(v) && (v as unknown[]).every((i) => typeof i === "string");
            }
            const flat: string[] = isStringArray(toolsData) ? (toolsData as string[]) : (toolsData as { items: string[] }[]).flatMap((t) => t.items || []);
            return [...flat, ...flat].map((tool, index) => (
              <span key={`${tool}-${index}`} className="rounded-full border border-white/10 bg-[#151312] px-5 py-3 text-sm font-black text-white/78">
                {tool}
              </span>
            ));
          })()}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
