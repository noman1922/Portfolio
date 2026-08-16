import Image from "next/image";
import { ArrowDownRight, ArrowRight, CheckCircle2, Code2 } from "lucide-react";
import { highlights, profile, socials, stats } from "@/data/portfolio";


export default function Hero() {
  return (
    <section id="home" className="section-shell relative grid min-h-screen gap-10 pt-28 pb-20 lg:grid-cols-[0.8fr_1.35fr] lg:items-center lg:pt-32">
      <div className="absolute left-0 top-24 -z-10 hidden h-52 w-52 rounded-full border border-dashed border-[#f46c38]/60 lg:block" />

      <aside className="premium-card relative mx-auto w-full max-w-[330px] overflow-hidden rounded-[14px] bg-[#faf7f3] p-5 text-[#151312] lg:mx-0 lg:self-center">
        <div className="aspect-[1/1.04] overflow-hidden rounded-xl bg-[#f46c38]">
          <div className="relative h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.26),transparent_34%),linear-gradient(145deg,#f46c38,#9e2d0b)]">
            {profile.profileImage ? (
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Image src={profile.profileImage} alt={profile.displayName} fill sizes="(max-width: 768px) 320px, 420px" className="object-cover" />
              </div>
            ) : (
              <div className="absolute inset-0 grid place-items-center text-6xl font-black text-white">NK</div>
            )}
          </div>
        </div>

        <div className="pt-5 text-center">
          <p className="text-2xl font-black leading-tight text-white">{profile.name}</p>
          <p className="mt-2 text-xs font-semibold text-[#6a625f]">{profile.secondaryRole}</p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          {socials.slice(0, 4).map((social) => {
          const Icon = social.icon;
            return (
              <a key={social.label} href={social.href} aria-label={social.label} className="grid h-9 w-9 place-items-center rounded-full text-[#f46c38] transition hover:bg-[#f46c38] hover:text-white focus:outline">
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </aside>

      <div className="relative">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/78">
          <CheckCircle2 className="h-4 w-4 text-[#c5ff41]" />
          {profile.availability}
        </div>

        <h1 className="display-heading max-w-4xl">
          {['Full-Stack', 'Web', 'Developer'].map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-white/58 sm:text-lg">{profile.heroCopy}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#151312] transition hover:bg-[#c5ff41] focus:outline">
            View Projects
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-black text-white transition hover:border-[#f46c38] hover:bg-[#f46c38] focus:outline">
            Let&apos;s Work Together
            <ArrowDownRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-black text-white sm:text-5xl">{stat.value}</p>
              <p className="mt-2 max-w-24 text-[0.64rem] font-bold uppercase leading-tight text-white/38">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-9 grid max-w-2xl gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <div key={item.title} className={`relative min-h-40 overflow-hidden rounded-lg p-6 ${item.tone === 'acid' ? 'bg-[#c5ff41] text-[#151312]' : 'bg-[#f46c38] text-white'}`}>
              <Code2 className="mb-8 h-7 w-7" />
              <p className="text-lg font-black uppercase leading-tight">{item.title}</p>
              <p className="mt-2 text-xs font-semibold opacity-70">{item.description}</p>
              <ArrowRight className="absolute bottom-5 right-5 h-5 w-5" />
              <span className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-current opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
