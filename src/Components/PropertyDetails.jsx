import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined,  FaPhoneAlt, FaEnvelope, FaClock, FaCarSide } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";

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
    <div className="min-h-screen py-10 transition-colors duration-500 bg-slate-50 dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
          <div className="space-y-4">
            <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-4.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] border border-indigo-100/50 dark:border-indigo-900/30">
              {category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              {propertyName}
            </h1>
            <p className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-wider">
              <FaMapMarkerAlt className="text-rose-500 shrink-0" size={14} /> {location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-2">Estimated Price</p>
            <h2 className="text-3xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">${price?.toLocaleString()}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Padded Premium Image Cover */}
            <div className="rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 transition-all duration-300">
              <img src={image} className="w-full h-[320px] md:h-[500px] object-cover rounded-[2rem]" alt={propertyName} />
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] border border-slate-100 dark:border-slate-800/80 shadow-sm transition-all duration-350">
              {category === "Car" ? (
                <div className="flex items-center gap-4 col-span-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/40 shrink-0">
                    <FaCarSide className="text-indigo-500" size={20}/>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">Model</p>
                    <p className="font-bold text-sm text-slate-850 dark:text-white mt-0.5">{specs?.carModel || "N/A"}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/40 shrink-0">
                      <FaBed className="text-indigo-500" size={20}/>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">Beds</p>
                      <p className="font-bold text-sm text-slate-855 dark:text-white mt-0.5">{specs?.beds || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/40 shrink-0">
                      <FaBath className="text-indigo-500" size={20}/>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">Baths</p>
                      <p className="font-bold text-sm text-slate-855 dark:text-white mt-0.5">{specs?.baths || 0}</p>
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/40 shrink-0">
                  <FaRulerCombined className="text-indigo-500" size={20}/>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">Area</p>
                  <p className="font-bold text-sm text-slate-855 dark:text-white mt-0.5">{specs?.area || 0} sqft</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/40 shrink-0">
                  <FaClock className="text-indigo-500" size={20}/>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">Posted</p>
                  <p className="font-bold text-sm text-slate-855 dark:text-white mt-0.5">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-black border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 mb-6 uppercase tracking-wider text-slate-800 dark:text-white">Property Description</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-bold uppercase tracking-tight pl-5 border-l border-slate-100 dark:border-slate-800">
                "{description}"
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Agent Box */}
              <div className="bg-[#0F172A] text-white p-8 rounded-[2.2rem] border border-slate-800 shadow-xl relative overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <img src={agentImage} className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-sm p-0.5 bg-[#0F172A]" alt={agentName} />
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight">{agentName}</h4>
                      <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mt-1">Verified Agent</p>
                    </div>
                  </div>
                  <div className="space-y-3.5 mb-8">
                    <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10 font-bold text-xs uppercase tracking-tight">
                      <FaEnvelope className="text-indigo-400 shrink-0" /> <span className="truncate">{agentEmail}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10 font-bold text-xs uppercase tracking-tight">
                      <FaPhoneAlt className="text-indigo-400 shrink-0" /> <span>{agentContact}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleBookProperty}
                    className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-md hover:shadow-indigo-500/20 active:scale-98 transition-all duration-300"
                  >
                    Request to Book
                  </button>
                </div>
              </div>

              {/* Review Input */}
              <div className="p-8 rounded-[2.2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm transition-all duration-300">
                <h4 className="text-sm font-black mb-5 dark:text-white uppercase tracking-wider">Write a Review</h4>
                <div className="mb-5 flex justify-start">
                  <Rating 
                    style={{ maxWidth: 130 }} 
                    value={rating} 
                    onChange={setRating} 
                    isRequired 
                  />
                </div>
                <textarea 
                  className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 dark:bg-slate-950 dark:text-white text-xs font-bold uppercase tracking-tight"
                  placeholder="Share your thoughts about this property..."
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <button 
                  onClick={handleReviewSubmit}
                  className="w-full mt-4 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-all shadow-md active:scale-98 cursor-pointer border border-indigo-500/20"
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