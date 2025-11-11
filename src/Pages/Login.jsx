import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { AuthContext} from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";


const Login = () => {
  const { logInUser,logInWithGoogle } = useContext(AuthContext);
  const location = useLocation()
  const navigate=useNavigate()
      const [showPassword, setShowPassword] = useState(false);
  console.log(location);
 
  const handleLogIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    logInUser(email, password)
      .then((result) => {
        console.log(result);
        toast.success("Login successful!");
        navigate(`${location.state?location.state:"/"}`)
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

const handleGoogleLogin = () => {
  logInWithGoogle()
    .then((result) => {
      toast.success(`Welcome ${result.user.displayName}!`);
      navigate(`${location.state?location.state:"/"}`)
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.message || "Google Login Failed!");
    });
};

const handleForgotPassword = () => {
  window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
};




  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-4">
      <form onSubmit={handleLogIn} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
          />
        </div>

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
            {/* Forgot Password */}
              <div className="text-left mb-3">
                <button onClick={handleForgotPassword} type="button" className="link text-green-600 link-hover text-sm">
                  Forgot password?
                </button>
              </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 cursor-pointer text-white py-2 sm:py-2.5 rounded-lg hover:bg-indigo-600 transition mb-4 font-medium text-sm sm:text-base"
        >
          Login
        </button>

        <div className="flex items-center justify-center mb-4">
          <span className="border-b border-gray-300 w-1/4"></span>
          <span className="mx-2 text-gray-400 text-xs sm:text-sm font-medium">
            OR
          </span>
          <span className="border-b border-gray-300 w-1/4"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex cursor-pointer items-center justify-center w-full border border-gray-300 py-2 sm:py-2.5 rounded-lg hover:bg-gray-100 transition font-medium text-sm sm:text-base"
        >
          <FcGoogle className="mr-2 text-lg sm:text-xl" />
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-xs sm:text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
