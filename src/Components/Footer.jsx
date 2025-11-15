import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Website */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 text-2xl font-bold text-indigo-600 mb-2">
            <img
              className="w-[40px] hidden sm:block"
              src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png"
              alt="logo"
            />
            PropertyHub
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your trusted platform for buying, selling, and managing properties.
          </p>
        </div>

        {/* Page Links */}
        <div className="w-full md:w-auto text-start">
          <h3 className="font-semibold mb-3 text-gray-800">
            Pages
          </h3>

          <ul className="space-y-2 text-sm flex flex-col items-start">
            {[ 
              { to: "/", label: "Home" },
              { to: "/properties", label: "All Properties" },
              ...(user
                ? [
                    { to: "/add-property", label: "Add Property" },
                    { to: "/my-properties", label: "My Properties" },
                    { to: "/my-ratings", label: "My Ratings" },
                  ]
                : [
                    { to: "/login", label: "Login" },
                    { to: "/register", label: "Register" },
                  ]),
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{
                  scale: 1.15,
                  x: 6,
                  rotate: 2,
                  color: "#4F46E5",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 220 }}
              >
                <Link className="transition-colors" to={item.to}>
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Contact Us</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: hmdsakhawat236@gmail.com</li>
            <li>Phone: +880 1851121472</li>
            <li>Address: 123 Main Street, Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media + Subscribe */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Follow Us</h3>
          <div className="flex gap-3 mt-2 text-lg mb-4">
            <motion.a
              whileHover={{
                scale: 1.3,
                rotate: 5,
                boxShadow: "0px 0px 12px rgba(59,89,152,0.6)",
                color: "#3b5998",
              }}
              whileTap={{ scale: 0.9 }}
              href="https://www.facebook.com/md.sakhawth.hosain"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
            >
              <FaFacebookF />
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.3,
                rotate: -5,
                boxShadow: "0px 0px 12px rgba(0,0,0,0.6)",
                color: "#1DA1F2",
              }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="transition-colors"
            >
              <BsTwitterX />
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.3,
                rotate: 5,
                boxShadow: "0px 0px 12px rgba(225,48,108,0.6)",
                color: "#E1306C",
              }}
              whileTap={{ scale: 0.9 }}
              href="https://www.instagram.com/mhmdshwthsyn/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.3,
                rotate: -5,
                boxShadow: "0px 0px 12px rgba(14,118,168,0.6)",
                color: "#0E76A8",
              }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/md-sakhawat-hossain-622728373/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
            >
              <FaLinkedinIn />
            </motion.a>
          </div>

          <h3 className="font-semibold mb-2 text-gray-800">Subscribe</h3>
          <p className="text-sm text-gray-600 mb-3">
            Get the latest updates and offers.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring focus:ring-indigo-300"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-200 text-center py-4 text-sm text-gray-600 flex flex-col sm:flex-row justify-center items-center gap-2">
        <p>© 2025 PropertyHub. All rights reserved.</p>
        <span className="hidden sm:inline-block text-gray-400">|</span>
        <Link
          to="/terms"
          className="hover:text-indigo-600 transition-colors underline-offset-2 hover:underline"
        >
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
