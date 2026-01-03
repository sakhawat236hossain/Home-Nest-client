import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaCheckCircle, FaHome, FaArrowDown, FaArrowUp } from 'react-icons/fa';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false); 

    useEffect(() => {
        fetch("https://home-nest-server-rho.vercel.app/allPropertyRatings")
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                <span className="ml-3 font-bold text-indigo-600 tracking-widest">LOADING REVIEWS...</span>
            </div>
        );
    }

   
    const displayedReviews = showAll ? reviews : reviews.slice(0, 4);

    return (
        <section className="py-24  transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.3em]"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white mt-3"
                    >
                        What Our Clients Say
                    </motion.h2>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {displayedReviews.map((review, index) => (
                            <motion.div
                                key={review._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-[#16191E] p-6 rounded-[2rem] shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col justify-between group hover:border-indigo-500/50 transition-all"
                            >
                                <div className="relative">
                                    <FaQuoteLeft className="text-4xl text-indigo-500/10 mb-4" />
                                    
                                    <div className="flex gap-0.5 mb-3">
                                        {[...Array(parseInt(review.rating || 5))].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-[10px]" />
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-indigo-500 uppercase">
                                        <FaHome /> {review.propertyName?.substring(0, 20)}...
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic line-clamp-4">
                                        "{review.reviewText}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 border-t dark:border-gray-800 pt-5 mt-auto">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/20">
                                        {review.reviewerName?.charAt(0) || 'U'}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="font-bold text-gray-800 dark:text-white text-xs truncate">
                                            {review.reviewerName}
                                        </h4>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase">
                                            {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString('en-GB') : "Recently"}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show All / Show Less Button */}
                {reviews.length > 4 && (
                    <div className="mt-12 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAll(!showAll)}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest"
                        >
                            {showAll ? (
                                <>Show Less <FaArrowUp /></>
                            ) : (
                                <>See All Reviews ({reviews.length}) <FaArrowDown /></>
                            )}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;