import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaBuilding, FaUser, FaTableCellsLarge } from "react-icons/fa6";
import { IoReorderThree } from "react-icons/io5";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleTheme = (e) => {
    const selectedTheme = e.target.checked ? "dark" : "light";
    setTheme(selectedTheme);
  };

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

  const handleLogOut = () => {
    logOutUser();
    toast.success("LogOut successful!");
    setOpenDropdown(false);
  };

  const NavItem = ({ to, label, icon: Icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
          isActive
            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30 shadow-sm"
            : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
        }`
      }
      onClick={() => setMobileOpen(false)}
    >
      {Icon && <Icon className="text-base" />} {label}
    </NavLink>
  );

  return (
    <div className="sticky top-4 z-50 w-full px-4 md:px-6">
      <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/40 max-w-7xl mx-auto px-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link className="text-2xl font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-3" to="/">
            <motion.img 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-10 h-10 object-contain" 
              src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png" 
              alt="logo" 
            />
            <span className="hidden lg:block tracking-tighter uppercase italic font-black bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              PropertyHub
            </span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/" label="Home" icon={GoHomeFill} />
            <NavItem to="/properties" label="All Properties" icon={FaBuilding} />
            <NavItem to="/about-us" label="About Us" />
            <NavItem to="/contact-us" label="Contact" />
            <NavItem to="/services" label="Services" />
            {user && (
               <NavItem to="/dashboard" label="Dashboard" icon={FaTableCellsLarge} />
            )}
          </nav>

          {/* Right site */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle */}
            <label className="swap swap-rotate text-slate-600 dark:text-slate-300 transition-transform hover:scale-110 cursor-pointer">
              <input type="checkbox" onChange={handleTheme} checked={theme === "dark"} />
              <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
              <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label>

            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-6 py-2.5 text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-2xl shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all">
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={user?.photoURL || "https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png"}
                  alt="profile"
                  className="w-10 h-10 rounded-2xl border-2 border-indigo-500 cursor-pointer object-cover shadow-sm"
                  onClick={() => setOpenDropdown(!openDropdown)}
                />
                <AnimatePresence>
                  {openDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute top-14 right-0 w-64 bg-white dark:bg-slate-800 shadow-2xl rounded-3xl p-5 border border-slate-100 dark:border-slate-700/50 z-50"
                    >
                      <div className="text-center border-b border-slate-100 dark:border-slate-700 pb-3.5 mb-3.5">
                        <p className="font-black text-slate-800 dark:text-white truncate uppercase text-sm tracking-tight">{user.displayName || "User"}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
                      </div>
                      <ul className="space-y-1.5 mb-4">
                        <li>
                          <Link 
                            to="/dashboard/profile" 
                            className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 transition-colors" 
                            onClick={() => setOpenDropdown(false)}
                          >
                            <FaUser className="text-slate-400" /> Profile
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/dashboard" 
                            className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 transition-colors" 
                            onClick={() => setOpenDropdown(false)}
                          >
                            <FaTableCellsLarge className="text-slate-400" /> Dashboard
                          </Link>
                        </li>
                      </ul>
                      <button onClick={handleLogOut} className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-rose-500/10 active:scale-98 transition-all">
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button className="md:hidden text-slate-700 dark:text-slate-300 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition" onClick={() => setMobileOpen(!mobileOpen)}>
              <IoReorderThree className="text-3xl" />
            </button>
          </div>
        </div>

        {/* Mobile menu with beautiful transition */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-100 dark:border-slate-800/80 py-5 space-y-2 overflow-hidden"
            >
              <NavItem to="/" label="Home" icon={GoHomeFill} />
              <NavItem to="/properties" label="Explore" icon={FaBuilding} />
              {user && <NavItem to="/dashboard" label="Dashboard" icon={FaTableCellsLarge} />}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Navbar;