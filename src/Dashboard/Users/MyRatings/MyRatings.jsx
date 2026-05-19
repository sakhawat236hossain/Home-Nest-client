import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import RatingCart from "../../../Components/RatingCart";
import LoadingData from "../../../Components/LoadingData";

const MyRatings = () => {
  const ratingsData = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingData />;
  }

  if (!ratingsData || ratingsData.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[2.2rem] shadow-sm">
        <p className="text-slate-400 dark:text-slate-500 text-sm font-black uppercase tracking-widest italic">No Ratings Found 😔</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 py-6 md:py-10 bg-transparent transition-colors duration-500">
      
      {/* Title */}
      <motion.h1
        className="text-3xl font-black text-center mb-10 text-slate-800 dark:text-white uppercase tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Ratings</span>
      </motion.h1>

      {/* Ratings Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ratingsData.map((rating) => (
          <RatingCart key={rating._id} rating={rating} />
        ))}
      </div>
    </div>
  );
};

export default MyRatings;
