import React from 'react';
import { FaHome, FaClock, FaCheckCircle } from 'react-icons/fa';

const PropertyOverview = ({ stats }) => {
    return (
        <div className="bg-white dark:bg-[#111418] p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-indigo-500/10 text-indigo-600 rounded-2xl text-2xl">
                    <FaHome />
                </div>
                <div>
                    <h3 className="text-xl font-black uppercase italic dark:text-white">Property Status</h3>
                    <p className="text-xs font-bold text-gray-400">Review submissions</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-center">
                    <FaClock className="mx-auto text-amber-500 mb-2" />
                    <p className="text-2xl font-black text-amber-600">{stats?.pending || 0}</p>
                    <p className="text-[10px] font-black uppercase text-amber-700">Pending</p>
                </div>
                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 text-center">
                    <FaCheckCircle className="mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-black text-green-600">{stats?.verified || 0}</p>
                    <p className="text-[10px] font-black uppercase text-green-700">Verified</p>
                </div>
            </div>
        </div>
    );
};

export default PropertyOverview;