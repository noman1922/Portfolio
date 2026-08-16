"use client";

import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: false });
const Tools = dynamic(() => import("@/components/Tools"), { ssr: false });
const Certifications = dynamic(() => import("@/components/Certifications"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });

export default function DeferredComponents() {
  return (
    <>
      <Projects />
      <Experience />
      <Tools />
      <Certifications />
      <About />
      <Contact />
    </>
  );
}
