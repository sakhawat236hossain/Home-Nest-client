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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
              text: "Your property has been removed.",
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
            scale: 1.05,
            y: -5,
            boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
            transition: { duration: 0.3 },
          }}
          className="max-w-xs mx-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-md overflow-hidden"
        >
          {/* Thumbnail */}
          <img
            src={propertyThumbnail}
            alt={propertyName}
            className="w-full h-48 object-cover"
          />

          {/* Content */}
          <div className="p-3 space-y-1.5">
            <label className="text-xs font-semibold text-indigo-700">
              Property Name:
            </label>
            <h2 className="text-base font-bold text-gray-800 leading-tight">
              {propertyName}
            </h2>

            <label className="text-xs font-semibold text-indigo-700">Rating:</label>
            <div className="flex items-center gap-1">
              <Rating style={{ maxWidth: 80 }} value={ratingValue} readOnly />
              <span className="text-xs text-gray-600">{ratingValue}/5</span>
            </div>

            <label className="text-xs font-semibold text-indigo-700">Review:</label>
            <p className="text-gray-700 text-xs">“{reviewText || "No review"}”</p>

            <label className="text-xs font-semibold text-indigo-700">
              Reviewer:
            </label>
            <p className="text-xs text-gray-600">
              {reviewerName} ({reviewerEmail})
            </p>

            <p className="text-[10px] text-gray-400">
              {new Date(reviewDate).toLocaleDateString()}
            </p>

            <button
              onClick={handleDelete}
              className="w-full mt-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-1 rounded-lg text-xs font-medium shadow-sm transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingCart;
