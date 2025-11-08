import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaBuilding, FaUser, FaStar } from "react-icons/fa6";
import { ImBoxAdd } from "react-icons/im";
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const {user}=useContext(AuthC)

  const NavItem = ({ to, label, icon: Icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
          isActive
            ? "text-crimson font-bold border border-gray-300 bg-red-50"
            : "text-gray-700"
        }`
      }
    >
      {Icon && <Icon />} {label}
    </NavLink>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold text-indigo-600"
          >
            <img
              className="w-[40px] sm:w-[45px] hidden sm:block"
              src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png"
              alt="logo"
            />
            Property
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-4">
            <NavItem to="/" label="Home" icon={GoHomeFill} />
            <NavItem
              to="/properties"
              label="All Properties"
              icon={FaBuilding}
            />
            <NavItem
              to="/add-property"
              label="Add Properties"
              icon={ImBoxAdd}
            />
            <NavItem to="/my-properties" label="My Properties" icon={FaUser} />
            <NavItem to="/my-ratings" label="My Ratings" icon={FaStar} />
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
            >
              <IoLogIn /> Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Register
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden btn btn-ghost"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    stroke="currentColor"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col gap-2 p-2">
            <NavItem to="/" label="Home" icon={GoHomeFill} />
            <NavItem
              to="/properties"
              label="All Properties"
              icon={FaBuilding}
            />
            <NavItem
              to="/add-property"
              label="Add Properties"
              icon={ImBoxAdd}
            />
            <NavItem to="/my-properties" label="My Properties" icon={FaUser} />
            <NavItem to="/my-ratings" label="My Ratings" icon={FaStar} />

            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                className="btn btn-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-sm rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Signup
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
