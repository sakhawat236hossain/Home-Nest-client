import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser,setUser } = useContext(AuthContext);
  // const 

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields!");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
     setUser(user)
        toast.success("Registration successful!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Registration failed: ${errorMessage}`);
        console.error("Registration error:", error);
      });

    console.log({ name, email, photoURL, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-700">
          Register Now
        </h2>

        {/* Name */}
        <div className="mb-3 sm:mb-4">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />
        </div>

        {/* Email */}
        <div className="mb-3 sm:mb-4">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />
        </div>

        {/* Photo URL */}
        <div className="mb-3 sm:mb-4">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Photo URL
          </label>
          <input
            type="text"
            name="photoURL"
            placeholder="Enter your photo URL"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div className="mb-5 sm:mb-6">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 sm:py-2.5 rounded-lg hover:bg-indigo-700 transition mb-4 font-medium text-sm sm:text-base"
        >
          Register
        </button>

        {/* OR Divider */}
        <div className="flex items-center justify-center mb-4">
          <span className="border-b border-gray-300 w-1/4"></span>
          <span className="mx-2 text-gray-400 text-xs sm:text-sm font-medium">
            OR
          </span>
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
        <p className="mt-4 text-center text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
