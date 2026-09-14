import React from "react";
import { Code2, Server, Database, Sparkles, ArrowRight, Layers, Plus } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const skillsList = [
  "FULL STACK WEB DEVELOPER",
  "REACT • NODE.JS",
  "TAILWIND CSS",
  "MONGODB • EXPRESS",
  "FIREBASE AUTHENTICATION",
  "FRONTEND DEVELOPMENT",
];

const skillGroups = [
  {
    id: "01",
    icon: Code2,
    category: "Frontend",
    note: "Interfaces people touch",
    skills: [
      ["React.js", 92],
      ["JavaScript (ES6+)", 90],
      ["Tailwind CSS", 95],
      ["HTML5 & CSS3", 96],
      ["Responsive / UI Design", 88],
    ],
  },
  {
    id: "02",
    icon: Server,
    category: "Backend",
    note: "Logic behind the scenes",
    skills: [
      ["Node.js", 85],
      ["Express.js", 83],
      ["REST API Design", 87],
      ["Authentication (JWT)", 78],
    ],
  },
  {
    id: "03",
    icon: Database,
    category: "Database & Tools",
    note: "Where data lives, and how I ship",
    skills: [
      ["MongoDB", 80],
      ["Git & GitHub", 90],
      ["Figma", 75],
      ["Vercel / Deployment", 82],
    ],
  },
];

const tools = [
  "React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS",
  "Git & GitHub", "Figma", "REST APIs", "JWT", "Vercel",
];

const stats = [
  { value: "3", label: "Core Stacks" },
  { value: "20+", label: "Technologies" },
  { value: "1+", label: "Years Practicing" },
  { value: "90%", label: "Avg. Proficiency" },
];

export default function SkillsPage() {
  return (
    <div className="bg-[#0a0f0d] text-white min-h-screen flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Blobs (Like About Page) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Marquee Strip */}
      <div className="border-y border-emerald-900/40 bg-[#0d1310] py-3 relative z-10">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {skillsList.map((item, idx) => (
                <span
                  key={idx}
                  className={`mx-6 text-sm tracking-widest font-medium uppercase ${
                    idx % 2 === 0 ? "text-emerald-400/70" : "text-gray-400"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-14 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <h4 className="text-3xl font-black text-emerald-400">{s.value}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Header Section */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 py-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
          <Sparkles size={14} /> SKILLS
        </div>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
          What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">bring to the build</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mt-6">
          A breakdown of the tools and technologies I use to design, build,
          and ship complete web applications — from interface to database.
        </p>
      </section>

      {/* Skills Groups Section */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 relative z-10 flex flex-col gap-8">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.id}
              className="bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/40 rounded-2xl p-6 md:p-10 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-black uppercase tracking-wide">{group.category}</h2>
                  <p className="text-sm text-gray-500 mt-1">{group.note}</p>
                </div>
                <span className="text-xs text-gray-600 font-mono border border-emerald-500/30 rounded-full px-3 py-1">
                  {group.id}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {group.skills.map(([name, pct]) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-200 font-medium">{name}</span>
                      <span className="text-emerald-400 font-mono text-xs">{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#0a0f0d] border border-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 py-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
          <Sparkles size={14} /> TOOLBOX
        </div>
        <h2 className="text-3xl font-black uppercase tracking-wide mb-8">What I reach for daily</h2>
        <div className="flex flex-wrap gap-4">
          {tools.map((t) => (
            <div
              key={t}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0d1310] border border-emerald-900/40 text-sm font-bold hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section (Matched with About Page) */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 relative z-10 pb-16">
        <div className="rounded-2xl bg-emerald-900/20 border border-emerald-500/30 backdrop-blur-md px-8 py-10 flex flex-wrap items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-black uppercase max-w-xl">
            Need these skills on your project?{" "}
            <span className="text-emerald-400">Let's talk.</span>
          </h3>
          
          <a
            href="/contact"
            className="bg-emerald-400 text-[#0a0f0d] px-8 py-4 rounded-xl font-bold hover:bg-emerald-300 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] inline-flex items-center gap-2 flex-shrink-0"
          >
            Get In Touch <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer Section (Matched with About Page) */}
      <section className="border-t border-emerald-900/40 bg-[#0d1310]/50 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="col-span-2 md:col-span-1">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Shafiq Suzon</p>
            <p className="text-gray-500 text-xs uppercase leading-relaxed">
              Web developer building custom digital solutions in Rajshahi.
            </p>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Navigation</p>
            <div className="flex flex-col gap-1.5">
              <a href="/" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Home</a>
              <a href="/about" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">About</a>
              <a href="/service" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Services</a>
              <a href="/contact" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Find Me On</p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-[#0d1310]/80 border border-emerald-900/50 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-400 transition-all duration-300">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-[#0d1310]/80 border border-emerald-900/50 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-400 transition-all duration-300">
                <FaGithub size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-[#0d1310]/80 border border-emerald-900/50 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-400 transition-all duration-300">
                <Layers size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-[#0d1310]/80 border border-emerald-900/50 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-400 transition-all duration-300">
                <Plus size={16} />
              </a>
            </div>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
            <p className="text-gray-300 text-sm">Rajshahi, Bangladesh<br /><span className="text-gray-500">Remote & On-site</span></p>
          </div>
        </div>
      </section>

      {/* Big Footer Text (Matched with About Page) */}
      <div className="w-full text-center py-10 bg-[#0a0f0d] relative z-10 overflow-hidden">
        <h2
          className="text-5xl md:text-[9rem] font-black select-none uppercase tracking-widest leading-none"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(6,95,70,0.8), #0a0f0d)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Shafiq Suzon
        </h2>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}