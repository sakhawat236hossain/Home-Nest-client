import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaHome, FaCheckCircle, FaClock, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const SellerDashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://home-nest-server-rho.vercel.appseller/overview-stats/${user?.email}`
        )
        .then((res) => {
          setStats(res.data);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading)
    return (
      <div className="p-10 animate-pulse font-black italic">
        LOADING SELLER DATA...
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter dark:text-white">
          Seller <span className="text-orange-500">Dashboard</span>
        </h1>
        <p className="text-gray-500 font-bold text-sm">
          Welcome back, {user?.displayName}!
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Properties */}
        <div className="bg-white dark:bg-[#111418] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl text-xl">
              <FaHome />
            </div>
            <span className="text-[10px] font-black uppercase text-gray-400">
              Total Listed
            </span>
          </div>
          <h2 className="text-3xl font-black dark:text-white">
            {stats?.totalProperties || 0}
          </h2>
        </div>

        {/* Verified Properties */}
        <div className="bg-white dark:bg-[#111418] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-green-500/10 text-green-600 rounded-xl text-xl">
              <FaCheckCircle />
            </div>
            <span className="text-[10px] font-black uppercase text-gray-400">
              Verified
            </span>
          </div>
          <h2 className="text-3xl font-black dark:text-white">
            {stats?.verifiedProperties || 0}
          </h2>
        </div>

        {/* Pending Approval */}
        <div className="bg-white dark:bg-[#111418] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl text-xl">
              <FaClock />
            </div>
            <span className="text-[10px] font-black uppercase text-gray-400">
              Pending
            </span>
          </div>
          <h2 className="text-3xl font-black dark:text-white">
            {stats?.pendingProperties || 0}
          </h2>
        </div>

        {/* Total Bookings */}
        <div className="bg-white dark:bg-[#111418] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl text-xl">
              <FaShoppingCart />
            </div>
            <span className="text-[10px] font-black uppercase text-gray-400">
              Bookings
            </span>
          </div>
          <h2 className="text-3xl font-black dark:text-white">
            {stats?.totalBookings || 0}
          </h2>
        </div>
      </div>

      {/* Quick Actions or Property Summary */}
      <div className="bg-white dark:bg-[#111418] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-black uppercase italic mb-6 dark:text-white">
          Seller Insights
        </h3>
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl">
          <p className="text-gray-400 font-bold italic">
            Property performance graph coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardOverview;
