import React, { useState, useContext } from "react";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { FaGithub, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2';
import { AuthContext } from "../Providers/AuthProvider"; // AuthProvider ইম্পোর্ট করা হলো

const skillsList = [
  "FULL STACK WEB DEVELOPER",
  "REACT • NODE.JS",
  "TAILWIND CSS",
  "MONGODB • EXPRESS",
  "FIREBASE AUTHENTICATION",
  "FRONTEND DEVELOPMENT",
];

const passwordRules = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
];

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  
  // Context থেকে ফাংশনগুলো আনা হলো
  const { createUser, googleSignIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const strength = passwordRules.filter((r) => r.test(form.password)).length;
  const strengthColor =
    strength === 0 ? "bg-gray-700" : strength === 1 ? "bg-red-500" : strength === 2 ? "bg-amber-400" : "bg-emerald-400";

  // ইমেইল ও পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (strength < 3) {
      setError("Password doesn't meet all requirements.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms & Privacy Policy.");
      return;
    }

    // AuthContext এর createUser ফাংশন ব্যবহার
    createUser(form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // ইউজারের নাম আপডেট করা
        updateProfile(user, {
          displayName: form.name
        }).then(() => {
          Swal.fire({
            title: "Account Created!",
            text: `Welcome to the team, ${form.name}!`,
            icon: "success",
            background: "#0d1310",
            color: "#fff",
            showConfirmButton: false,
            timer: 1500,
            iconColor: "#34d399",
          }).then(() => {
            navigate("/dashboard"); 
          });
        });
      })
      .catch((error) => {
        console.error("Registration Error:", error.message);
        if (error.code === 'auth/email-already-in-use') {
          setError("Email is already registered. Please login.");
        } else {
          setError(error.message.replace("Firebase: ", ""));
        }
      });
  };

  // Google পপ-আপ রেজিস্ট্রেশন
  const handleGoogleRegister = () => {
    setError(""); 
    
    // AuthContext এর googleSignIn ফাংশন ব্যবহার
    googleSignIn()
      .then((result) => {
        const user = result.user;
        
        Swal.fire({
          title: "Registration Successful!",
          text: `Welcome, ${user.displayName}!`,
          icon: "success",
          background: "#0d1310",
          color: "#fff",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#34d399",
        }).then(() => {
          navigate("/dashboard"); 
        });
      })
      .catch((error) => {
        console.error("Google Signup Error:", error);
        setError("Failed to sign up with Google.");
      });
  };

  return (
    <div className="register-page bg-[#0a0f0d] text-white min-h-screen flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Marquee Strip */}
      <div className="marquee-strip border-y border-emerald-900/40 bg-[#0d1310] py-3 relative z-10">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {skillsList.map((item, idx) => (
                <span key={idx} className={`mx-6 text-sm tracking-widest font-medium uppercase ${idx % 2 === 0 ? "text-emerald-500" : "text-gray-600"}`}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Register Form Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-lg">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-emerald-400/40 flex items-center justify-center font-black text-emerald-400 text-xl shadow-[0_0_15px_rgba(52,211,153,0.2)] mb-6">
              SS
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
              Create your <span className="text-emerald-400">Account</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm">
              Join and start building something great
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/40 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Full Name</label>
              <div className="relative flex items-center">
                <User size={18} className="absolute left-4 text-gray-500" />
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Shafiq Suzon" className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl pl-12 pr-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Email</label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4 text-gray-500" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl pl-12 pr-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Password</label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4 text-gray-500" />
                <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Create a password" className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl pl-12 pr-12 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-500 hover:text-emerald-400 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {form.password && (
                <div className="mt-4 p-4 rounded-xl bg-[#0a0f0d] border border-emerald-900/20 space-y-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < strength ? strengthColor : "bg-gray-800"}`} />
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {passwordRules.map((rule) => {
                      const passed = rule.test(form.password);
                      return (
                        <div key={rule.label} className={`flex items-center gap-2 text-xs font-medium ${passed ? "text-emerald-400" : "text-gray-500"}`}>
                          <CheckCircle2 size={14} />
                          {rule.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Confirm password</label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4 text-gray-500" />
                <input type={showPassword ? "text" : "password"} name="confirm" value={form.confirm} onChange={handleChange} placeholder="Re-enter your password" className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl pl-12 pr-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300" />
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer mt-4">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-700 bg-gray-900 accent-emerald-400" />
              <span className="leading-relaxed">
                I agree to the <a href="#" className="text-emerald-400 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-400 font-semibold hover:underline">Privacy Policy</a>
              </span>
            </label>

            {error && (
              <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <button type="submit" className="w-full flex items-center justify-center gap-3 bg-emerald-400 text-[#0a0f0d] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-emerald-300 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
              Create Account
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-emerald-900/40"></div>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Or sign up with</span>
              <div className="flex-1 h-px bg-emerald-900/40"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={handleGoogleRegister} className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-emerald-900/40 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-900/10 transition-all duration-300 font-semibold text-sm">
                <FaGoogle size={16} /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-emerald-900/40 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-900/10 transition-all duration-300 font-semibold text-sm">
                <FaGithub size={16} /> GitHub
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 pt-4">
              Already have an account? <a href="/login" className="text-emerald-400 font-bold hover:underline">Login</a>
            </p>
          </form>
        </div>
      </section>

      {/* Footer (Navigation, Social, etc.) */}
      <section className="border-t border-emerald-900/40 bg-[#0d1310]/50 backdrop-blur-lg relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="col-span-2 md:col-span-1">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Shafiq Suzon</p>
            <p className="text-gray-500 text-xs uppercase leading-relaxed">Web developer building custom digital solutions in Rajshahi.</p>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Navigation</p>
            <div className="flex flex-col gap-1.5">
              <a href="/" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Home</a>
              <a href="/about" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">About</a>
              <a href="/project" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Projects</a>
              <a href="/contact" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Find Me On</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-lg bg-[#0d1310]/80 border border-emerald-900/50 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-400 transition-all duration-300"><FaLinkedinIn size={16} /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-[#0d1310]/80 border border-emerald-900/50 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-400 transition-all duration-300"><FaGithub size={16} /></a>
            </div>
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
            <p className="text-gray-300 text-sm">Rajshahi, Bangladesh<br /><span className="text-gray-500">Remote & On-site</span></p>
          </div>
        </div>
      </section>

      <div className="w-full text-center py-10 bg-[#0a0f0d] relative z-10 overflow-hidden">
        <h2 className="text-5xl md:text-[9rem] font-black select-none uppercase tracking-widest leading-none" style={{ backgroundImage: "linear-gradient(to bottom, rgba(6,95,70,0.8), #0a0f0d)", WebkitBackgroundClip: "text", color: "transparent" }}>
          Shafiq Suzon
        </h2>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}