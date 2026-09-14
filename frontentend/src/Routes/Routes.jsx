import { createBrowserRouter } from "react-router-dom";
import Root from "../Lay out/Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Service";
import Skill from "../pages/Skill";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Rejestion from "../pages/Rejestion";
import Dashboard from "../pages/Dashboard"; 
import PrivateRoute from "./PrivateRoute"; // PrivateRoute ইম্পোর্ট করা হলো

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/skill",
        element: <Skill />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register", 
        element: <Rejestion />,
      },
      {
        path: "/dashboard", 
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ), // ড্যাশবোর্ডকে PrivateRoute দিয়ে প্রটেক্ট করা হলো
      },
    ],
  },
]);

export default router;