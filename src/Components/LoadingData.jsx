import React from "react";
import { motion } from "framer-motion";

const LoadingData = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Spinner */}
      <motion.div
        className="relative w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Glow effect */}
        <span className="absolute inset-0 blur-md bg-indigo-500/20 rounded-full"></span>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-lg text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {text}
        <motion.span
          className="flex space-x-1"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-indigo-600">.</span>
          <span className="text-indigo-600">.</span>
          <span className="text-indigo-600">.</span>
        </motion.span>
      </motion.p>
    </div>
  );
};

export default LoadingData;
