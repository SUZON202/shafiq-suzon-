import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider'; 
import Swal from 'sweetalert2';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    // লগআউট হ্যান্ডেল করার ফাংশন (টাইমার যুক্ত করা হলো)
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been safely logged out.",
                    icon: "success",
                    background: "#0d1310",
                    color: "#fff",
                    showConfirmButton: false, // OK বাটন লুকানো হলো
                    timer: 1500, // ১.৫ সেকেন্ড পর নিজে থেকে গায়েব হবে
                    iconColor: "#34d399",
                });
            })
            .catch(error => console.error(error));
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/skill">Skill</NavLink></li>
            <li><NavLink to="/service">Service</NavLink></li>
            <li><NavLink to="/project">Projects</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            
            {/* কন্ডিশনাল রেন্ডারিং */}
            {user ? (
                <>
                    <li><NavLink to="/dashboard" className="text-emerald-400 font-semibold">Dashboard</NavLink></li>
                    <li><button onClick={handleLogOut} className="hover:text-red-400">Logout</button></li>
                </>
            ) : (
                <>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-black/30 backdrop-blur-md border-b border-white/10 text-gray-100 sticky top-0 z-50 shadow-lg px-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-900 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold tracking-wider">Shafiq Suzon</a>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    {navLinks}
                </ul>
            </div>
            
            <div className="navbar-end flex items-center gap-4">
                {user && (
                    <div className="hidden lg:flex w-10 h-10 rounded-full border-2 border-emerald-400/40 items-center justify-center font-bold text-emerald-400 bg-[#0a0f0d]">
                        SS
                    </div>
                )}
                <a className="btn btn-outline border-white/30 text-white hover:bg-white hover:text-black">Hire Me</a>
            </div>
        </div>
    );
};

export default Header;