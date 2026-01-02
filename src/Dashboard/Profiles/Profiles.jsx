import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { FaEnvelope, FaUserTag, FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaPhoneAlt, FaCheckCircle, FaBuilding, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Profiles = () => {
    const { user } = useContext(AuthContext);

    // This role can be dynamic later from your database
    const userRole = "Buyer"; 

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="max-w-5xl mx-auto">
                
                {/* Main Profile Card */}
                <div className="bg-white dark:bg-[#16191E] rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500">
                    
                    {/* Header Banner */}
                    <div className="h-40 md:h-60 bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#C026D3] relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 p-3 rounded-2xl text-white transition-all shadow-xl"
                        >
                            <FaEdit className="text-xl" />
                        </motion.button>
                    </div>

                    {/* Profile Content Section */}
                    <div className="relative px-6 md:px-12 pb-12">
                        
                        {/* Profile Image & Essential Info */}
                        <div className="flex flex-col md:flex-row items-end -mt-20 md:-mt-24 mb-10 gap-6">
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="relative group"
                            >
                                <img 
                                    src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                    alt="Profile" 
                                    className="w-36 h-36 md:w-48 md:h-48 rounded-[2.5rem] object-cover border-8 border-white dark:border-[#16191E] shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 right-4 bg-green-500 p-2 rounded-full border-4 border-white dark:border-[#16191E]">
                                    <FaCheckCircle className="text-white text-sm" />
                                </div>
                            </motion.div>

                            <div className="flex-1 pb-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white tracking-tight">
                                        {user?.displayName || "Anonymous User"}
                                    </h1>
                                    <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-500 text-xs font-black uppercase tracking-widest rounded-full border border-indigo-500/20">
                                        {userRole}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-3 text-gray-500 dark:text-gray-400 font-medium">
                                    <span className="flex items-center gap-2"><FaEnvelope className="text-indigo-500" /> {user?.email}</span>
                                    <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-rose-500" /> Dhaka, Bangladesh</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {[
                                { label: 'Properties', count: '12', icon: <FaBuilding className="text-blue-500" /> },
                                { label: 'Reviews', count: '48', icon: <FaStar className="text-yellow-500" /> },
                                { label: 'Role', count: userRole, icon: <FaUserTag className="text-purple-500" /> },
                                { label: 'Experience', count: '2 Years', icon: <FaCalendarAlt className="text-green-500" /> },
                            ].map((stat, i) => (
                                <div key={i} className="p-4 rounded-[1.5rem] bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-center hover:border-indigo-500/50 transition-all cursor-default">
                                    <div className="flex justify-center mb-2 text-xl">{stat.icon}</div>
                                    <div className="text-xl font-black text-gray-800 dark:text-white">{stat.count}</div>
                                    <div className="text-[10px] uppercase font-bold tracking-tighter opacity-50">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Detailed Info Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Left Col: Info List */}
                            <div className="lg:col-span-1 space-y-6">
                                <h3 className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-3">
                                    Personal Details
                                    <div className="h-1 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Phone Number</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-200">+880 1851 121 472</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Member Since</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-200">January 02, 2026</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Verification</span>
                                        <span className="text-green-500 font-black text-sm">LEVEL 2 VERIFIED</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: About/Bio */}
                            <div className="lg:col-span-2 space-y-6">
                                <h3 className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-3">
                                    About Me
                                    <div className="h-1 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                </h3>
                                <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 relative">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic font-medium">
                                        "Hello, I'm {user?.displayName}. I am passionate about finding the perfect homes and investments in the Property Hub market. My goal is to maintain a high-quality portfolio and provide honest feedback to the community."
                                    </p>
                                    <div className="absolute -bottom-3 -right-3 text-6xl opacity-10 font-serif text-indigo-500">"</div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 min-w-max px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest"
                                    >
                                        Edit Account
                                    </motion.button>
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 min-w-max px-8 py-4 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all uppercase text-xs tracking-widest"
                                    >
                                        Settings
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Tag */}
                <p className="text-center mt-8 text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
                    Property Hub Security Verified Account
                </p>
            </div>
        </div>
    );
};

export default Profiles;