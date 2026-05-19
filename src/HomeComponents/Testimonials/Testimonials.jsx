import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
} from "react-icons/fa";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("https://home-nest-server-rho.vercel.app/allPropertyRatings")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-indigo-100 dark:bg-indigo-950/40 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, 8);

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4.5 py-1.5 mb-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30"
          >
            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-[0.4em]">
              Trusted by Thousands
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Client{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Experiences
            </span>
          </motion.h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <AnimatePresence>
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-[#1E293B] p-8 rounded-[2.2rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 border border-slate-100 dark:border-slate-800/80 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-600 transition-colors duration-500 border border-slate-100 dark:border-slate-700/20">
                      <FaQuoteLeft className="text-lg text-indigo-600 dark:text-indigo-400 group-hover:text-white dark:group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex gap-0.5 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-[10px] ${
                              i < (review.rating || 5)
                                ? "text-amber-400"
                                : "text-slate-200 dark:text-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                        Rating
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                    <span className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase truncate tracking-tight">
                      {review.propertyName || "Home Nest Property"}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed mb-8 font-medium italic">
                    "{review.reviewDescription || "Great service and amazing property management!"}"
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-850">
                  <div className="relative">
                    <img
                      src={
                        review.reviewerImage ||
                        "https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png"
                      }
                      className="w-12 h-12 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-800/80 group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900/30 transition-all"
                      alt={review.reviewerName}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#1E293B]"></div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-slate-800 dark:text-white text-xs truncate uppercase tracking-tight">
                      {review.reviewerName}
                    </h4>
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-1">
                      <FaCalendarAlt />
                      {review.reviewDate
                        ? new Date(review.reviewDate).toLocaleDateString(
                            "en-US",
                            { month: "short", year: "numeric" }
                          )
                        : "Recent"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Advanced View Toggle Button */}
        {reviews.length > 8 && (
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAll(!showAll)}
              className="relative inline-flex items-center gap-3 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all group overflow-hidden cursor-pointer border dark:border-slate-800"
            >
              <span className="relative z-10 uppercase text-xs tracking-[0.2em]">
                {showAll
                  ? "Minimize Feed"
                  : `Explore All ${reviews.length} Reviews`}
              </span>
              <span className="relative z-10">
                {showAll ? <FaArrowUp /> : <FaArrowDown />}
              </span>
              <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
