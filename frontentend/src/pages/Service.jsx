import React from "react";
import { ArrowRight, Code2, Server, Layers3, Palette, Wrench, Rocket } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const skillsList = [
  "FULL STACK WEB DEVELOPER",
  "REACT • NODE.JS",
  "TAILWIND CSS",
  "MONGODB • EXPRESS",
  "FIREBASE AUTHENTICATION",
  "FRONTEND DEVELOPMENT",
];

const services = [
  {
    num: "01",
    icon: Code2,
    title: "Frontend Development",
    desc: "Custom, responsive interfaces built with React and Tailwind CSS, no templated UI kits, just pixel-accurate design turned into working code.",
    tags: ["React.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    num: "02",
    icon: Server,
    title: "Backend Development",
    desc: "Reliable server-side logic and REST APIs using Node.js and Express, built to handle real traffic and scale with the product.",
    tags: ["Node.js", "Express", "REST APIs"],
  },
  {
    num: "03",
    icon: Layers3,
    title: "Full Stack Web Apps",
    desc: "End-to-end builds, database, backend, and interface, delivered as one complete, working product rather than disconnected pieces.",
    tags: ["MongoDB", "Authentication", "Deployment"],
  },
  {
    num: "04",
    icon: Palette,
    title: "UI / UX Architecture",
    desc: "Interface systems planned around how people actually use the product, clear structure, consistent components, and no unnecessary decoration.",
    tags: ["Figma", "Design Systems", "Custom UI"],
  },
  {
    num: "05",
    icon: Wrench,
    title: "Website Maintenance",
    desc: "Ongoing fixes, updates, and performance improvements for existing websites, keeping things fast, secure, and easy to extend.",
    tags: ["Bug Fixes", "Performance", "Updates"],
  },
  {
    num: "06",
    icon: Rocket,
    title: "Landing Pages",
    desc: "Focused, high-converting single pages for products, portfolios, or campaigns, built fast and designed to make one clear point.",
    tags: ["React.js", "Tailwind CSS", "SEO Basics"],
  },
];

const process = [
  { title: "Discovery", desc: "Understand the goal, the audience, and what the page or app actually needs to do." },
  { title: "Design", desc: "Plan the structure and visual direction before writing any code." },
  { title: "Build", desc: "Develop the frontend and backend together, testing as I go." },
  { title: "Launch", desc: "Deploy, test on real devices, and hand over a working product." },
];

const Service = () => {
  return (
    <div className="service-page bg-[#0a0f0d] text-white min-h-screen flex flex-col relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Marquee Strip - Fixed to alternate colors like Home/About page */}
      <div className="marquee-strip border-y border-emerald-900/40 bg-[#0d1310] py-3 relative z-10">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {skillsList.map((item, idx) => (
                <span
                  key={idx}
                  className={`mx-6 text-sm tracking-widest font-medium uppercase ${
                    idx % 2 === 0 ? "text-emerald-500" : "text-gray-600"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-20 pb-14 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[2px] bg-emerald-400" />
          <span className="text-emerald-400 text-xs tracking-[0.3em] font-semibold uppercase">
            Services
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter uppercase max-w-3xl">
          What I{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            can build for you
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mt-6">
          From a single landing page to a full product with a database behind it,
          here's what I take on, and how I work through it.
        </p>
      </header>

      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/40 rounded-2xl p-7 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-lg bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs text-gray-600 font-mono tracking-widest">{s.num}</span>
                </div>

                <h3 className="text-lg font-black uppercase tracking-wide mb-3 text-white">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {s.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10.5px] tracking-wide uppercase text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 relative z-10 border-t border-emerald-900/40 pt-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white">How I Work</h2>
          <p className="text-emerald-400 text-xs tracking-[0.2em] font-mono uppercase">
            A simple, four-step process
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, i) => (
            <div
              key={step.title}
              className="bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/40 rounded-2xl p-6 hover:border-emerald-400/50 transition-all duration-300"
            >
              <span className="text-4xl font-black text-emerald-400/30 block mb-4">
                0{i + 1}
              </span>
              <h4 className="text-white font-bold text-base mb-2">{step.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 relative z-10">
        <div className="rounded-2xl bg-emerald-900/20 border border-emerald-500/30 backdrop-blur-md px-8 py-10 flex flex-wrap items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-black uppercase max-w-xl">
            Have a project in mind?{" "}
            <span className="text-emerald-400">Let's build it together.</span>
          </h3>
          
          <a
            href="/contact"
            className="bg-emerald-400 text-[#0a0f0d] px-8 py-4 rounded-xl font-bold hover:bg-emerald-300 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] inline-flex items-center gap-2 flex-shrink-0"
          >
            Get In Touch <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="border-t border-emerald-900/40 bg-[#0d1310]/50 backdrop-blur-lg relative z-10 mt-16">
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
            </div>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
            <p className="text-gray-300 text-sm">Rajshahi, Bangladesh<br /><span className="text-gray-500">Remote & On-site</span></p>
          </div>
        </div>
      </section>

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
};

export default Service;