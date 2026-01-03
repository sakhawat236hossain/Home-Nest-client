import React, { useContext, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaImage, FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import SocialLogin from "../Social/SocialLogin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImageToCloudinary } from "../../../hooks/Utils";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, setUser, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const { email, password, name, profileImage } = data;
    const imgFile = profileImage[0];

    try {
      const photoURL = await uploadImageToCloudinary(imgFile);
      console.log("Uploaded Image URL:", photoURL);

      const result = await createUser(email, password);

      await updateUserProfile(name, photoURL);

      setUser({ ...result.user, displayName: name, photoURL: photoURL });

      const userInfo = {
        name,
        email,
        photoURL: photoURL || "",
      };
      await axiosSecure.post("/users", userInfo);

      toast.success("Registration successful!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Final Error:", error);
      toast.error(error.message || "Registration failed!");
    }
  };

  if (loading) return <div>loading.....</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] dark:bg-[#0B0D10] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white dark:bg-[#16191E] rounded-[2rem] shadow-2xl shadow-indigo-100 dark:shadow-none p-8 border border-gray-100 dark:border-gray-800"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
            Join the HomeNest community today
          </p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">
              Full Name
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0F1115] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition dark:text-white"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">
              Profile Picture
            </label>
            <div className="relative mt-1">
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-2 cursor-pointer dark:text-gray-400"
                {...register("profileImage", { required: "Image is required" })}
              />
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0F1115] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition dark:text-white"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">
              Secure Password
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-[#0F1115] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#E56F61] outline-none transition dark:text-white"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
              >
                {showPassword ? <FaEye size={18} /> : <IoEyeOff size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-4 cursor-pointer bg-blue-700 transition-all uppercase tracking-[0.2em] text-xs mt-4 flex items-center justify-center gap-2"
          >
            <FaUser className="text-xs" /> Create Account
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800"></div>
          <p className="px-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
            Or Register With
          </p>
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800"></div>
        </div>

        <SocialLogin />

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 font-black hover:underline ml-1"
          >
            Login Now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
