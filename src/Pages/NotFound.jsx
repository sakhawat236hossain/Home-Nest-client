import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-50 to-slate-200 px-6 select-none">
      
      {/* 404 Big Text */}
      <h1 className="text-7xl md:text-8xl font-extrabold text-slate-800 tracking-wide animate-pulse">
        404
      </h1>

      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-700">
        Page Not Found
      </h2>

      <p className="mt-2 text-slate-600 text-center max-w-md leading-relaxed">
        The page you're looking for may have been moved or no longer exists.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all"
      >
        Go Back Home
      </Link>

      {/* Minimal Decorative Line */}
      <div className="mt-10 h-[2px] w-24 bg-slate-400 rounded-full"></div>
    </div>
  );
};

export default NotFound;
