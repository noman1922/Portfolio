"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, viewport } from "@/lib/animations";

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  variants?: Variants;
};

export default function AnimatedSection({
  id,
  className,
  children,
  variants = fadeUp
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.section>
  );
}
