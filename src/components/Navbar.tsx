"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible?.target.id) return;
        const next = navItems.find((item) => item.href === `#${visible.target.id}`);
        if (next) setActive(next.label);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-4">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#151312]/80 px-3 py-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <a
          href="#home"
          className="flex h-10 items-center gap-3 rounded-full px-2 pr-4 text-sm font-bold text-white focus:outline"
          onClick={close}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c5ff41] text-sm font-black text-[#151312]">
            N
          </span>
          <span className="hidden sm:inline">{profile.displayName}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;

            return (
              <a
                key={item.href}
                href={item.href}
                className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/72 transition hover:text-white focus:outline"
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ duration: 0.25 }}
                  />
                ) : null}
                <Icon className="relative h-4 w-4 text-[#c5ff41] opacity-80 transition group-hover:translate-y-[-1px]" />
                <span className="relative">{item.label}</span>
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-[#f46c38] px-5 py-2 text-sm font-black text-white transition hover:bg-[#ff7b4b] focus:outline md:inline-flex"
        >
          Hire Me
        </a>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white focus:outline md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-3 w-[calc(100%-16px)] max-w-5xl overflow-hidden rounded-[22px] border border-white/10 bg-[#151312]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/8 focus:outline"
                >
                  <Icon className="h-4 w-4 text-[#c5ff41]" />
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
