import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined,  FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PropertyDetails = () => {
  const detailsData = useLoaderData();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState(""); 
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    propertyName,
    description,
    category,
    price,
    location,
    image,
    specs,
    agentName,
    agentImage,
    agentEmail,
    agentContact,
    createdAt,
  } = detailsData;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) return Swal.fire("Login Required", "Please login to leave a review", "warning");
    if (rating === 0) return Swal.fire("Rating Required", "Please select a star rating", "info");
    if (!reviewText) return Swal.fire("Review Required", "Please write something about the property", "info");

const reviewData = {
    propertyId: _id,
    propertyName,
    image,
    reviewerName: user?.displayName,
    reviewerEmail: user?.email,
    reviewerImage: user?.photoURL,
    rating,
    reviewDescription:reviewText ,
    reviewDate: new Date(),
};

    try {
      const res = await axiosSecure.post("/addPropertyRating", reviewData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your review has been published successfully.",
          timer: 2000,
          showConfirmButton: false
        });
        setRating(0);
        setReviewText("");
      }
    } catch (err) {
      Swal.fire("Error", "Could not submit review. Try again.", "error");
    }
  };

  const handleBookProperty = async () => {
    if (!user) return Swal.fire("Login Required", "Please login to book", "warning");

    const bookingData = {
      propertyId: _id,
      propertyName,
      price,
      image,
      location,
      agentName,
      agentEmail,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      bookingDate: new Date(),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/bookProperty", bookingData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Booking request sent to agent", "success");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className=" min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200 dark:border-blue-800">
              {category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4 tracking-tight">
              {propertyName}
            </h1>
            <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-3 text-lg">
              <FaMapMarkerAlt className="text-red-500" /> {location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-gray-400 text-sm font-bold uppercase">Estimated Price</p>
            <h2 className="text-4xl md:text-5xl font-black text-blue-600">${price?.toLocaleString()}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <img src={image} className="w-full h-[500px] object-cover" alt="" />
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 dark:bg-[#15181e] p-6 rounded-[24px]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"><FaBed className="text-blue-500" size={20}/></div>
                <div><p className="text-xs text-gray-400 font-bold uppercase">Beds</p><p className="font-bold dark:text-white">{specs?.beds || 0}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"><FaBath className="text-blue-500" size={20}/></div>
                <div><p className="text-xs text-gray-400 font-bold uppercase">Baths</p><p className="font-bold dark:text-white">{specs?.baths || 0}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"><FaRulerCombined className="text-blue-500" size={20}/></div>
                <div><p className="text-xs text-gray-400 font-bold uppercase">Area</p><p className="font-bold dark:text-white">{specs?.area} sqft</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"><FaClock className="text-blue-500" size={20}/></div>
                <div><p className="text-xs text-gray-400 font-bold uppercase">Posted</p><p className="font-bold dark:text-white">{new Date(createdAt).toLocaleDateString()}</p></div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-black border-l-4 border-blue-600 pl-4 mb-6 uppercase">Property Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg italic">
                "{description}"
              </p>
            </div>
          </div>

          {/* Right Column (Sticky Side) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-10 space-y-6">
              
              {/* Agent & Book Card */}
              <div className="bg-gray-900 text-white p-8 rounded-[32px] shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <img src={agentImage} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500 p-1" alt="" />
                    <div>
                      <h4 className="text-xl font-bold">{agentName}</h4>
                      <p className="text-blue-400 text-sm font-bold">Verified Agent</p>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                      <FaEnvelope className="text-blue-400" /> <span className="text-sm truncate">{agentEmail}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                      <FaPhoneAlt className="text-blue-400" /> <span className="text-sm">{agentContact}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleBookProperty}
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg shadow-blue-600/30"
                  >
                    Request to Book
                  </button>
              </div>

              {/* Functional Review Section */}
              <div className="p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
                <h4 className="text-xl font-black mb-4 dark:text-white uppercase tracking-tight">Write a Review</h4>
                <div className="mb-4">
                  <Rating 
                    style={{ maxWidth: 140 }} 
                    value={rating} 
                    onChange={setRating} 
                    isRequired 
                  />
                </div>
                <textarea 
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm"
                  placeholder="Share your thoughts about this property..."
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <button 
                  onClick={handleReviewSubmit}
                  className="w-full mt-4 py-3 rounded-xl font-bold bg-blue-600 transition-all active:scale-95 cursor-pointer"
                >
                  Submit Review
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;