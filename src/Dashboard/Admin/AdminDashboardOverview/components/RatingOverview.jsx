import React from 'react';
import { FaStar, FaRegStar, FaExternalLinkAlt } from 'react-icons/fa';

const RatingOverview = ({ stats }) => {
    // এখানে আমরা টোটাল রেটিং দেখাচ্ছি
    const totalReviews = stats?.total || 0;

    return (
        <div className="bg-white dark:bg-[#111418] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-amber-500/10 text-amber-600 rounded-2xl text-2xl">
                        <FaStar />
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase italic dark:text-white leading-none">Reviews</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Platform Feedback</p>
                    </div>
                </div>
                <button className="text-indigo-500 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                    All Reviews <FaExternalLinkAlt />
                </button>
            </div>

            <div className="flex flex-col items-center justify-center py-4 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                <div className="flex gap-1 mb-2 text-amber-500 text-xl">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaRegStar className="opacity-50" />
                </div>
                <h2 className="text-5xl font-black text-gray-800 dark:text-white tracking-tighter">
                    {totalReviews}
                </h2>
                <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mt-1">Total Ratings Recieved</p>
            </div>

            {/* ছোট একটি স্ট্যাটাস বার */}
            <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>Positive Feedback</span>
                    <span>85%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default RatingOverview;