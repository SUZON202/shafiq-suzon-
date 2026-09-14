import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // কাস্টম প্রিমিয়াম লোডিং স্পিনার 
    if (loading) {
        return (
            <div className="min-h-screen bg-[#030712] flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
            </div>
        );
    }

    // ইউজার লগইন করা থাকলে ড্যাশবোর্ডে যেতে দিবে
    if (user) {
        return children;
    }

    // ইউজার না থাকলে লগইন পেজে পাঠিয়ে দিবে
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;