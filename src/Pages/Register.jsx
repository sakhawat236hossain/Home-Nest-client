import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Register = () => {
  const { createUser, setUser, logInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
const handleRegister = (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const photo = e.target.photoURL.value;
  const password = e.target.password.value;

  if (!name || !email || !password) {
    toast.error("Please fill in all required fields!");
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must have at least 6 characters, including uppercase and lowercase letters."
    );
    return;
  }

  createUser(email, password)
    .then((result) => {
      const user = result.user;
      updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
      });

      toast.success("Registration successful!");
      e.target.reset(); // ✅ এই লাইনেই reset হবে
      navigate("/");
    })
    .catch((error) => {
      const errorMessage = error.message;
      toast.error(`Registration failed: ${errorMessage}`);
      console.error("Registration error:", error);
    });
};


  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        toast.success(`Welcome ${result.user.displayName}!`);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "Google Login Failed!");
      });
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
        <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter your password"
    className="input-style pr-16"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-600"
  >
    {showPassword ? <FaEye /> :<IoEyeOff />}
  </button>
</div>


        {/* Register Button */}
        <button
          type="submit"
          className="w-full mt-5 bg-indigo-600 text-white py-2 sm:py-2.5 rounded-lg hover:bg-indigo-700 transition mb-4 font-medium text-sm sm:text-base"
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
          onClick={handleGoogleLogin}
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
