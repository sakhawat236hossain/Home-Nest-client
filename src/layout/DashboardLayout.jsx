import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { 
    FaUser, FaPlusCircle, FaList, FaHome, FaSignOutAlt, 
    FaBars, FaTimes, FaStar, FaBell, FaMoon, FaSun, FaUsers, FaTasks 
} from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import useRole from '../hooks/useRole';

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
        if (theme === "dark") html.classList.add("dark");
        else html.classList.remove("dark");
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
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans transition-colors duration-300 bg-white dark:bg-[#0B0F1A]">
            
            {/* Mobile Header */}
            <div className="md:hidden border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center z-50 shrink-0 bg-white dark:bg-[#0B0F1A]">
                <Link to="/" className="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png" className="w-8" alt="logo" />
                    <span className="font-bold text-gray-800 dark:text-white">Property Hub</span>
                </Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl text-gray-800 dark:text-white">
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar */}
            <aside 
                className={`
                    fixed inset-y-0 left-0 z-40 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F1A]
                    transition-all duration-300 ease-in-out group flex flex-col
                    ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}
                    md:relative md:translate-x-0 md:w-20 md:hover:w-64 shrink-0
                `}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 shrink-0 overflow-hidden">
                    <Link className="flex items-center gap-3 min-w-max" to="/">
                        <img src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png" className="w-9 h-9" alt="logo" />
                        <div className="leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-black text-lg text-gray-800 dark:text-white tracking-tighter uppercase">Home Nest</span>
                        </div>
                    </Link>
                </div>

                {/* Role Specific Profile Badge */}
                {user && (
                    <div className="p-4 mx-2 my-6 rounded-2xl flex items-center gap-3 bg-indigo-50 dark:bg-gray-800/40 border border-indigo-100 dark:border-gray-700 overflow-hidden">
                        <div className="min-w-[40px]">
                            <img src={user?.photoURL} className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500" alt="user" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-max">
                            <p className="text-xs font-black dark:text-white truncate uppercase">{user?.displayName}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${role === 'admin' ? 'text-red-500' : role === 'seller' ? 'text-orange-500' : 'text-green-500'}`}>
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
                                flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200
                                ${isActive 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600'}
                            `}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                {link.label}
                            </span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button 
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-black transition-all overflow-hidden"
                    >
                        <div className="min-w-[40px] flex justify-center"><FaSignOutAlt /></div>
                        <span className="text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="hidden md:flex p-6 justify-between items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F1A]">
                    <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
                        {role} <span className="text-indigo-600">Portal</span>
                    </h2>
                    
                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-3 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-800 dark:text-white">
                            {theme === "light" ? <FaMoon /> : <FaSun className="text-amber-400" />}
                        </button>
                        <img src={user?.photoURL} className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-gray-800" alt="" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-gray-50 dark:bg-[#0B0F1A]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;