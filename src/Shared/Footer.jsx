import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion";

const Footer = () => {
  const { user } = useContext(AuthContext);

  // Helper to scroll to top when clicking links
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="mt-10 border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Info */}
        <div className="flex flex-col items-start">
          <Link to='/' onClick={scrollToTop} className="flex items-center gap-2 text-2xl font-bold text-indigo-600 mb-2">
            <img
              className="w-[40px] hidden sm:block"
              src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png"
              alt="logo"
            />
            PropertyHub
          </Link>
          <p className="text-sm leading-relaxed opacity-70">
            Your trusted platform for buying, selling, and managing properties.
          </p>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="w-full md:w-auto text-start">
          <h3 className="font-semibold mb-3">Pages</h3>
          <ul className="space-y-2 text-sm flex flex-col items-start">
            {[ 
              { to: "/", label: "Home" },
              { to: "/properties", label: "All Properties" },
              ...(user
                ? [
                    // Corrected Dashboard Paths
                    { to: "/dashboard/profile", label: "My Profile" },
                    { to: "/dashboard/add-property", label: "Add Property" },
                    { to: "/dashboard/my-addedProperties", label: "My Properties" },
                    { to: "/dashboard/my-ratings", label: "My Ratings" },
                  ]
                : [
                    { to: "/login", label: "Login" },
                    { to: "/register", label: "Register" },
                  ]),
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05, x: 5, color: "#4F46E5" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link onClick={scrollToTop} className="transition-colors opacity-80 hover:opacity-100" to={item.to}>
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Email: hmdsakhawat236@gmail.com</li>
            <li>Phone: +880 1851121472</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Socials & Subscription */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mb-6">
            {[
              { icon: <FaFacebookF />, href: "https://facebook.com/..." },
              { icon: <BsTwitterX />, href: "#" },
              { icon: <FaInstagram />, href: "https://instagram.com/..." },
              { icon: <FaLinkedinIn />, href: "https://linkedin.com/..." }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.2 }}
                className="text-xl opacity-70 hover:opacity-100 hover:text-indigo-500 transition-all"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <h3 className="font-semibold mb-2">Subscribe</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg text-sm w-full focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition shadow-md">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-100 dark:border-gray-800 text-center py-6 text-xs opacity-60">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <p>© 2026 PropertyHub. All rights reserved.</p>
          <Link to="/terms" onClick={scrollToTop} className="hover:text-indigo-600 underline-offset-4 hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;