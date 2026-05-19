import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { 
    FaUser, FaPlusCircle, FaList, FaHome, FaSignOutAlt, 
    FaBars, FaTimes, FaStar, FaBell, FaMoon, FaSun, FaUsers, FaTasks 
} from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import useRole from '../hooks/useRole';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const { role } = useRole();

    // Theme logic
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const handleLogOut = () => {
        logOutUser();
        toast.success("LogOut successful!");
    };

    const getNavLinks = () => {
        const links = [
            { to: "/", label: "Home", icon: <FaHome /> },
            { to: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
        ];

        if (role === "admin") {
            links.push(
                { to: "/dashboard/manageUsers", label: "Manage Users", icon: <FaUsers /> },
                { to: "/dashboard/manageProperties", label: "Manage Properties", icon: <FaTasks /> },
                { to: "/dashboard/manageReviews", label: "Manage Reviews", icon: <FaStar /> },
                { to: "/dashboard/manageAllOverview", label: "Admin Overview", icon: <FaUsers /> },
                { to: "/dashboard/manageMessages", label: "User Messages", icon: <FaBell /> }
            );
        }

        if (role === "seller") {
            links.push(
                { to: "/dashboard/add-property", label: "Add Property", icon: <FaPlusCircle /> },
                { to: "/dashboard/my-addedProperties", label: "My Properties", icon: <FaList /> }
            );
        }

        if (role === "buyer") {
            links.push(
                { to: "/dashboard/my-booking", label: "My Bookings", icon: <FaBell /> }
            );
        }

        return links;
    };

    const navLinks = getNavLinks();

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans transition-colors duration-300 bg-slate-50 dark:bg-[#0F172A]">
            
            {/* Mobile Header */}
            <div className="md:hidden border-b border-slate-100 dark:border-slate-800/80 p-4 flex justify-between items-center z-50 shrink-0 bg-white dark:bg-[#1E293B]">
                <Link to="/" className="flex items-center gap-3">
                    <img src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png" className="w-8 h-8" alt="logo" />
                    <span className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-tighter italic">Property Hub</span>
                </Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-xl text-slate-700 dark:text-slate-350 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar */}
            <aside 
                className={`
                    fixed inset-y-0 left-0 z-40 border-r border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#1E293B]
                    transition-all duration-300 ease-in-out group flex flex-col
                    ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}
                    md:relative md:translate-x-0 md:w-20 md:hover:w-64 shrink-0
                `}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800/80 shrink-0 overflow-hidden">
                    <Link className="flex items-center gap-3 min-w-max" to="/">
                        <img src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png" className="w-9 h-9" alt="logo" />
                        <div className="leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-black text-base text-indigo-600 dark:text-indigo-400 tracking-tighter uppercase italic">PropertyHub</span>
                        </div>
                    </Link>
                </div>

                {/* Role Specific Profile Badge */}
                {user && (
                    <div className="p-4 mx-3 my-6 rounded-2xl flex items-center gap-3 bg-indigo-50/80 dark:bg-slate-900/60 border border-indigo-100/50 dark:border-slate-800/80 overflow-hidden transition-all duration-300">
                        <div className="min-w-[40px]">
                            <img src={user?.photoURL} className="w-10 h-10 rounded-xl object-cover border-2 border-indigo-500 shadow-sm" alt="user" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-max">
                            <p className="text-xs font-black text-slate-800 dark:text-white truncate uppercase tracking-tight leading-none">{user?.displayName}</p>
                            <p className={`text-[9px] font-black uppercase tracking-widest mt-1.5 ${role === 'admin' ? 'text-rose-500' : role === 'seller' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                {role || 'Guest'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Nav Links */}
                <nav className="flex-1 px-3 space-y-2 overflow-y-auto scrollbar-hide">
                  {navLinks.map((link) => (
                      <NavLink 
                          key={link.to}
                          to={link.to} 
                          onClick={() => setIsSidebarOpen(false)}
                          className={({ isActive }) => `
                              flex items-center gap-4 px-3.5 py-3.5 rounded-xl transition-all duration-300
                              ${isActive 
                                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/10' 
                                  : 'text-slate-500 dark:text-slate-450 hover:bg-slate-55 dark:hover:bg-slate-900/60 hover:text-indigo-650 dark:hover:text-indigo-400'}
                          `}
                      >
                          <span className="text-lg shrink-0">{link.icon}</span>
                          <span className="text-xs font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                              {link.label}
                          </span>
                      </NavLink>
                  ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">
                    <button 
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-4 py-3.5 text-rose-550 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl font-black transition-all cursor-pointer overflow-hidden"
                    >
                        <div className="min-w-[40px] flex justify-center text-lg"><FaSignOutAlt /></div>
                        <span className="text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="hidden md:flex p-6 justify-between items-center border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#1E293B]">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                        {role} <span className="text-indigo-600 dark:text-indigo-400">Portal</span>
                    </h2>
                    
                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-3 border border-slate-205 dark:border-slate-800 rounded-xl text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer">
                            {theme === "light" ? <FaMoon /> : <FaSun className="text-amber-400 animate-pulse" />}
                        </button>
                        <img src={user?.photoURL} className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shadow-sm" alt="" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-slate-50 dark:bg-[#0F172A]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;