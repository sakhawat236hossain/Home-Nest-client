import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/20 z-50">
      <div className="h-12 w-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
