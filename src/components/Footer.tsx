"use client";

import { profile, socials } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="section-shell flex flex-col gap-5 border-t border-white/10 py-8 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-black text-white">{profile.displayName}</p>
        <p>{profile.role}</p>
      </div>
      <p>Copyright {new Date().getFullYear()} {profile.displayName}. All rights reserved.</p>
      <div className="flex gap-3">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/64 transition hover:border-[#f46c38] hover:text-[#f46c38] focus:outline"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
      <div className="noise" aria-hidden="true" />
    </footer>
  );
}
