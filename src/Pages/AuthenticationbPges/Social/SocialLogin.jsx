import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { motion } from "framer-motion"; 

const SocialLogin = () => {
  const { logInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
        };

        axiosSecure.post("/users", userInfo)
          .then((data) => {
            console.log("User saved to database", data.data);
            toast.success("Logged in successfully!");
            navigate(location?.state || "/");
          })
          .catch((error) => {
            if (error.response?.status === 409) {
              toast.success("Welcome back!");
              navigate(location?.state || "/");
            } else {
              console.error("Error saving user", error);
              toast.error("Failed to sync user data");
            }
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="mt-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm uppercase">
          <span className="bg-white dark:bg-[#16191E] px-2 text-gray-500 dark:text-gray-400 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Login Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogleLogin}
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 
                   bg-white dark:bg-transparent text-gray-700 dark:text-white font-bold
                   rounded-xl border-2 border-gray-200 dark:border-gray-700
                   hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 
                   dark:hover:border-blue-500 transition-all duration-300 shadow-sm cursor-pointer"
      >
        <FcGoogle className="w-6 h-6" />
        <span>Sign in with Google</span>
      </motion.button>
    </div>
  );
};

export default SocialLogin;