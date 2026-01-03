import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCarSide, FaChevronRight } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const LatestCart = ({ Property }) => {
  const {
    _id,
    propertyName,
    category,
    price,
    location,
    image,
    agentName,
    agentImage,
    specs,
  } = Property;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-[#1a1d24] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
    >
      
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={image}
          alt={propertyName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase px-3 py-1 rounded-md">
          {category}
        </div>
        <button className="absolute top-3 right-3 p-2.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-gray-700 dark:text-white hover:text-red-500 transition-colors">
          <FiHeart size={18} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          
          <h2 className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            ${price?.toLocaleString()}
          </h2>
        
          <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm font-medium">
            <FaMapMarkerAlt size={14} /> {location?.split(',')[0]}
          </p>
        </div>

      
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate mb-4">
          {propertyName}
        </h3>

        <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-4 text-gray-600 dark:text-gray-300 text-[15px] font-bold">
            {category === "Car" ? (
              <div className="flex items-center gap-2">
                <FaCarSide className="text-indigo-500" size={18} /> Model: {specs?.carModel || "N/A"}
              </div>
            ) : (
              <>
                <span className="flex items-center gap-1.5"><FaBed className="text-indigo-500" size={18} /> {specs?.beds || 0}</span>
                <span className="flex items-center gap-1.5"><FaBath className="text-indigo-500" size={18} /> {specs?.baths || 0}</span>
                <span className="flex items-center gap-1.5"><FaRulerCombined className="text-indigo-500" size={16} /> {specs?.area || 0}</span>
              </>
            )}
          </div>
        </div>

      
        <div className="flex items-center justify-between mt-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img src={agentImage} className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100 dark:border-gray-700" alt={agentName} />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{agentName}</span>
          </div>

          <Link to={`/PropertyDetails/${_id}`}>
            <motion.button
              whileHover={{ x: 3 }}
              className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all cursor-pointer"
            >
              <FaChevronRight size={14} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestCart;