import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const skillsList = [
  "FULL STACK WEB DEVELOPER",
  "REACT • NODE.JS",
  "TAILWIND CSS",
  "MONGODB • EXPRESS",
  "FIREBASE AUTHENTICATION",
  "FRONTEND DEVELOPMENT",
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "shafiqsuzon1@gmail.com", link: "mailto:shafiqsuzon1@gmail.com" },
  { icon: Phone, label: "Phone", value: "+8801743-915498", link: "tel:+8801743-915498" },
  { icon: FaWhatsapp, label: "WhatsApp", value: "+8801743-915498", link: "https://wa.me/8801743-915498" }, 
  { icon: MapPin, label: "Location", value: "Rajshahi, Bangladesh", link: "#" },
];

const socials = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaWhatsapp, href: "https://wa.me/8801743-915498", label: "WhatsApp" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // সরাসরি ফর্মের এলিমেন্ট থেকে ডাটা নেওয়া হচ্ছে (কোনো স্টেট মিসম্যাচ হবে না)
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch('https://shafiq-suzon.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        e.target.reset(); // ফর্ম সফলভাবে রিসেট হবে
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      setStatus("error");
    }
    
    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  return (
    <div className="contact-page bg-[#0a0f0d] text-white min-h-screen flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Marquee Strip (Alternating Colors) */}
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

      {/* Header Section */}
      <header className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-20 pb-14 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[2px] bg-emerald-400" />
          <span className="text-emerald-400 text-xs tracking-[0.3em] font-semibold uppercase">
            Get In Touch
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter uppercase max-w-3xl">
          Let's Work{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            Together
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mt-6">
          Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </header>

      {/* Contact Content Section */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-24 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Left Side: Contact Info & Socials */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Contact Information Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase tracking-wide text-white mb-6">Contact Info</h3>
              {contactInfo.map(({ icon: Icon, label, value, link }) => (
                <a 
                  key={label} 
                  href={link}
                  target={label === "WhatsApp" ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="flex items-center gap-5 p-5 rounded-2xl bg-[#0d1310]/80 border border-emerald-900/40 hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">{label}</p>
                    <p className="text-base text-gray-200 font-medium group-hover:text-emerald-400 transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-black uppercase tracking-wide text-white mb-5">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {socials.map(({ icon: Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-12 h-12 rounded-xl bg-[#0d1310]/80 border border-emerald-900/40 flex items-center justify-center text-gray-400 hover:border-emerald-400 hover:text-emerald-400 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(52,211,153,0.15)] transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/40 rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white mb-8">Send a Message</h3>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Name <span className="text-emerald-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Email <span className="text-emerald-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project Inquiry"
                  className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
                />
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Message <span className="text-emerald-500">*</span></label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300 resize-none"
                />
              </div>

              {/* Status Messages */}
              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-sm font-medium">
                  Something went wrong. Please try again.
                </div>
              )}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> Message sent successfully! I will get back to you soon.
                </div>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-400 text-[#0a0f0d] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-emerald-300 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer Navigation Section */}
      <section className="border-t border-emerald-900/40 bg-[#0d1310]/50 backdrop-blur-lg relative z-10 mt-auto">
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
              <a href="/contact" className="text-emerald-400 text-sm font-semibold">Contact</a>
            </div>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Find Me On</p>
            <div className="flex gap-3 justify-center md:justify-start">
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

      {/* Large Background Name Footer */}
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