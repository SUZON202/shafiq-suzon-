import React from 'react';
import { Code2, Database, Wrench, ArrowRight, Layers, Plus } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const skillsList = [
  "FULL STACK WEB DEVELOPER",
  "REACT • NODE.JS",
  "TAILWIND CSS",
  "MONGODB • EXPRESS",
  "FIREBASE AUTHENTICATION",
  "FRONTEND DEVELOPMENT",
];

const stackData = [
  {
    id: "01",
    icon: Code2,
    title: "Frontend Development",
    skills: [
      { name: "React.js", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "HTML5 & CSS3", level: 95 },
    ],
  },
  {
    id: "02",
    icon: Database,
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "Firebase Auth", level: 85 },
    ],
  },
  {
    id: "03",
    icon: Wrench,
    title: "Tools & Workflow",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Figma", level: 70 },
      { name: "Vercel", level: 80 },
      { name: "Postman", level: 75 },
    ],
  },
];

const stats = [
  { value: "1+", label: "Years Experience" },
  { value: "15+", label: "Projects Done" },
  { value: "14+", label: "Happy Clients" },
  { value: "100%", label: "Commitment" },
];

const About = () => {
  return (
    <div className="about-container bg-[#0a0f0d] text-white min-h-screen flex flex-col relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="marquee-strip border-y border-emerald-900/40 bg-[#0d1310] py-3 relative z-10">
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

      <section className="flex-1 max-w-7xl mx-auto px-6 md:px-10 py-16 grid lg:grid-cols-2 gap-16 items-start relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-emerald-400" />
            <span className="text-emerald-400 text-xs tracking-[0.3em] font-semibold uppercase">
              About Me
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter uppercase">
            Code.<br />
            Design.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
              Build.
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            I'm a <span className="text-white font-semibold">full stack web developer</span> based
            in Rajshahi, Bangladesh. I bridge the gap between design and engineering, translating
            complex problems into highly interactive, fast, and scalable digital products.
          </p>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            My approach is simple: write <span className="text-white font-semibold">clean code</span>,
            build <span className="text-white font-semibold">intuitive interfaces</span>, and never
            stop learning. With <span className="text-white font-semibold">1+ years</span> of
            hands-on coding experience, I focus on delivering solutions that perform seamlessly
            under the hood and look stunning on the surface.
          </p>

          <div className="flex items-center gap-5 pt-6 border-t border-emerald-900/40">
            <div className="relative w-16 h-16 rounded-full border-2 border-emerald-400/40 bg-[#0d1310] flex items-center justify-center font-black text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.2)]">
              SS
              <span className="absolute inset-[-6px] rounded-full border border-dashed border-emerald-500/30 animate-[spin_12s_linear_infinite]"></span>
            </div>
            <div>
              <p className="font-bold text-white text-base">Shafiq Suzon</p>
              <p className="text-emerald-400 text-sm">Full Stack Developer</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a href="/contact" className="bg-emerald-400 text-[#0a0f0d] px-8 py-4 rounded-xl font-bold hover:bg-emerald-300 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] inline-flex items-center gap-2">
              Get In Touch <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {stackData.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/40 rounded-xl p-7 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wide flex-1">{cat.title}</h3>
                  <span className="text-xs text-gray-600 font-mono">{cat.id}</span>
                </div>

                {cat.skills.map((skill) => (
                  <div key={skill.name} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-emerald-400 font-mono text-xs">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#0a0f0d] border border-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
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

export default About;