import React from 'react';
import { FaUsers, FaUserShield, FaUserTie } from 'react-icons/fa';

const UserOverview = ({ stats }) => {
    return (
        <div className="bg-white dark:bg-[#111418] p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-500/10 text-blue-600 rounded-2xl text-2xl">
                    <FaUsers />
                </div>
                <div>
                    <h3 className="text-xl font-black uppercase italic dark:text-white">User Overview</h3>
                    <p className="text-xs font-bold text-gray-400">Manage platform members</p>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <FaUserShield className="text-red-500" />
                        <span className="text-sm font-bold dark:text-gray-300">Admins</span>
                    </div>
                    <span className="font-black dark:text-white">{stats?.admins || 0}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <FaUserTie className="text-orange-500" />
                        <span className="text-sm font-bold dark:text-gray-300">Sellers</span>
                    </div>
                    <span className="font-black dark:text-white">{stats?.sellers || 0}</span>
                </div>
            </div>
        </div>
    );
};

export default UserOverview;