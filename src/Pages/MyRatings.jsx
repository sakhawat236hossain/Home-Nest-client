import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import RatingCart from "../Components/RatingCart";
import LoadingData from "../Components/LoadingData";

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
      <p className="text-center mt-10 text-gray-500">
        No Ratings Found 😔
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <title>My Ratings</title>

      {/* Motion Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Ratings
      </motion.h1>

      {/* Ratings Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {ratingsData.map((rating) => (
          <RatingCart key={rating._id} rating={rating} />
        ))}
      </div>
    </div>
  );
};

export default MyRatings;
