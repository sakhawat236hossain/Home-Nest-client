import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaBuilding, FaUser, FaStar } from "react-icons/fa6";
import { ImBoxAdd } from "react-icons/im";
import { IoLogIn } from "react-icons/io5";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);

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

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
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
              <div className="relative">
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border cursor-pointer"
                  onClick={() => setOpenDropdown(!openDropdown)}
                />
                {/* Dropdown */}
                {openDropdown && (
                  <div className="absolute top-12 right-0 bg-white shadow-md rounded-md w-80 p-3 space-y-1">
                    <p className="font-semibold text-gray-800">
                      {user.displayName || "No Name"}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>

                    <button
                      onClick={handleLogOut}
                      className="w-full text-red-500 font-semibold hover:bg-red-50 rounded-md p-2 mt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="text-3xl">☰</span>
            </button>
          </div>
        </div>

        {/*  Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t mt-2 p-3 space-y-2">
            <NavItem to="/" label="Home" icon={GoHomeFill} />
            <NavItem
              to="/properties"
              label="All Properties"
              icon={FaBuilding}
            />

            {user && (
              <>
                <NavItem
                  to="/add-property"
                  label="Add Property"
                  icon={ImBoxAdd}
                />
                <NavItem
                  to="/my-properties"
                  label="My Properties"
                  icon={FaUser}
                />
                <NavItem to="/my-ratings" label="My Ratings" icon={FaStar} />

                {/*  Mobile Logout Button */}
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
