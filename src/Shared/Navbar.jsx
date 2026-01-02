import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaBuilding, FaUser,  FaTableCellsLarge } from "react-icons/fa6";
import { IoReorderThree } from "react-icons/io5";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

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
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
          isActive
            ? "text-indigo-600 font-bold border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-800"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`
      }
      onClick={() => setMobileOpen(false)}
    >
      {Icon && <Icon className="text-lg" />} {label}
    </NavLink>
  );

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800 max-w-7xl mx-auto px-4 rounded-b-2xl">
      <div className="">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link className="text-2xl font-black text-indigo-600 flex items-center gap-2" to="/">
            <img className="w-10 h-10 object-contain" src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png" alt="logo" />
            <span className="hidden lg:block tracking-tighter">PropertyHub</span>
          </Link>

          {/* Dexstop menu*/}
          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/" label="Home" icon={GoHomeFill} />
            <NavItem to="/properties" label="All Property" icon={FaBuilding} />
            {user && (
               <NavItem to="/dashboard" label="Dashboard" icon={FaTableCellsLarge} />
            )}
          </nav>

          {/* Right site*/}
          <div className="flex items-center gap-4">
            
            {/* Them */}
            <label className="swap swap-rotate text-gray-700 dark:text-gray-300 transition-transform hover:scale-110">
              <input type="checkbox" onChange={handleTheme} checked={theme === "dark"} />
              <svg className="swap-off h-7 w-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
              <svg className="swap-on h-7 w-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label>

            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium dark:text-gray-200">Login</Link>
                <Link to="/register" className="px-5 py-2 text-sm font-medium bg-indigo-600 text-white rounded-full hover:shadow-lg transition">Register</Link>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer object-cover"
                  onClick={() => setOpenDropdown(!openDropdown)}
                />
                {openDropdown && (
                  <div className="absolute top-14 right-0 w-60 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 border dark:border-gray-700">
                    <div className="text-center border-b dark:border-gray-700 pb-3 mb-3">
                      <p className="font-bold text-gray-800 dark:text-white truncate">{user.displayName || "User"}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <ul className="space-y-2 mb-4">
                        <li><Link to="/dashboard/profile" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm dark:text-gray-300" onClick={() => setOpenDropdown(false)}><FaUser /> Profile</Link></li>
                        <li><Link to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm dark:text-gray-300" onClick={() => setOpenDropdown(false)}><FaTableCellsLarge /> Dashboard</Link></li>
                    </ul>
                    <button onClick={handleLogOut} className="w-full py-2 bg-red-500 text-white rounded-xl text-sm font-bold">Logout</button>
                  </div>
                )}
              </div>
            )}

            <button className="md:hidden text-gray-700 dark:text-gray-300" onClick={() => setMobileOpen(!mobileOpen)}>
              <IoReorderThree className="text-3xl" />
            </button>
          </div>
        </div>

        {/* mobile menu*/}
        {mobileOpen && (
          <div className="md:hidden border-t dark:border-gray-800 py-4 space-y-2">
            <NavItem to="/" label="Home" icon={GoHomeFill} />
            <NavItem to="/properties" label="Explore" icon={FaBuilding} />
            {user && <NavItem to="/dashboard" label="Dashboard" icon={FaTableCellsLarge} />}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;