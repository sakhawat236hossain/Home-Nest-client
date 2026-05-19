import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const RatingCart = ({ rating }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const {
    _id,
    propertyName,
    reviewerName,
    reviewerEmail,
    reviewText,
    rating: ratingValue,
    reviewDate,
    propertyThumbnail,
  } = rating;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: 'rounded-[2rem]',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://home-nest-server-rho.vercel.app/deletePropertyRating/${_id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your rating has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            setIsDeleted(true);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    });
  };

  if (isDeleted) return null;

  return (
    <AnimatePresence>
      {!isDeleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            y: -4,
            boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            transition: { duration: 0.3 },
          }}
          className="max-w-xs mx-auto bg-white dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800/80 rounded-[2.2rem] shadow-sm overflow-hidden p-3 flex flex-col justify-between"
        >
          <div>
            {/* Thumbnail */}
            <div className="relative h-44 overflow-hidden rounded-[1.8rem] shrink-0">
              <img
                src={propertyThumbnail || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80"}
                alt={propertyName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3.5">
              <div>
                <label className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                  Property Name
                </label>
                <h2 className="text-sm font-black text-slate-850 dark:text-white leading-tight mt-1 truncate uppercase">
                  {propertyName}
                </h2>
              </div>

              <div>
                <label className="text-[9px] font-black text-indigo-650 dark:text-indigo-400 uppercase tracking-widest block">
                  Rating Given
                </label>
                <div className="flex items-center gap-2 mt-1.5">
                  <Rating style={{ maxWidth: 80 }} value={ratingValue} readOnly />
                  <span className="text-xs font-black text-slate-500 dark:text-slate-400">{ratingValue}/5</span>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-indigo-655 dark:text-indigo-400 uppercase tracking-widest block">
                  Your Review
                </label>
                <p className="text-slate-600 dark:text-slate-350 text-xs italic font-bold leading-normal mt-1 block">
                  “{reviewText || "No review content provided."}”
                </p>
              </div>

              <div>
                <label className="text-[9px] font-black text-indigo-655 dark:text-indigo-400 uppercase tracking-widest block">
                  Reviewer Info
                </label>
                <p className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-1 truncate">
                  {reviewerName}
                </p>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider truncate mt-0.5">
                  {reviewerEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                {new Date(reviewDate).toLocaleDateString()}
              </span>

              <button
                onClick={handleDelete}
                className="bg-rose-550 bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 dark:hover:bg-rose-600 hover:text-white cursor-pointer transition-all active:scale-98"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingCart;
