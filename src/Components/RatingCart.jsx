import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const RatingCart = ({ rating, handleDelete }) => {
  if (!rating) return null;

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

  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl
      border border-blue-100 overflow-hidden transform hover:-translate-y-[2px]
      transition-all duration-300 p-2"
    >
{/* 🏠 Image Section */}
<div className="relative h-36 overflow-hidden rounded-t-2xl shadow-inner">
  <img
    src={propertyThumbnail}
    alt={propertyName}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 hover:brightness-90"
  />

  {/* 🔴 Delete Button */}
  <button
    onClick={() => handleDelete && handleDelete(_id)}
    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs 
    px-3 py-1.5 rounded-full shadow-md transition-all duration-200 z-10"
  >
    ❌ Delete
  </button>

  {/* Dark Overlay on hover */}
  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 rounded-t-2xl"></div>
</div>

      
   {/* Property Info */}
<div>
  <label className="inline-block text-[10px] text-blue-500 uppercase tracking-wide 
    bg-blue-50 px-1.5 py-[1px] rounded-md mb-1">
    Property
  </label>
  <h3 className="text-sm font-semibold text-blue-700">{propertyName}</h3>
</div>

{/* Reviewer Info */}
<div>
  <label className="inline-block text-[10px] text-green-500 uppercase tracking-wide 
    bg-green-50 px-1.5 py-[1px] rounded-md mb-1">
    Reviewer
  </label>
  <p className="text-xs text-gray-800 font-medium">{reviewerName}</p>
  <p className="text-[9px] text-gray-500">{reviewerEmail}</p>
</div>

{/* Rating */}
<div>
  <label className="inline-block text-[10px] text-yellow-600 uppercase tracking-wide 
    bg-yellow-50 px-1.5 py-[1px] rounded-md mb-1">
    Rating
  </label>
  <div className="flex items-center gap-1 mt-[1px]">
    <Rating style={{ maxWidth: 90 }} value={ratingValue} readOnly />
    <span className="text-xs text-gray-700">{ratingValue}/5</span>
  </div>
</div>

{/* Review Text */}
<div>
  <label className="inline-block text-[10px] text-purple-600 uppercase tracking-wide 
    bg-purple-50 px-1.5 py-[1px] rounded-md mb-1">
    Review
  </label>
  <p
    className="text-xs text-gray-700 italic leading-snug bg-gradient-to-r 
    from-blue-50 to-blue-100 rounded-md px-3 py-2 border border-blue-100 shadow-sm"
  >
    “{reviewText || "No review text provided"}”
  </p>
</div>

{/* Date */}
<div className="flex justify-between items-center border-t pt-2 mt-1 text-[10px] text-gray-500">
  <span>
    <label className="text-gray-400 mr-1 inline-block bg-gray-100 px-1 rounded">
      Date:
    </label>
    {new Date(reviewDate).toLocaleDateString()}
  </span>
  <span className="text-blue-600 font-semibold">✅ Verified</span>
</div>

    </div>
  );
};

export default RatingCart;
