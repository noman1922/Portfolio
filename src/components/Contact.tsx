"use client";

import { Send } from "lucide-react";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { socials } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [messageText, setMessageText] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const budget = String(form.get("budget") || "");
    const message = String(form.get("message") || "");

    if (!name || !email || !message) {
      setMessageText("Please fill out name, email and message.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, budget, message })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send message");

      setMessageText("Message sent. Thank you!");
      setStatus("success");
      (event.currentTarget as HTMLFormElement).reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMessageText(message || "An error occurred while sending the message.");
      setStatus("error");
    }
  }

  return (
    <AnimatedSection id="contact" className="section-shell py-20 sm:py-28" variants={staggerContainer}>
      <div className="grid gap-10 lg:grid-cols-[0.88fr_1fr] lg:items-start">
        <motion.div variants={fadeUp}>
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="display-heading">
            Let&apos;s Work
            <span className="ghost-word">Together</span>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-7 text-white/58">Have a project, idea, or system in mind? Let&apos;s build something useful.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/72 transition hover:border-[#c5ff41] hover:text-[#c5ff41] focus:outline">
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit} variants={fadeUp} className="premium-card rounded-lg p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-black uppercase text-white/56">
              Name
              <input required name="name" type="text" placeholder="Your Name" className="mt-2 h-12 w-full rounded-md border border-white/10 bg-white/8 px-4 text-sm font-semibold text-white placeholder:text-white/28 focus:outline" />
            </label>
            <label className="text-xs font-black uppercase text-white/56">
              Email
              <input required name="email" type="email" placeholder="you@example.com" className="mt-2 h-12 w-full rounded-md border border-white/10 bg-white/8 px-4 text-sm font-semibold text-white placeholder:text-white/28 focus:outline" />
            </label>
          </div>

          <label className="mt-4 text-xs font-black uppercase text-white/56">
            Budget
            <input name="budget" type="text" placeholder="Project budget (optional)" className="mt-2 h-12 w-full rounded-md border border-white/10 bg-white/8 px-4 text-sm font-semibold text-white placeholder:text-white/28 focus:outline" />
          </label>

          <label className="mt-4 block text-xs font-black uppercase text-white/56">
            Message
            <textarea required name="message" rows={7} placeholder="Tell me about your project" className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/8 px-4 py-4 text-sm font-semibold text-white placeholder:text-white/28 focus:outline" />
          </label>

          <button type="submit" disabled={status === "loading"} className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#f46c38] text-sm font-black text-white transition hover:bg-[#ff7b4b] focus:outline disabled:opacity-60">
            {status === "loading" ? "Sending..." : "Send"}
            <Send className="h-4 w-4" />
          </button>

          {messageText ? <p className={`mt-4 text-sm font-semibold ${status === "success" ? "text-[#c5ff41]" : "text-[#ffb4a6]"}`}>{messageText}</p> : null}
        </motion.form>
      </div>
    </AnimatedSection>
  );
}
