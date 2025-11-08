import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-4">
      <form className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-2.5xl font-bold mb-5 text-center text-indigo-600">
          Register
        </h2>

        {/* Name */}
        <div className="mb-3">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
          />
        </div>

        {/* Photo URL */}
        <div className="mb-3">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            placeholder="Enter your photo URL"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 sm:py-2.5 rounded-lg hover:bg-indigo-600 transition mb-3 font-medium text-sm sm:text-base"
        >
          Register
        </button>

        {/* OR Divider */}
        <div className="flex items-center justify-center mb-3">
          <span className="border-b border-gray-300 w-1/4"></span>
          <span className="mx-2 text-gray-400 text-xs sm:text-sm font-medium">OR</span>
          <span className="border-b border-gray-300 w-1/4"></span>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          className="flex items-center justify-center w-full border border-gray-300 py-2 sm:py-2.5 rounded-lg hover:bg-gray-100 transition font-medium text-sm sm:text-base"
        >
          <FcGoogle className="mr-2 text-lg sm:text-xl" />
          Sign in with Google
        </button>

        {/* Login Redirect */}
        <p className="mt-3 text-center text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
