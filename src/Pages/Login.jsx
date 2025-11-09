import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { logInUser } = useContext(AuthContext);
  const location = useLocation()
  const navigate=useNavigate()
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

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 sm:py-2.5 rounded-lg hover:bg-indigo-600 transition mb-4 font-medium text-sm sm:text-base"
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
          className="flex items-center justify-center w-full border border-gray-300 py-2 sm:py-2.5 rounded-lg hover:bg-gray-100 transition font-medium text-sm sm:text-base"
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
