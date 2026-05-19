import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { FaEye, FaSignInAlt } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import SocialLogin from "../Social/SocialLogin";
import { motion } from "framer-motion";

const Login = () => {
  const { logInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    logInUser(email, password)
      .then((result) => {
        toast.success("Login successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleForgotPassword = () => {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 transition-colors duration-500 bg-[#F8FAFC] dark:bg-[#0B0D10]">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogIn}
        className="bg-white dark:bg-[#1E293B] p-8 sm:p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800/80 w-full max-w-lg transition-all duration-500"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">
            Enter your details to access your portal
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            required
            className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">
            Secure Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
              className="premium-input w-full pl-4 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {showPassword ? <FaEye size={18} /> : <IoEyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <button
            onClick={handleForgotPassword}
            type="button"
            className="text-[10px] font-black text-rose-500 dark:text-rose-400 uppercase tracking-widest hover:underline cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-md hover:shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mb-6"
        >
          <FaSignInAlt className="text-xs" /> Login Account
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
          <p className="px-4 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
            Or Login With
          </p>
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
        </div>

        {/* Social */}
        <SocialLogin />

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 dark:text-indigo-400 font-black hover:underline ml-1"
          >
            Register Now
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
