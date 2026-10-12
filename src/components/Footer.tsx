"use client";

import { profile, socials } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="section-shell flex flex-col gap-5 border-t border-white/10 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-black text-white">{profile.displayName}</p>
        <p className="text-white/60">{profile.role}</p>
      </div>
      <p>Copyright &copy; {new Date().getFullYear()} {profile.displayName}. All rights reserved.</p>
      <div className="flex items-center gap-3">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-[#f46c38] hover:text-[#f46c38] hover:scale-105 active:scale-95 focus:outline"
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
      <div className="noise" aria-hidden="true" />
    </footer>
  );
}
