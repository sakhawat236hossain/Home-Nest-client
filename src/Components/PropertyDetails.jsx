import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import PropertyDetailsCart from "./PropertyDetailsCart";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const detailsData = useLoaderData();
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewText = e.target.review.value;

    const reviewData = {
      reviewerName: user?.displayName || "Anonymous",
      propertyName: detailsData.propertyName,
      rating,
      reviewText,
      reviewDate: new Date(),
      propertyThumbnail: detailsData.imageLink,
      reviewerEmail: user?.email,
    };
     fetch("http://localhost:8000/addPropertyRating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
    
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review Submitted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      e.target.reset();
           setRating(0);
      })
      .catch(err=>{
        console.log(err);
      })
  };

  return (
    <div className="px-3 flex justify-center bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen py-6">
      <div className="w-full max-w-2xl space-y-8">
        <PropertyDetailsCart detailsData={detailsData} />

        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-700 drop-shadow-sm">
            Ratings & Reviews
          </h3>
          <p className="text-sm text-blue-500">
            Share your experience about this property
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/95 shadow-xl p-5 rounded-2xl border border-blue-200 
          transition transform hover:scale-[1.01] duration-300"
        >
          <div className="flex justify-center mt-1">
            <Rating
              style={{ maxWidth: 145 }}
              value={rating}
              onChange={setRating}
              isRequired
            />
          </div>

          <div className="mt-4">
            <label className="font-medium text-blue-900 block pb-1 text-sm">
              Your Review
            </label>
            <textarea
              name="review"
              rows="2"
              placeholder="Write a short review..."
              required
              className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm 
              focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg 
            shadow-md hover:shadow-blue-400/50 active:scale-95 transition-all duration-200"
          >
            Submit Review ✅
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetails;
