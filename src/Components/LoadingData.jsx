import React from 'react';

const LoadingData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-3 text-gray-700 dark:text-gray-300 font-medium">
        Loading properties...
      </p>
    </div>
  );
};

export default LoadingData;
