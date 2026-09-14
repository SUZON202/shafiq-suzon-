import React, { useContext, useState, useEffect } from "react";
import { LogOut, LayoutDashboard, Users, Briefcase, ChevronRight, Edit2, Trash2, MessageSquare, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../firebase.config";
import Swal from 'sweetalert2';
import { AuthContext } from "../Providers/AuthProvider"; 

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  const [usersList, setUsersList] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    // Users Fetch
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsersList(data))
      .catch(err => console.error("Error fetching users:", err));

    // Messages Fetch
    fetch('http://localhost:5000/contact-messages')
      .then(res => res.json())
      .then(data => setContactMessages(data))
      .catch(err => console.error("Error fetching messages:", err));

    // Projects Fetch
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      Swal.fire({
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        icon: "success",
        background: "#0d1310",
        color: "#fff",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#34d399",
      });
      navigate("/login"); 
    });
  };

  // ==========================================
  // ইউজার ডিলিট করার ফাংশন
  // ==========================================
  const handleDeleteUser = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      background: "#0d1310",
      color: "#fff",
      confirmButtonColor: "#ef4444", 
      cancelButtonColor: "#374151",  
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              const remainingUsers = usersList.filter(u => (u._id || u.id) !== id);
              setUsersList(remainingUsers);
              Swal.fire({ 
                title: "Deleted!", 
                text: `${name} has been removed.`, 
                icon: "success", 
                background: "#0d1310", 
                color: "#fff", 
                showConfirmButton: false, 
                timer: 2000, 
                iconColor: "#34d399" 
              });
            }
          })
          .catch(err => console.error("Error deleting user:", err));
      }
    });
  };

  // ==========================================
  // ইউজার রোল আপডেট করার ফাংশন
  // ==========================================
  const handleRoleUpdate = (id, name, currentRole) => {
    Swal.fire({
      title: `Change Role for ${name}`,
      input: 'select',
      inputOptions: {
        'admin': 'Admin',
        'sub admin': 'Sub Admin',
        'user': 'Standard User'
      },
      inputValue: (currentRole || 'user').toLowerCase(),
      showCancelButton: true,
      background: "#0d1310",
      color: "#fff",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#374151",
      confirmButtonText: "Update Role"
    }).then((result) => {
      if (result.isConfirmed) {
        const newRole = result.value;

        fetch(`http://localhost:5000/users/role/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: newRole })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const updatedUsers = usersList.map(u => 
              (u._id || u.id) === id ? { ...u, role: newRole } : u
            );
            setUsersList(updatedUsers);
            Swal.fire({ 
              title: "Updated!", 
              text: `${name}'s role changed to ${newRole}.`, 
              icon: "success", 
              background: "#0d1310", 
              color: "#fff", 
              showConfirmButton: false, 
              timer: 2000, 
              iconColor: "#34d399" 
            });
          }
        })
        .catch(err => console.error("Error updating role:", err));
      }
    });
  };

  const handleDeleteMessage = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this message?",
      icon: "warning",
      showCancelButton: true,
      background: "#0d1310",
      color: "#fff",
      confirmButtonColor: "#ef4444", 
      cancelButtonColor: "#374151",  
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/contact-messages/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            const remainingMessages = contactMessages.filter(msg => (msg._id || msg.id) !== id);
            setContactMessages(remainingMessages);
            Swal.fire({ title: "Deleted!", text: "Message has been removed.", icon: "success", background: "#0d1310", color: "#fff", showConfirmButton: false, timer: 2000, iconColor: "#34d399" });
          }
        });
      }
    });
  };

  const handleAddProject = () => {
    Swal.fire({
      title: "Add New Project",
      html: `
        <input id="proj-title" class="swal2-input" placeholder="Project Title" style="background: #111827; color: white; border: 1px solid #374151; width: 80%; margin-bottom: 10px;">
        <input id="proj-desc" class="swal2-input" placeholder="Short Description" style="background: #111827; color: white; border: 1px solid #374151; width: 80%; margin-bottom: 10px;">
        <input id="proj-img" class="swal2-input" placeholder="Image URL" style="background: #111827; color: white; border: 1px solid #374151; width: 80%; margin-bottom: 10px;">
        <input id="proj-live" class="swal2-input" placeholder="Live Demo Link" style="background: #111827; color: white; border: 1px solid #374151; width: 80%; margin-bottom: 10px;">
        <input id="proj-git" class="swal2-input" placeholder="GitHub Link" style="background: #111827; color: white; border: 1px solid #374151; width: 80%; margin-bottom: 10px;">
      `,
      background: "#0d1310",
      color: "#fff",
      showCancelButton: true,
      confirmButtonText: "Save Project",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#374151",
      preConfirm: () => {
        const title = document.getElementById('proj-title').value;
        const description = document.getElementById('proj-desc').value;
        const imageUrl = document.getElementById('proj-img').value;
        const liveLink = document.getElementById('proj-live').value;
        const githubLink = document.getElementById('proj-git').value;
        
        if (!title) {
          Swal.showValidationMessage('Project Title is required!');
          return false;
        }
        return { title, description, imageUrl, liveLink, githubLink };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:5000/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.value)
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProjects([data.project, ...projects]);
            Swal.fire({ title: "Success!", text: "Project added successfully.", icon: "success", background: "#0d1310", color: "#fff", showConfirmButton: false, timer: 2000, iconColor: "#34d399" });
          }
        });
      }
    });
  };

  const handleDeleteProject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this project?",
      icon: "warning",
      showCancelButton: true,
      background: "#0d1310",
      color: "#fff",
      confirmButtonColor: "#ef4444", 
      cancelButtonColor: "#374151",  
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/projects/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            const remaining = projects.filter(proj => (proj._id || proj.id) !== id);
            setProjects(remaining);
            Swal.fire({ title: "Deleted!", text: "Project has been removed.", icon: "success", background: "#0d1310", color: "#fff", showConfirmButton: false, timer: 2000, iconColor: "#34d399" });
          }
        });
      }
    });
  };

  const getInitials = (name, email) => {
    if (name) {
      const nameParts = name.split(" ");
      if (nameParts.length > 1) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      return name.substring(0, 2).toUpperCase();
    }
    if (email) return email.substring(0, 2).toUpperCase();
    return "US"; 
  };

  const userInitials = getInitials(user?.displayName, user?.email);
  const userName = user?.displayName || "User";

  const filteredUsers = usersList.filter((userItem) => {
    const role = (userItem.role || "User").toLowerCase();
    if (selectedRole === "All") return true;
    if (selectedRole === "Admin") return role === "admin";
    if (selectedRole === "Sub Admin") return role === "sub admin" || role === "sub-admin";
    if (selectedRole === "User") return role === "user" || (role !== "admin" && role !== "sub admin" && role !== "sub-admin");
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white flex font-sans overflow-hidden selection:bg-emerald-500/30">
      
      {/* Ambient Background */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      {/* Sidebar */}
      <aside className="w-72 m-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl flex flex-col relative z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className="p-8 flex items-center gap-4 border-b border-white/[0.05]">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-gray-900 text-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] overflow-hidden">
            {user?.photoURL ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" /> : userInitials}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-200 truncate">{userName}</h2>
            <p className="text-[10px] text-emerald-400 font-medium truncate mt-0.5">{user?.email || "Admin Panel"}</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-4 ml-2">Menu</p>
          <a href="#" className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-transparent text-emerald-400 border border-emerald-500/20 font-semibold transition-all group">
            <div className="flex items-center gap-3"><LayoutDashboard size={18} /> Dashboard</div>
            <ChevronRight size={16} />
          </a>
          <a href="#projects-section" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-gray-400 hover:text-gray-100 hover:bg-white/[0.03] transition-all font-medium group">
            <Briefcase size={18} className="group-hover:text-emerald-400" /> Projects
          </a>
          <a href="#users-section" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-gray-400 hover:text-gray-100 hover:bg-white/[0.03] transition-all font-medium group">
            <Users size={18} className="group-hover:text-emerald-400" /> Users List
          </a>
        </nav>

        <div className="p-6">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold uppercase text-xs">
            <LogOut size={16} /> System Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-6 pr-6 relative z-10 overflow-y-auto scroll-smooth">
        
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl rounded-3xl p-6 mb-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div>
            <p className="text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">Welcome Back, {userName.split(" ")[0]}</p>
            <h1 className="text-2xl font-black uppercase tracking-wide text-gray-100">Command Center</h1>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.05] backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20"><Briefcase size={64} className="text-emerald-400" /></div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Active Projects</p>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 relative z-10">{projects.length}</p>
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.05] backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20"><Users size={64} className="text-teal-400" /></div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Total Users</p>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 relative z-10">{usersList.length}</p>
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.05] backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20"><MessageSquare size={64} className="text-purple-400" /></div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Total Messages</p>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 relative z-10">{contactMessages.length}</p>
          </div>
        </div>

        {/* Project Management Section */}
        <div id="projects-section" className="rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] mb-8">
          <div className="flex items-center justify-between mb-6 px-2">
            <div>
              <h2 className="text-lg font-bold text-gray-100 uppercase tracking-wide flex items-center gap-2">
                <Briefcase size={18} className="text-emerald-400" /> Projects Management
              </h2>
              <p className="text-xs text-gray-400 mt-1">Manage your portfolio projects directly from here.</p>
            </div>
            <button 
              onClick={handleAddProject}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#030712] text-xs font-bold px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.05] text-gray-400 text-[10px] uppercase tracking-[0.15em]">
                  <th className="py-4 px-4 font-semibold">Project Info</th>
                  <th className="py-4 px-4 font-semibold">Description</th>
                  <th className="py-4 px-4 font-semibold">Links</th>
                  <th className="py-4 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((proj) => (
                    <tr key={proj._id || proj.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-3">
                          {proj.imageUrl && (
                            <img src={proj.imageUrl} alt={proj.title} className="w-12 h-12 rounded-lg object-cover border border-white/[0.1]" />
                          )}
                          <p className="text-sm font-semibold text-gray-200">{proj.title}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-400 max-w-xs truncate">
                        {proj.description || "No description provided."}
                      </td>
                      <td className="py-4 px-4 text-xs">
                        <div className="flex flex-col gap-1">
                          {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Live Demo</a>}
                          {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:underline">GitHub</a>}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center align-top">
                        <button 
                          onClick={() => handleDeleteProject(proj._id || proj.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
                          title="Delete Project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500 text-xs uppercase tracking-widest">
                      No projects found. Add your first project!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Data Table Section */}
        <div id="users-section" className="rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] mb-8">
          <div className="flex items-center justify-between mb-6 px-2">
            <div>
              <h2 className="text-lg font-bold text-gray-100 uppercase tracking-wide">User Management Center</h2>
            </div>
            
            {/* 🟢 এখানে নতুন ফিল্টার ড্রপডাউন যোগ করা হয়েছে 🟢 */}
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 text-gray-300 text-xs font-bold rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Users</option>
              <option value="Admin">Admins</option>
              <option value="Sub Admin">Sub Admins</option>
              <option value="User">Users</option>
            </select>
            {/* ------------------------------------------------ */}

          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                <tr className="border-b border-white/[0.05] text-gray-400 text-[10px] uppercase tracking-[0.15em]">
                  <th className="py-4 px-4 font-semibold">User Info</th>
                  <th className="py-4 px-4 font-semibold">Role</th>
                  <th className="py-4 px-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((userItem) => (
                    <tr key={userItem._id || userItem.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold">{getInitials(userItem.name, userItem.email)}</div>
                          <div>
                            <p className="text-sm font-semibold text-gray-200">{userItem.name}</p>
                            <p className="text-xs text-gray-500">{userItem.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        {userItem.role || "User"}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleRoleUpdate(userItem._id || userItem.id, userItem.name, userItem.role)} 
                            className="p-2 text-gray-400 hover:text-emerald-400 transition-colors"
                            title="Edit Role"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(userItem._id || userItem.id, userItem.name)} 
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="py-8 text-center text-gray-500 text-xs">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Messages Section */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-lg font-bold text-gray-100 uppercase tracking-wide flex items-center gap-2">
              <MessageSquare size={18} className="text-emerald-400" /> Contact Messages
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                <tr className="border-b border-white/[0.05] text-gray-400 text-[10px] uppercase tracking-[0.15em]">
                  <th className="py-4 px-4 font-semibold">Sender Name & Email</th>
                  <th className="py-4 px-4 font-semibold">Message</th>
                  <th className="py-4 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {contactMessages.length > 0 ? (
                  contactMessages.map((msg) => (
                    <tr key={msg._id || msg.id} className="border-b border-white/[0.02] hover:bg-white/[0.02]">
                      <td className="py-4 px-4">
                        <p className="text-sm font-semibold text-gray-200">{msg.name}</p>
                        <p className="text-xs text-emerald-400">{msg.email}</p>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-300 max-w-md">{msg.message}</td>
                      <td className="py-4 px-4 text-center">
                        <button onClick={() => handleDeleteMessage(msg._id || msg.id)} className="p-2 text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="py-8 text-center text-gray-500 text-xs">No messages.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </main>
    </div>
  );
}