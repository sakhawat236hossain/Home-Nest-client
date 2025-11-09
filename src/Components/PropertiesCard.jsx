import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const PropertiesCard = ({ property }) => {
  const {
    _id,
    propertyName,
    category,
    price,
    location,
    imageLink,
    userName,
  } = property;

  return (
 <motion.div
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.3 }}
  className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group"
>
  <div className="overflow-hidden relative">
    <img
      src={imageLink}
      alt={propertyName}
      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
    />
    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
      {category}
    </span>
  </div>

  <div className="p-4 space-y-2">
    <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition">
      {propertyName}
    </h2>

    <p className="text-green-600 font-semibold dark:text-green-400 text-base">
      💲 {price.toLocaleString()}
    </p>

    <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
      <FaMapMarkerAlt className="opacity-70" />
      {location}
    </p>

    <p className="text-xs text-gray-500 dark:text-gray-400">
      Posted by:{" "}
      <span className="font-medium text-gray-700 dark:text-gray-200">
        {userName}
      </span>
    </p>

    <motion.button
      whileTap={{ scale: 0.95 }}
      className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow hover:shadow-xl text-sm"
    >
      See Details
    </motion.button>
  </div>
</motion.div>

  );
};

export default PropertiesCard;



      {/* Button */}
        {/* <Link to={`/property/${_id}`}>
          <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition">
            See Details
          </button>
        </Link> */}