import React, { useState, useContext } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const navigate = useNavigate(); 
  
  // Context থেকে ফাংশনগুলো আনা হলো
  const { signIn, googleSignIn } = useContext(AuthContext);

  // ইমেইল-পাসওয়ার্ড লগইন
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter a valid email and password.");
      return;
    }
    setErrorMsg("");
    
    // AuthContext এর signIn ফাংশন ব্যবহার
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back!`,
          icon: "success",
          background: "#0d1310",
          color: "#fff",
          showConfirmButton: false, // OK বাটন লুকানো হলো
          timer: 1500, // ১.৫ সেকেন্ড পর নিজে থেকে গায়েব হবে
          iconColor: "#34d399",
        }).then(() => {
          navigate("/dashboard"); 
        });
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setErrorMsg(error.message.replace("Firebase: ", ""));
      });
  };

  // Google পপ-আপ লগইন
  const handleGoogleLogin = () => {
    setErrorMsg(""); 
    
    // AuthContext এর googleSignIn ফাংশন ব্যবহার
    googleSignIn()
      .then((result) => {
        const user = result.user;
        
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${user.displayName}!`,
          icon: "success",
          background: "#0d1310",
          color: "#fff",
          showConfirmButton: false, // OK বাটন লুকানো হলো
          timer: 1500, // ১.৫ সেকেন্ড পর নিজে থেকে গায়েব হবে
          iconColor: "#34d399",
        }).then(() => {
          navigate("/dashboard"); 
        });
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        setErrorMsg("Failed to login with Google. Please try again.");
      });
  };

  return (
    <div className="login-page bg-[#0a0f0d] text-white min-h-screen flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Glowing Blobs */}
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

      {/* Main Login Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-10 py-16 relative z-10">
        <div className="w-full max-w-5xl bg-[#0d1310]/80 backdrop-blur-md border border-emerald-900/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Left Side - Branding */}
          <div className="md:w-5/12 p-10 md:p-14 bg-gradient-to-br from-emerald-900/20 to-transparent border-b md:border-b-0 md:border-r border-emerald-900/40 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-emerald-400" />
              <span className="text-emerald-400 text-xs tracking-[0.3em] font-semibold uppercase">
                Welcome Back
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase text-white mb-4">
              Login to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                Continue
              </span>
            </h1>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm">
              Access your dashboard, manage your projects, and stay connected with everything in one place.
            </p>

            <div className="w-16 h-16 rounded-full border-2 border-emerald-400/40 flex items-center justify-center font-black text-emerald-400 text-xl shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              SS
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-7/12 p-10 md:p-14">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white mb-2">
              Sign in to your account
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Enter your credentials below to continue
            </p>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Email</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-gray-500" size={18} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl pl-12 pr-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-semibold tracking-widest uppercase ml-1">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-gray-500" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0a0f0d] border border-emerald-900/40 rounded-xl pl-12 pr-12 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-500 hover:text-emerald-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors">
                  <input type="checkbox" className="accent-emerald-400 w-4 h-4 rounded border-gray-700 bg-gray-900" />
                  Remember me
                </label>
                <a href="#" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-emerald-400 text-[#0a0f0d] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-emerald-300 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
              >
                Login
              </button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-emerald-900/40"></div>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Or continue with</span>
              <div className="flex-1 h-px bg-emerald-900/40"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                type="button" 
                onClick={handleGoogleLogin} 
                className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-emerald-900/40 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-900/10 transition-all duration-300 font-semibold text-sm"
              >
                <FaGoogle size={16} /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-emerald-900/40 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-900/10 transition-all duration-300 font-semibold text-sm">
                <FaGithub size={16} /> GitHub
              </button>
            </div>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="text-emerald-400 font-bold hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>

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
              <a href="/contact" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Contact</a>
              <a href="/register" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">Register</a>
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