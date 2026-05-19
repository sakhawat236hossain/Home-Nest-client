import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
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
  } = detailsData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto bg-white dark:bg-[#1E293B] rounded-[2.2rem] border border-slate-100 dark:border-slate-800/80 p-3 shadow-sm overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Image */}
        <div className="md:w-2/5 shrink-0 relative overflow-hidden rounded-[1.8rem] h-64 md:h-auto">
          <img
            src={imageLink}
            alt={propertyName}
            className="w-full h-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-3/5 p-4 sm:p-6 space-y-4 flex flex-col justify-between">
          <div>
            {/* Title + Category */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-1">Property Details</span>
                <h1 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight leading-tight">
                  {propertyName}
                </h1>
              </div>
              <span className="shrink-0 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100/50 dark:border-indigo-900/30">
                {category}
              </span>
            </div>

            {/* Price */}
            <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-3">
              ${price?.toLocaleString()}
            </p>

            {/* Location */}
            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-3">
              <FaMapMarkerAlt className="text-rose-500 shrink-0" size={11} />
              <span>{location}</span>
            </p>

            {/* Description */}
            <div className="mt-4">
              <p className="text-[9px] font-black text-indigo-650 dark:text-indigo-400 uppercase tracking-widest block mb-1.5">
                Description
              </p>
              <p className="text-slate-600 dark:text-slate-350 text-xs font-bold leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-2.5">
            {/* User Info */}
            <div className="grid grid-cols-2 gap-4 text-[10px]">
              <div>
                <span className="text-[8px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest block mb-0.5">Posted By</span>
                <span className="font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">{userName}</span>
              </div>
              <div>
                <span className="text-[8px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest block mb-0.5">Contact</span>
                <span className="font-bold text-slate-700 dark:text-slate-300 truncate block">{userEmail}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[8px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest block">Posted On</span>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetailsCart;
