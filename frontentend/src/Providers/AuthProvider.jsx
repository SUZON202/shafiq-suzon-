// src/Providers/AuthProvider.jsx
import React, { createContext, useEffect, useState } from 'react';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";
import app from '../firebase.config'; // আপনার firebase.config.js ফাইলের পাথ দিন

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ১. ইমেইল/পাসওয়ার্ড দিয়ে রেজিস্টার
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // ২. ইমেইল/পাসওয়ার্ড দিয়ে লগইন
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // ৩. গুগল দিয়ে লগইন
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // ৪. লগআউট
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // ইউজারের অবস্থা ট্র্যাক করা
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current User:', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;