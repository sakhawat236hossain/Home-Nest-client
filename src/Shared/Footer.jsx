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
    <footer className="mt-20 border-t border-slate-200/60 bg-white dark:bg-[#0F172A] dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo & Info */}
        <div className="flex flex-col items-start space-y-4">
          <Link to='/' onClick={scrollToTop} className="flex items-center gap-3 text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter uppercase italic">
            <img
              className="w-10 h-10 object-contain"
              src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png"
              alt="logo"
            />
            PropertyHub
          </Link>
          <p className="text-xs text-slate-455 dark:text-slate-400 font-bold uppercase tracking-wide leading-relaxed">
            Your trusted premium platform for buying, selling, and managing luxury properties.
          </p>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="w-full md:w-auto text-start">
          <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] text-xs mb-5">Pages</h3>
          <ul className="space-y-3 text-xs flex flex-col items-start font-bold uppercase tracking-wider">
            {[ 
              { to: "/", label: "Home" },
              { to: "/properties", label: "All Properties" },
              ...(user
                ? [
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
                whileHover={{ x: 5, color: "#4F46E5" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link onClick={scrollToTop} className="transition-colors text-slate-500 dark:text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-400" to={item.to}>
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] text-xs mb-5">Contact Us</h3>
          <ul className="space-y-3.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <li>Email: hmdsakhawat236@gmail.com</li>
            <li>Phone: +880 1851121472</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Socials & Subscription */}
        <div className="space-y-4">
          <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] text-xs">Follow Us</h3>
          <div className="flex gap-3.5">
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
                whileHover={{ y: -3, scale: 1.12 }}
                className="w-10 h-10 rounded-xl bg-slate-55 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer shadow-sm"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] text-xs pt-2">Subscribe</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs w-full focus:ring-2 focus:ring-indigo-500 outline-none font-bold uppercase tracking-tight"
            />
            <button className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition shadow-lg hover:shadow-indigo-500/10 active:scale-95 cursor-pointer">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 text-center py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <p>© 2026 PropertyHub. All rights reserved.</p>
          <Link to="/terms" onClick={scrollToTop} className="hover:text-indigo-600 dark:hover:text-indigo-400 underline-offset-4 hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;