"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import AnimatedSection from "@/components/AnimatedSection";
import { certifications, type Certification } from "@/data/portfolio";
import assetPath from "@/lib/assetPath";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function CertificateCard({ cert }: { cert: Certification }) {
  const isFeatured =
    cert.title && cert.title.includes("NASA International Space Apps Challenge 2025");

  return (
    <motion.div
      variants={fadeUp}
      className={`group flex flex-col justify-between rounded-xl border p-5 sm:p-6 text-white/95 transition-all duration-300 ${
        isFeatured
          ? "border-yellow-400/80 bg-gradient-to-b from-yellow-400/[0.08] to-white/[0.03] shadow-[0_8px_30px_rgba(245,205,68,0.12)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
      }`}
    >
      <div>
        <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-black/20">
          {cert.image ? (
            <div className="relative h-44 sm:h-48 md:h-52 w-full flex items-center justify-center p-2">
              <Image
                src={assetPath(cert.image)}
                alt={cert.title}
                fill
                className="object-contain p-2"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex h-44 sm:h-48 md:h-52 w-full items-center justify-center rounded-lg bg-white/5 text-xs text-white/50">
              No preview available
            </div>
          )}

          {isFeatured && (
            <div className="absolute top-3 left-3 rounded-full bg-yellow-400 px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-wider text-[#151312] shadow-md">
              Featured Award
            </div>
          )}
        </div>

        <p className="mb-2 text-sm sm:text-base font-black leading-snug text-white transition-colors group-hover:text-[#c5ff41]">
          {cert.title}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/8 w-full flex items-end justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-white/60">
            {cert.issuer} {cert.date ? `• ${cert.date}` : ""}
          </p>
          {cert.credentialId && (
            <p className="mt-1 text-[0.68rem] font-mono text-white/40 break-all">
              ID: {cert.credentialId}
            </p>
          )}
        </div>

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${cert.title}`}
            className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-[#c5ff41] hover:bg-[#c5ff41] hover:text-[#151312] focus:outline shrink-0 active:scale-95"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const featuredCerts = certifications.filter((c) => c.featured).slice(0, 3);

  return (
    <AnimatedSection id="certifications" className="section-shell py-20 sm:py-28" variants={staggerContainer}>
      <div>
        <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
          <p className="eyebrow mb-3">Recognition</p>
          <h2 className="display-heading text-white">
            CERTIFICATIONS
            <span className="ghost-word">& ACHIEVEMENTS</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm sm:text-base font-semibold leading-relaxed text-white/60">
            Verified competitive programming awards, technical certifications, and recognized engineering credentials.
          </p>
        </motion.div>

        {/* 3 Featured Certificates */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredCerts.map((cert) => (
            <CertificateCard key={cert.title} cert={cert} />
          ))}
        </motion.div>

        {/* Primary CTA: View All Certificates */}
        <motion.div variants={fadeUp} className="mt-12 sm:mt-16 flex justify-center">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-black text-white shadow-xl shadow-black/20 transition-all duration-300 hover:border-[#f46c38] hover:bg-white/10 hover:scale-105 active:scale-95 focus:outline"
          >
            <span>View All Certificates</span>
            <ArrowUpRight className="h-4 w-4 text-[#c5ff41]" />
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
