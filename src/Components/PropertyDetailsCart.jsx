import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const PropertyDetailsCart = ({ detailsData }) => {
  const {
    propertyName,
    description,
    category,
    price,
    location,
    imageLink,
    userName,
    userEmail,
    createdAt,
  } =detailsData

  // Formatted Date

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto my-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Image */}
        <div className="md:w-2/5 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
          <img
            src={imageLink}
            alt={propertyName}
            className="w-full h-full object-cover rounded-lg transition duration-500 hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-3/5 p-6 space-y-4">
          {/* Title + Category */}
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {propertyName}
            </h1>
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow">
              {category}
            </span>
          </div>

          {/* Price */}
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            💲{price}
          </p>

          {/* Location */}
          <p className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">Location:</span>
            <span className="text-gray-600 dark:text-gray-300">{location}</span>
          </p>

          {/* Description */}
          <div>
            <p className="text-gray-500 font-bold text-xs uppercase dark:text-gray-400 tracking-wide mb-1">
              Description:
            </p>
            <p className="text-gray-700  dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* User Info */}
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaUser className="text-blue-600" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">Posted By:</span>
              <span className="text-gray-600 dark:text-gray-300">{userName}</span>
            </p>

            <p className="flex items-center gap-2 break-all">
              <FaEnvelope className="text-yellow-500" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">Email:</span>
              <span className="text-gray-600 dark:text-gray-300">{userEmail}</span>
            </p>

            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-500" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">Posted On:</span>
              <span className="text-gray-600 dark:text-gray-300">{createdAt}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetailsCart;
