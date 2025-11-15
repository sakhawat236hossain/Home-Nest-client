import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaBuilding, FaUser, FaStar } from "react-icons/fa6";
import { ImBoxAdd } from "react-icons/im";
import { IoReorderThree } from "react-icons/io5";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const NavItem = ({ to, label, icon: Icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition ${
          isActive
            ? "text-indigo-600 font-bold border border-gray-300 bg-indigo-50"
            : "text-gray-700"
        }`
      }
      onClick={() => setMobileOpen(false)}
    >
      {Icon && <Icon />} {label}
    </NavLink>
  );

  const handleLogOut = () => {
    logOutUser();
    toast.success("LogOut successful!");
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="shadow-md sticky top-0 z-50 bg-gray-300 rounded-2xl">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            className="text-xl font-bold text-indigo-600 flex items-center gap-2"
            to="/"
          >
            <img
              className="w-[40px] hidden sm:block"
              src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png"
              alt="logo"
            />
            Property Hub
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-4">
            <NavItem to="/" label="Home" icon={GoHomeFill} />
            <NavItem to="/properties" label="All Properties" icon={FaBuilding} />
            <NavItem to="/add-property" label="Add Property" icon={ImBoxAdd} />
            <NavItem to="/my-properties" label="My Properties" icon={FaUser} />
            <NavItem to="/my-ratings" label="My Ratings" icon={FaStar} />
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm bg-indigo-600 text-white rounded-full"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm border border-indigo-600 text-indigo-600 rounded-full"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
                    theme === "dark" ? "bg-gray-600 justify-end" : "bg-gray-300"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                </button>

                {/* Profile Image */}
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border cursor-pointer border-2 border-red-400"
                  onClick={() => setOpenDropdown(!openDropdown)}
                />

                {/* Dropdown */}
                {openDropdown && (
                  <div className="absolute top-12 right-0 bg-gray-600 shadow-md rounded-md w-80 p-4 space-y-3 border border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {user.displayName || "No Name"}
                      </p>
                      <p className=" text-black dark:bg-white p-2">{user.email}</p>
                    </div>

                    <button
                      onClick={handleLogOut}
                      className="w-full btn btn-sm border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-900"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="text-3xl text-black dark:text-white">
                <IoReorderThree />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t mt-2 p-3 space-y-2">
            <NavItem to="/" label="Home" icon={GoHomeFill} />
            <NavItem to="/properties" label="All Properties" icon={FaBuilding} />

            {user && (
              <>
                <NavItem to="/add-property" label="Add Property" icon={ImBoxAdd} />
                <NavItem to="/my-properties" label="My Properties" icon={FaUser} />
                <NavItem to="/my-ratings" label="My Ratings" icon={FaStar} />

                {/* Mobile Theme Toggle */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Dark Mode
                  </span>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
                      theme === "dark" ? "bg-gray-600 justify-end" : "bg-gray-300"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>

                <button
                  onClick={handleLogOut}
                  className="w-full mt-2 rounded-full p-2 bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <Link
                  to="/login"
                  className="block rounded-full p-2 text-center bg-indigo-600 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block rounded-full p-2 text-center border border-indigo-600 text-indigo-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
