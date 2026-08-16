"use client";

import { motion } from "motion/react";
import AnimatedSection from "@/components/AnimatedSection";
import { certifications } from "@/data/portfolio";
import Image from "next/image";

type Certification = {
  title: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
};
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Certifications() {
  const has = Array.isArray(certifications) && certifications.length > 0;

  return (
    <AnimatedSection id="certifications" className="section-shell py-20 sm:py-28" variants={staggerContainer}>
      <div className="section-shell">
        <motion.div variants={fadeUp} className="mb-10">
        <h2 className="display-heading text-white">CERTIFICATIONS & ACHIEVEMENTS</h2>
        <p className="max-w-sm text-sm font-semibold leading-6 text-white">Verified certificates and achievements.</p>
        </motion.div>

        {has ? (
          <motion.div variants={staggerContainer} className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert: Certification) => {
              const isFeatured = cert.title && cert.title.includes("NASA International Space Apps Challenge 2025");
              return (
                <motion.div
                  key={cert.title}
                  variants={fadeUp}
                  className={`group rounded-lg border bg-white/3 p-6 text-white/95 flex cursor-default flex-col items-start transition ${isFeatured ? 'border-yellow-300' : 'border-white/10'}`}
                  style={isFeatured ? { boxShadow: '0 8px 30px rgba(245,205,68,0.08)', backgroundColor: 'rgba(255,250,240,0.02)' } : undefined}
                >
                  <div className="relative mb-4 w-full overflow-hidden rounded">
                    {cert.image ? (
                      <div className="relative h-44 md:h-56 w-full bg-white/5 flex items-center justify-center">
                        <Image
                          src={(function(s: string){
                            if (!s) return s;
                            if (/^https?:\/\//.test(s)) return s;
                            const assetPrefix = (typeof window !== 'undefined' && (window as any).__NEXT_DATA__?.assetPrefix) || process.env.NEXT_PUBLIC_BASE_PATH || '';
                            return `${assetPrefix}${s}`;
                          })(cert.image)}
                          alt={cert.title}
                          fill
                          className="object-contain"
                          sizes="(min-width:1024px) 300px, (min-width:640px) 240px, 320px"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="h-44 md:h-56 w-full rounded bg-white/6 flex items-center justify-center text-sm text-white/60">No image</div>
                    )}

                    {isFeatured && (
                      <div className="absolute top-3 left-3 rounded-full bg-yellow-400/95 px-2 py-1 text-xs font-black text-[#1a1200]">FEATURED</div>
                    )}
                  </div>

                  <div className="mt-2 w-full">
                    <p className="mb-2 text-sm font-black leading-tight text-white">{cert.title}</p>
                    <p className="text-xs opacity-70">{cert.issuer} • {cert.date}</p>
                    {cert.credentialId && <p className="mt-2 text-xs opacity-60">ID: {cert.credentialId}</p>}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="premium-card rounded-lg p-6">
            <p className="text-lg font-bold">Certifications will be added soon.</p>
            <p className="mt-3 text-sm text-white/60">No certificates are currently listed. Add verified certificate entries in <code>src/data/portfolio.ts</code>.</p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
