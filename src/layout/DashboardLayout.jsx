import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaUser, FaPlusCircle, FaList, FaHome, FaSignOutAlt, FaBars, FaTimes, FaStar, FaBell, FaMoon, FaSun } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    // Theme logic
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (theme === "dark") html.classList.add("dark");
        else html.classList.remove("dark");
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const handleLogOut = () => {
        logOutUser();
        toast.success("LogOut successful!");
    };

    const navLinks = [
        { to: "/", label: "Back to Home", icon: <FaHome /> },
        { to: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
        { to: "/dashboard/add-property", label: "Add Property", icon: <FaPlusCircle /> },
        { to: "/dashboard/my-addedProperties", label: "My Properties", icon: <FaList /> },
        { to: "/dashboard/my-booking", label: "My Bookings", icon: <FaBell /> },
        {to: "/dashboard/manageUsers", label: "Manage Users", icon: <FaStar /> },
    ];

    return (
        /* Main container (fixed height, no scroll) */
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans transition-colors duration-300">
            
            {/* Mobile Header */}
            <div className="md:hidden border-b border-gray-800 p-4 flex justify-between items-center z-50 shrink-0">
                <Link to="/" className="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png" className="w-8" alt="logo" />
                    <span className="font-bold tracking-tight">Property Hub</span>
                </Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl ">
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar (hover to expand) */}
            <aside 
                className={`
                    fixed inset-y-0 left-0 z-40 border-r border-gray-800 
                    transition-all duration-300 ease-in-out group flex flex-col
                    ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}
                    md:relative md:translate-x-0 md:w-20 md:hover:w-64 shrink-0
                `}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-gray-800/50 shrink-0 overflow-hidden">
                    <Link className="flex items-center gap-3 min-w-max" to="/">
                        <img src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png" className="w-9 h-9" alt="logo" />
                        <div className="leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-bold text-lg tracking-tight whitespace-nowrap">Property Hub</span>
                            <span className="text-[10px] block opacity-40 uppercase font-medium">Dashboard</span>
                        </div>
                    </Link>
                </div>

                {/* Profile Section */}
                {user && (
                    <div className="p-4 mx-2 my-6 rounded-xl flex items-center gap-3 shrink-0 overflow-hidden group-hover:mx-4 transition-all bg-gray-800/20">
                        <div className="relative min-w-[40px]">
                            <img src={user?.photoURL} className="w-10 h-10 rounded-full object-cover border border-gray-700" alt="user" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                        </div>
                        <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-max">
                            <p className="text-xs font-bold truncate">{user?.displayName}</p>
                            <p className="text-[10px] text-green-500 font-semibold uppercase tracking-wider">Buyer</p>
                        </div>
                    </div>
                )}

                {/* Nav Links */}
                <nav className="flex-1 px-3 space-y-1 mt-2 overflow-y-auto overflow-x-hidden group-hover:px-4 transition-all scrollbar-hide">
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.to}
                            to={link.to} 
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 min-w-max
                                ${isActive ? 'font-semibold  bg-indigo-600/10' : 'hover:bg-gray-800/50'}
                            `}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-800 shrink-0">
                    <button 
                        onClick={handleLogOut}
                        className="w-full flex items-center justify-start group-hover:justify-center gap-4 py-3 hover:bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold transition-all duration-300 overflow-hidden"
                    >
                        <div className="flex items-center justify-center min-w-[40px] group-hover:min-w-0 transition-all duration-300">
                            <FaSignOutAlt className="text-lg shrink-0" />
                        </div>
                        <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-max">
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                
                {/* Desktop Header */}
                <header className="hidden md:flex p-4 justify-between items-center border-b border-gray-800 shrink-0">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Dashboard Panel</h2>
                        <p className="text-xs mt-0.5 uppercase tracking-widest font-medium opacity-60">Welcome back, {user?.displayName?.split(' ')[0] || "User"}</p>
                    </div>
                    
                    <div className="flex items-center gap-5">
                        <div className="flex gap-2">
                          
                            <button onClick={toggleTheme} className="p-2.5 border border-gray-800 rounded-xl cursor-pointer hover:bg-gray-800/50 transition">
                                {theme === "light" ? <FaMoon /> : <FaSun className="text-yellow-500" />}
                            </button>
                        </div>

                        <div className="flex items-center gap-3 border border-gray-800 py-1.5 pl-2 pr-4 rounded-full">
                            <img src={user?.photoURL} className="w-8 h-8 rounded-full border border-gray-700 object-cover" alt="" />
                            <div className="leading-tight text-left">
                                <p className="text-[11px] font-bold">{user?.displayName}</p>
                                <p className="text-[9px] text-green-500 font-bold uppercase tracking-tighter">Buyer</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Outlet (scrollable content) */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest font-bold shrink-0">
                    <p className="opacity-60">© 2026 Property Hub. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/" className="hover:text-indigo-400 transition opacity-80">Privacy Policy</Link>
                        <Link to="/" className="hover:text-indigo-400 transition opacity-80">Terms of Service</Link>
                    </div>
                </footer>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-30 md:hidden backdrop-blur-sm bg-black/40" onClick={() => setIsSidebarOpen(false)}></div>
            )}
        </div>
    );
};

export default DashboardLayout;