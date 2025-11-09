import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaBuilding,
} from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Website */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 text-2xl font-bold text-indigo-600 mb-2">
            <FaBuilding /> PropertyHub
          </div>
          <p className="text-sm text-gray-600">
            Your trusted platform for buying, selling, and managing properties.
          </p>
        </div>

        {/* Page Links */}
        <div>
          <h3 className="font-semibold mb-2">Pages</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link className="hover:text-indigo-600 transition-colors" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-indigo-600 transition-colors"
                to="/properties"
              >
                All Properties
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    className="hover:text-indigo-600 transition-colors"
                    to="/add-property"
                  >
                    Add Property
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-indigo-600 transition-colors"
                    to="/my-properties"
                  >
                    My Properties
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-indigo-600 transition-colors"
                    to="/my-ratings"
                  >
                    My Ratings
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link
                    className="hover:text-indigo-600 transition-colors"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-indigo-600 transition-colors"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: hmdsakhawat236@gmail.com</li>
            <li>Phone: +880 1851121472</li>
            <li>Address: 123 Main Street, Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.facebook.com/md.sakhawth.hosain"
              className="hover:text-indigo-600 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              <BsTwitterX />
            </a>
            <a
              href="https://www.instagram.com/mhmdshwthsyn/?hl=en"
              className="hover:text-indigo-600 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/md-sakhawat-hossain-622728373/"
              className="hover:text-indigo-600 transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        PropertyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
