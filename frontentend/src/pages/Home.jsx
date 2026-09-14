import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  // ডেমো ছবির লিংক (যদি প্রজেক্টের ছবি না থাকে তবে এটি দেখাবে)
  const defaultProjectImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="home-container bg-[#0a0f0d] text-white min-h-screen flex flex-col relative overflow-hidden">

      {/* Ambient Glow / Background Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Marquee Ticker */}
      <div className="marquee-strip border-y border-emerald-900/40 bg-[#0d1310] py-3 relative z-10">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              <span className="mx-6 text-sm tracking-widest text-emerald-400/70 font-medium uppercase">Full Stack Web Developer</span>
              <span className="mx-6 text-sm tracking-widest text-gray-400 font-medium uppercase">React • Node.js</span>
              <span className="mx-6 text-sm tracking-widest text-emerald-400/70 font-medium uppercase">Tailwind CSS</span>
              <span className="mx-6 text-sm tracking-widest text-gray-400 font-medium uppercase">MongoDB • Express</span>
              <span className="mx-6 text-sm tracking-widest text-emerald-400/70 font-medium uppercase">Firebase</span>
              <span className="mx-6 text-sm tracking-widest text-gray-400 font-medium uppercase">Frontend Development</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex-1 max-w-7xl mx-auto px-6 md:px-10 py-16 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-emerald-400" />
            <span className="text-emerald-400 text-xs tracking-[0.3em] font-semibold uppercase">
              Welcome to my portfolio
            </span>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl text-gray-400 font-medium mb-2 tracking-wide">
              Hi, I'm
            </h2>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-white">
              SHAFIQ
            </h1>
            <h1
              className="text-6xl md:text-8xl font-black leading-none tracking-tighter"
              style={{ WebkitTextStroke: '2px #34d399', color: 'transparent' }}
            >
              SUZON
            </h1>
          </div>

          <div className="inline-block px-5 py-2.5 rounded-xl bg-emerald-900/20 border border-emerald-500/30 backdrop-blur-md">
            <p className="text-emerald-300 font-semibold tracking-widest text-sm uppercase">
              I am a Full Stack Web Developer!
            </p>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Architecting high-performance web applications from <span className="text-white font-semibold">Database to Interface</span>.
            Leveraging the full potential of <span className="text-white font-semibold">React, Node.js, Express, MongoDB, and Firebase</span>,
            combined with <span className="text-white font-semibold">Tailwind CSS</span>, to transform complex concepts into lightning-fast,
            scalable, and visually striking digital solutions.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <a href="#contact" className="bg-emerald-400 text-[#0a0f0d] px-8 py-4 rounded-xl font-bold hover:bg-emerald-300 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              Hire Me →
            </a>
            <a href="#projects" className="text-white font-semibold border-b-2 border-emerald-400/0 hover:border-emerald-400 pb-1 transition-all duration-300">
              View My Work
            </a>
          </div>

          {/* Real Stats - (১ বছর, ১৫ প্রজেক্ট করে দেওয়া হয়েছে) */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-emerald-900/40">
            <div>
              <h4 className="text-3xl font-black text-emerald-400">1+</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years<br />Experience</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-emerald-400">15+</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects<br />Completed</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-emerald-400">100%</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Client<br />Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative flex justify-center items-center h-[500px] lg:-mt-32">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex-col gap-5 z-20 hidden md:flex">
            {[
              { icon: FaGithub, link: "https://github.com" },
              { icon: FaLinkedinIn, link: "https://linkedin.com" },
              { icon: FaFacebookF, link: "https://facebook.com" },
              { icon: FaTwitter, link: "https://twitter.com" },
              { icon: FaInstagram, link: "https://instagram.com" },
            ].map((social, i) => (
              <a key={i} href={social.link} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/50 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <social.icon size={18} />
              </a>
            ))}
          </div>

          <div className="relative w-96 h-96 flex justify-center items-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/40 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-5 rounded-full border border-emerald-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>

            <div className="relative z-10 w-72 h-72 rounded-full border-2 border-emerald-400/40 shadow-[0_0_50px_rgba(52,211,153,0.15)] overflow-hidden bg-[#0d1310]">
              <img
                src="/bbbbbb555555555.png"
                alt="Shafiq Suzon"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute z-20 bottom-8 px-5 py-2 rounded-full bg-[#0a0f0d]/90 border border-emerald-500/50 flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="border-t border-emerald-900/40 bg-[#0d1310]/50 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
            <p className="text-gray-300 text-sm">Rajshahi, Bangladesh<br /><span className="text-gray-500">Remote & On-site</span></p>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Specialty</p>
            <p className="text-gray-300 text-sm">Full Stack Development<br /><span className="text-gray-500">End-to-end product builds</span></p>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Stack</p>
            <p className="text-gray-300 text-sm">React · Node · Tailwind<br /><span className="text-gray-500">MongoDB · Express</span></p>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
            <p className="text-gray-300 text-sm">Open to Work<br /><span className="text-gray-500">Freelance & Full-time</span></p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* Projects Section (Dynamic Data & Demo Image Added) */}
      {/* ================================================== */}
      <section id="projects" className="py-24 relative z-10 px-6 max-w-7xl mx-auto w-full border-t border-white/[0.02]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide mb-2">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Projects</span>
          </h2>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Explore some of my recent works</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((proj) => (
              <div key={proj._id || proj.id} className="flex flex-col rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500 group shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:-translate-y-2">
                
                <div className="h-56 overflow-hidden relative shrink-0">
                  {/* এখানে ডেমো ছবির লজিক দেওয়া হয়েছে */}
                  <img 
                    src={proj.imageUrl || defaultProjectImage} 
                    alt={proj.title || "Project Demo"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent opacity-90"></div>
                </div>

                <div className="p-6 relative z-10 flex flex-col grow">
                  <h3 className="text-xl font-bold text-gray-100 mb-2 truncate">{proj.title}</h3>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow">{proj.description}</p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    {proj.liveLink && (
                      <a href={proj.liveLink} target="_blank" rel="noreferrer" className="flex-1 text-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-[#0a0f0d] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        Live Demo
                      </a>
                    )}
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="flex-1 text-center bg-white/[0.02] text-gray-300 border border-white/[0.05] hover:bg-white/[0.1] hover:text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-50">
               <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
               <p className="text-gray-400 tracking-widest uppercase text-xs font-bold">Loading Projects...</p>
            </div>
          )}
        </div>
      </section>

      {/* Minimal Bottom Name */}
      <div className="w-full text-center py-10 bg-[#0a0f0d] relative z-10 overflow-hidden mt-auto">
        <h2
          className="text-5xl md:text-[9rem] font-black select-none uppercase tracking-widest leading-none"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(6,95,70,0.8), #0a0f0d)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
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

export default Home;