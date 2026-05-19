import React, { useContext, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye } from "react-icons/fa";
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B0D10]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-indigo-100 dark:bg-indigo-950/40 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] dark:bg-[#0B0D10] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white dark:bg-[#1E293B] rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800/80 p-8 sm:p-10 transition-all duration-500"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-850 dark:text-white uppercase tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">
            Join the HomeNest community today
          </p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Your Name"
                className="premium-input w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-rose-500 text-xs font-bold uppercase tracking-wide mt-1.5 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">
              Profile Picture
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-50 dark:file:bg-indigo-950/40 file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 cursor-pointer dark:text-slate-400 font-bold"
                {...register("profileImage", { required: "Image is required" })}
              />
            </div>
            {errors.profileImage && (
              <p className="text-rose-500 text-xs font-bold uppercase tracking-wide mt-1.5 ml-1">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="email@example.com"
                className="premium-input w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-xs font-bold uppercase tracking-wide mt-1.5 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">
              Secure Password
            </label>
            <div className="relative">
              <FaUser className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 invisible" /> {/* structural offset */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-355"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {showPassword ? <FaEye size={18} /> : <IoEyeOff size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-rose-500 text-xs font-bold uppercase tracking-wide mt-1.5 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-md hover:shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mt-6"
          >
            <FaUser className="text-xs" /> Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
          <p className="px-4 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
            Or Register With
          </p>
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
        </div>

        {/* Social */}
        <SocialLogin />

        {/* Login Link */}
        <p className="mt-8 text-center text-sm font-medium text-slate-500">
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
