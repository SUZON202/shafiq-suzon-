import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAe_LswYtUbpYNwUuuv0UipkXHCAul8M20",
  authDomain: "shafiqsuzon-portfolio.firebaseapp.com",
  projectId: "shafiqsuzon-portfolio",
  storageBucket: "shafiqsuzon-portfolio.firebasestorage.app",
  messagingSenderId: "748163386377",
  appId: "1:748163386377:web:beaf917cf54485f7d23cd8",
  measurementId: "G-G2R4WSSSH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// এখান থেকে শুধু app এক্সপোর্ট করতে হবে
export default app;