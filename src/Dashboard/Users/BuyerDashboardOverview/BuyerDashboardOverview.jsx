import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaCartPlus, FaStar, FaHistory, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const BuyerDashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://home-nest-server-rho.vercel.app/buyer/overview-stats/${user?.email}`
        )
        .then((res) => {
          setStats(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  if (loading)
    return (
      <div className="p-10 animate-pulse font-black italic text-indigo-500">
        LOADING YOUR DATA...
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Welcome Back, {user?.displayName}!
          </h2>
          <p className="opacity-80 font-bold mt-1">
            Check your property bookings and reviews in one place.
          </p>
        </div>
        <FaHistory className="absolute -right-5 -bottom-5 text-9xl opacity-10 rotate-12" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bookings Card */}
        <div className="bg-white dark:bg-[#111418] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                My Bookings
              </p>
              <h3 className="text-5xl font-black mt-2 text-gray-800 dark:text-white">
                {stats?.totalBookings || 0}
              </h3>
              <Link
                to="/dashboard/my-booking"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-indigo-500 hover:gap-3 transition-all"
              >
                VIEW ALL BOOKINGS <FaArrowRight />
              </Link>
            </div>
            <div className="bg-indigo-500 p-5 rounded-3xl text-white text-2xl shadow-lg shadow-indigo-500/30">
              <FaCartPlus />
            </div>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-white dark:bg-[#111418] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Reviews Given
              </p>
              <h3 className="text-5xl font-black mt-2 text-gray-800 dark:text-white">
                {stats?.totalReviews || 0}
              </h3>
              <Link
                to="/dashboard/my-ratings"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:gap-3 transition-all"
              >
                MANAGE REVIEWS <FaArrowRight />
              </Link>
            </div>
            <div className="bg-amber-500 p-5 rounded-3xl text-white text-2xl shadow-lg shadow-amber-500/30">
              <FaStar />
            </div>
          </div>
        </div>
      </div>

      {/* User Tips / Empty State */}
      <div className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-800/20 border border-dashed border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm font-bold text-gray-500 italic">
          "Looking for your dream home? Keep exploring our latest properties!"
        </p>
        <Link
          to="/properties"
          className="mt-4 inline-block px-6 py-2 bg-white dark:bg-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-gray-100 dark:border-gray-700"
        >
          Explore Properties
        </Link>
      </div>
    </div>
  );
};

export default BuyerDashboardOverview;
