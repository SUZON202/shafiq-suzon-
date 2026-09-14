import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// আপনার পেজগুলোর ইম্পোর্ট (আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী পাথ ঠিক আছে কিনা একবার দেখে নিবেন)
import Home from "./pages/Home";
import About from "./pages/About";
import SkillsPage from "./pages/SkillsPage"; 
import ServicesPage from "./pages/ServicesPage"; 
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// যদি আপনার আলাদা কোনো Header/Navbar কম্পোনেন্ট থাকে, তাহলে নিচের লাইনটি আনকমেন্ট করে ব্যবহার করতে পারেন
// import Header from "./components/Header"; 

function App() {
  return (
    <Router>
      {/* <Header />  যদি হেডার আলাদা কম্পোনেন্ট হয়, তাহলে এটি এখানে রাখতে পারেন */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skill" element={<SkillsPage />} />
        <Route path="/service" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      
      {/* আপনার পছন্দ অনুযায়ী এখানে কোনো <Footer /> রাখা হয়নি */}
    </Router>
  );
}

export default App;