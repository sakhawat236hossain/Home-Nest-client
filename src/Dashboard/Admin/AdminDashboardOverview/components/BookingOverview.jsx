import React from 'react';
// fa6 এ ShoppingCart এর বদলে CartShopping ব্যবহার করা হয়
import { FaCartShopping, FaCalendarCheck, FaArrowTrendUp } from 'react-icons/fa6'; 
import { FaExternalLinkAlt } from 'react-icons/fa'; 

const BookingOverview = ({ stats }) => {
    return (
        <div className="bg-white dark:bg-[#111418] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md group">
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-2xl text-2xl group-hover:scale-110 transition-transform">
                        {/* আইকনের নাম এখানে পরিবর্তন করা হয়েছে */}
                        <FaCartShopping /> 
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase italic dark:text-white leading-none">Property Bookings</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Transaction Summary</p>
                    </div>
                </div>
                <button className="text-indigo-500 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                    Manage <FaExternalLinkAlt />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="relative overflow-hidden p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
                    <FaCalendarCheck className="absolute -right-4 -bottom-4 text-9xl opacity-10 rotate-12" />
                    
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Total Orders Placed</p>
                        <div className="flex items-baseline gap-3 mt-2">
                            <h2 className="text-6xl font-black tracking-tighter">
                                {stats?.total || 0}
                            </h2>
                            <span className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">
                                <FaArrowTrendUp /> Active
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">System Status</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase italic">All Syncing</span>
                </div>
            </div>
        </div>
    );
};

export default BookingOverview;