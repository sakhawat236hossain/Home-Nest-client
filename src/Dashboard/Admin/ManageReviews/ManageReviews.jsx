import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt, FaQuoteLeft, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingData from "../../../Components/LoadingData";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  // ১. সকল রিভিউ ফেচ করা
  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-reviews");
      return res.data;
    },
  });

  // ২. রিভিউ ডিলিট করার ফাংশন
  const handleDeleteReview = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/reviews/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "The review has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete the review.", "error");
        }
      }
    });
  };

  if (isLoading) return <LoadingData />;

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
            Manage <span className="text-indigo-600">Reviews</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
            Monitor and moderate user feedback to maintain quality.
          </p>
        </div>

        {/* Reviews Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 flex flex-col justify-between relative overflow-hidden group"
            >
              <FaQuoteLeft className="absolute -top-2 -right-2 text-gray-100 dark:text-gray-800 text-8xl -z-0 opacity-50 group-hover:scale-110 transition-transform" />
              
              <div className="relative z-10">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-50"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 leading-none">
                      {review.reviewerName}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {review.reviewerEmail}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? "fill-current" : "text-gray-200 dark:text-gray-700"} size={12} />
                        ))}
                    </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic leading-relaxed">
                    "{review.reviewDescription}"
                  </p>
                </div>

                {/* Property Name */}
                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter">Property:</p>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{review.propertyName}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="mt-6 w-full py-3 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 group/btn border border-rose-100 dark:border-gray-800 dark:bg-gray-800"
              >
                <FaTrashAlt className="group-hover/btn:animate-bounce" />
                DELETE REVIEW
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
            <p className="text-gray-400 font-bold uppercase tracking-widest italic">No reviews found to moderate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReviews;