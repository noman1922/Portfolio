import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Layers3,
  Server,
  TerminalSquare
} from "lucide-react";
import { highlights, profile, socials, stats } from "@/data/portfolio";
import assetPath from "@/lib/assetPath";

const iconMap: Record<string, typeof Code2> = {
  "PRODUCT ENGINEERING": Layers3,
  "FULL-STACK SYSTEMS": Server,
  "DEVOPS & CLOUD": TerminalSquare,
  "DATABASE & APIS": Database
};

export default function Hero() {
  return (
    <section
      id="home"
      className="section-shell relative grid gap-10 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:grid-cols-[0.8fr_1.35fr] lg:items-start lg:gap-12 lg:pt-32"
    >
      <div className="absolute left-0 top-24 -z-10 hidden h-52 w-52 rounded-full border border-dashed border-[#f46c38]/60 lg:block" />

      {/* Left Profile ID Card */}
      <aside className="premium-card relative mx-auto w-full max-w-[320px] sm:max-w-[340px] overflow-hidden rounded-[18px] bg-[#1a1716] border border-white/12 p-5 text-white shadow-2xl shadow-black/40 lg:mx-0 lg:sticky lg:top-28">
        <div className="aspect-[1/1.04] overflow-hidden rounded-xl bg-[#f46c38]">
          <div className="relative h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.26),transparent_34%),linear-gradient(145deg,#f46c38,#9e2d0b)]">
            {profile.profileImage ? (
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src={assetPath(profile.profileImage as string)}
                  alt={profile.displayName}
                  fill
                  sizes="(max-width: 768px) 320px, 420px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="absolute inset-0 grid place-items-center text-6xl font-black text-white">
                NK
              </div>
            )}
          </div>
        </div>

        <div className="pt-5 text-center">
          <p className="text-2xl font-bold leading-tight text-[#fffaf6]">{profile.name}</p>
          <p className="mt-1.5 text-xs font-semibold text-white/70">{profile.secondaryRole}</p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2.5">
          {socials.slice(0, 4).map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#151312] shadow-sm transition hover:bg-[#c5ff41] hover:scale-105 active:scale-95 focus:outline"
              >
                <Icon className="w-4 h-4 text-[#151312]" />
              </a>
            );
          })}
        </div>
      </aside>

      {/* Right Main Text Content */}
      <div className="relative w-full min-w-0">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/80">
          <CheckCircle2 className="h-4 w-4 text-[#c5ff41]" />
          <span>{profile.availability}</span>
        </div>

        <h1 className="max-w-4xl text-[2.75rem] font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem]">
          {["Full-Stack", "Web", "Developer"].map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
          {profile.heroCopy}
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#151312] transition hover:bg-[#c5ff41] active:scale-95 focus:outline"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3.5 text-sm font-black text-white transition hover:border-[#f46c38] hover:bg-[#f46c38] active:scale-95 focus:outline"
          >
            Let&apos;s Work Together
            <ArrowDownRight className="h-4 w-4" />
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:mt-12 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-white sm:text-4xl md:text-5xl">{stat.value}</p>
              <p className="mt-1.5 max-w-28 text-[0.62rem] font-bold uppercase leading-tight tracking-wider text-white/40 sm:text-[0.66rem]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlights - Balanced 2x2 Grid */}
        <div className="mt-9 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {highlights.map((item) => {
            const Icon = iconMap[item.title] || Code2;
            const isAcid = item.tone === "acid";
            const isOrange = item.tone === "orange";
            const isSteel = item.tone === "steel";

            let cardClasses = "relative min-h-[160px] overflow-hidden rounded-xl p-5 sm:p-6 transition-all duration-300 ";
            if (isAcid) {
              cardClasses += "bg-[#c5ff41] text-[#151312] shadow-lg shadow-[#c5ff41]/10";
            } else if (isOrange) {
              cardClasses += "bg-[#f46c38] text-white shadow-lg shadow-[#f46c38]/15";
            } else if (isSteel) {
              cardClasses += "bg-[#211e1c] text-white border border-white/12 hover:border-[#f46c38]/50";
            } else {
              cardClasses += "bg-[#1c1917] text-white border border-white/12 hover:border-[#c5ff41]/50";
            }

            return (
              <div key={item.title} className={cardClasses}>
                <Icon className="mb-6 h-6 w-6 opacity-90 sm:h-7 sm:w-7" />
                <p className="text-base font-black uppercase leading-tight tracking-tight sm:text-lg">
                  {item.title}
                </p>
                <p className="mt-2 text-xs font-semibold leading-relaxed opacity-75">
                  {item.description}
                </p>
                <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 opacity-70" />
                <span className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-current opacity-15 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
