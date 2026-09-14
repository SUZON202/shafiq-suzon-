import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const skillsList = [
  "FULL STACK WEB DEVELOPER",
  "REACT • NODE.JS",
  "TAILWIND CSS",
  "MONGODB • EXPRESS",
  "FIREBASE AUTHENTICATION",
  "FRONTEND DEVELOPMENT",
];

// তোমার আগের ডেমো প্রজেক্টগুলো (ব্যাকআপ হিসেবে থাকবে)
const staticProjects = [
  {
    title: "E-Commerce Platform",
    desc: "A full-featured online store with product filtering, cart, checkout, and an admin dashboard for managing orders and inventory.",
    tags: ["React.js", "Node.js", "MongoDB", "Stripe"],
    image: null,
    live: null,
    github: null,
  },
  {
    title: "Task Management App",
    desc: "A collaborative task board with drag-and-drop columns, real-time updates, and team member assignment built on Firebase.",
    tags: ["React.js", "Firebase", "Tailwind CSS"],
    image: null,
    live: null,
    github: null,
  },
  {
    title: "Restaurant Booking System",
    desc: "An online reservation system with live table availability, automated confirmation emails, and an owner-facing booking calendar.",
    tags: ["Express", "MongoDB", "Node.js"],
    image: null,
    live: null,
    github: null,
  },
  {
    title: "Portfolio Website Builder",
    desc: "A no-code tool that lets freelancers generate a personal portfolio site from a simple form, with live preview and theme options.",
    tags: ["React.js", "Tailwind CSS", "Vercel"],
    image: null,
    live: null,
    github: null,
  },
  {
    title: "Fitness Tracker",
    desc: "A workout logging app with progress charts, custom routines, and authentication, designed for daily use on mobile screens.",
    tags: ["React.js", "Firebase Auth", "Recharts"],
    image: null,
    live: null,
    github: null,
  },
  {
    title: "Blog & CMS Platform",
    desc: "A lightweight publishing platform with a markdown editor, tag-based filtering, and a REST API powering the content backend.",
    tags: ["Node.js", "Express", "MongoDB"],
    image: null,
    live: null,
    github: null,
  },
];

const ProjectLink = ({ href, icon: Icon, label, activeClass }) => {
  if (!href) {
    return (
      <span className="text-sm font-bold text-gray-600 inline-flex items-center gap-2 cursor-not-allowed select-none">
        {label} <Icon size={16} />
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`text-sm font-bold inline-flex items-center gap-2 transition-colors ${activeClass}`}
    >
      {label} <Icon size={16} />
    </a>
  );
};

const Project = () => {
  const [displayProjects, setDisplayProjects] = useState(staticProjects);

  // ডাটাবেস থেকে ডাইনামিক প্রজেক্ট আনা হচ্ছে
  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => {
        // ডাটাবেসের প্রজেক্টগুলোকে ডেমো প্রজেক্টের ফরম্যাটে সাজানো হচ্ছে
        const formattedDbProjects = data.map(dp => ({
          _id: dp._id,
          title: dp.title,
          desc: dp.description,
          tags: ["React.js", "Node.js", "MongoDB", "Express"], // Default tags
          image: dp.imageUrl,
          live: dp.liveLink,
          github: dp.githubLink,
        }));

        // যদি ডাটাবেসে ৬টার কম প্রজেক্ট থাকে, তাহলে বাকিটা ডেমো দিয়ে পূরণ করবে
        let combinedProjects = [...formattedDbProjects];
        if (formattedDbProjects.length < 6) {
          const needed = 6 - formattedDbProjects.length;
          combinedProjects = [...combinedProjects, ...staticProjects.slice(0, needed)];
        }
        
        setDisplayProjects(combinedProjects);
      })
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div className="project-page bg-[#0a0f0d] text-white min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Marquee Strip */}
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
            Projects
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter uppercase max-w-3xl">
          Selected{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            work I've built
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mt-6">
          A mix of full stack apps, dashboards, and client projects, each one built
          from scratch with real functionality behind the design.
        </p>
      </header>

      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {displayProjects.map((p, index) => {
            // অটোমেটিক সিরিয়াল নাম্বার জেনারেট (01, 02, 03...)
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={p._id || index}
                className="bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/40 rounded-2xl overflow-hidden hover:border-emerald-400/80 hover:-translate-y-2 transition-all duration-300 group shadow-lg hover:shadow-emerald-900/20"
              >
                {/* Project Image / Placeholder Section */}
                <div className="relative w-full h-56 bg-gradient-to-br from-emerald-900/20 to-[#0a0f0d] border-b border-emerald-900/40 flex items-center justify-center overflow-hidden">
                  {/* Number Badge */}
                  <span className="absolute top-4 left-4 z-10 text-xs font-mono text-emerald-400 bg-[#0a0f0d]/90 border border-emerald-500/30 px-3 py-1 rounded-full tracking-widest shadow-md">
                    {num}
                  </span>

                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <>
                      {/* Dot pattern background */}
                      <div
                        className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 2px 2px, #34d399 1px, transparent 0)",
                          backgroundSize: "24px 24px",
                        }}
                      ></div>

                      {/* Soft glow behind the initials */}
                      <div className="absolute w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-colors duration-500"></div>

                      {/* বড় অক্ষরের initials */}
                      <div
                        className="relative text-7xl md:text-8xl font-black uppercase tracking-tighter select-none text-transparent bg-clip-text bg-gradient-to-br from-emerald-500/50 to-emerald-900/30 group-hover:from-emerald-400/70 group-hover:to-emerald-600/40 transition-all duration-500"
                      >
                        {p.title ? p.title.substring(0, 2) : "PR"}
                      </div>

                      {/* নিচে ছোট লেবেল */}
                      <span className="absolute bottom-4 text-[10px] font-semibold uppercase tracking-widest text-emerald-500/40 group-hover:text-emerald-400/60 transition-colors duration-500">
                        {p.live ? "Live Demo Available" : "Preview coming soon"}
                      </span>
                    </>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-black uppercase tracking-wide mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-900/20 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <ProjectLink
                      href={p.live}
                      icon={ExternalLink}
                      label="Live Demo"
                      activeClass="text-emerald-400 hover:text-emerald-300"
                    />
                    <ProjectLink
                      href={p.github}
                      icon={FaGithub}
                      label="Source"
                      activeClass="text-gray-400 hover:text-white"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 relative z-10">
        <div className="rounded-2xl bg-emerald-900/20 border border-emerald-500/30 backdrop-blur-md px-8 py-10 flex flex-wrap items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-black uppercase max-w-xl">
            Like what you see?{" "}
            <span className="text-emerald-400">Let's build yours next.</span>
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
              <a href="/project" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Projects</a>
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

export default Project;