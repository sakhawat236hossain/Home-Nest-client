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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white dark:bg-[#1E293B] rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800/80 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
    >
      
      {/* Premium Nested Image Container */}
      <div className="relative h-56 w-full p-3 overflow-hidden rounded-[2rem]">
        <img
          src={image}
          alt={propertyName}
          className="w-full h-full object-cover rounded-[1.8rem] transition-transform duration-700 group-hover:scale-105 filter brightness-[0.95]"
        />
        
        {/* Category Label */}
        <div className="absolute top-6 left-6 bg-indigo-600/90 dark:bg-indigo-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-xl shadow-md border border-indigo-400/20">
          {category}
        </div>
        
        {/* Heart Icon Button */}
        <button className="absolute top-6 right-6 p-2.5 bg-white/80 dark:bg-slate-950/60 backdrop-blur-md rounded-xl text-slate-700 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-900 shadow-md transition-all active:scale-90 cursor-pointer">
          <FiHeart size={15} className="stroke-[2.5]" />
        </button>
      </div>

      {/* Info & Content Area */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex justify-between items-baseline gap-2 mb-3">
          {/* Price Tag with Gradient Fill */}
          <h2 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight leading-none">
            ${price?.toLocaleString()}
          </h2>
        
          {/* Location Badge */}
          <p className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-wider truncate">
            <FaMapMarkerAlt className="text-rose-500 shrink-0" size={11} /> {location?.split(',')[0]}
          </p>
        </div>

        {/* Property Title */}
        <h3 className="text-base font-black text-slate-800 dark:text-slate-100 truncate mb-4 uppercase tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {propertyName}
        </h3>

        {/* Specs Divider Panel */}
        <div className="flex items-center justify-between py-3.5 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex gap-4 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-wider">
            {category === "Car" ? (
              <div className="flex items-center gap-2">
                <FaCarSide className="text-indigo-500" size={16} /> Model: {specs?.carModel || "N/A"}
              </div>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <FaBed className="text-indigo-500" size={16} /> {specs?.beds || 0} Beds
                </span>
                <span className="flex items-center gap-1.5">
                  <FaBath className="text-indigo-500" size={16} /> {specs?.baths || 0} Baths
                </span>
                <span className="flex items-center gap-1.5">
                  <FaRulerCombined className="text-indigo-500" size={14} /> {specs?.area || 0} SqFt
                </span>
              </>
            )}
          </div>
        </div>

        {/* Agent Profile & Navigation Link */}
        <div className="flex items-center justify-between mt-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <img 
              src={agentImage} 
              className="w-10 h-10 rounded-2xl object-cover border border-slate-100 dark:border-slate-700/60 shadow-sm" 
              alt={agentName} 
            />
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight leading-none">
                {agentName}
              </span>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 font-bold">
                Agent
              </span>
            </div>
          </div>

          <Link to={`/PropertyDetails/${_id}`} className="shrink-0">
            <motion.button
              whileHover={{ scale: 1.08, x: 2 }}
              whileTap={{ scale: 0.92 }}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white p-3.5 rounded-2xl shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer border border-indigo-500/20"
            >
              <FaChevronRight size={11} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestCart;