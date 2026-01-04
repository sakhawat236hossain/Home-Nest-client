import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { 
    FaEnvelope, FaUserTag, FaCalendarAlt, FaEdit, 
    FaMapMarkerAlt, FaCheckCircle, FaBuilding, FaStar, FaShieldAlt, FaCamera, FaUserCircle 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import useRole from '../../hooks/useRole';
import Swal from 'sweetalert2';

const Profiles = () => {
    const { user, updateUserProfile } = useContext(AuthContext); // updateUserProfile context থেকে নিচ্ছি
    const { role, isLoading } = useRole();
    const [loading, setLoading] = useState(false);

    // আপডেট হ্যান্ডলার ফাংশন
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;

        setLoading(true);
        try {
            await updateUserProfile(name, photo);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById('profile_modal').close();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center font-bold uppercase tracking-widest text-indigo-500">Loading Profile...</div>;
    }

    return (
        <div className="min-h-screen py-6 md:py-10 px-4 bg-transparent">
            <div className="max-w-5xl mx-auto">
                
                <div className="bg-white dark:bg-[#111418] rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500">
                    
                    {/* Header Banner */}
                    <div className={`h-40 md:h-60 relative transition-colors duration-700 ${
                        role === 'admin' ? 'bg-gradient-to-r from-red-600 to-rose-500' : 
                        role === 'seller' ? 'bg-gradient-to-r from-orange-500 to-amber-400' : 
                        'bg-gradient-to-r from-indigo-600 to-violet-500'
                    }`}>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        
                        {/* Edit Badge - ক্লিক করলে মডাল খুলবে */}
                        <motion.button 
                            onClick={() => document.getElementById('profile_modal').showModal()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 p-3 rounded-2xl text-white transition-all shadow-xl"
                        >
                            <FaEdit className="text-xl" />
                        </motion.button>
                    </div>

                    <div className="relative px-6 md:px-12 pb-12">
                        {/* Profile Image */}
                        <div className="flex flex-col md:flex-row items-end -mt-20 md:-mt-24 mb-10 gap-6">
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative group">
                                <img 
                                    src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                    className="w-40 h-40 md:w-52 md:h-52 rounded-[3rem] object-cover border-8 border-white dark:border-[#111418] shadow-2xl transition-transform duration-500 group-hover:rotate-2"
                                    alt="Profile" 
                                />
                                <div className="absolute bottom-4 right-4 bg-green-500 p-2.5 rounded-full border-4 border-white dark:border-[#111418]">
                                    <FaCheckCircle className="text-white text-base" />
                                </div>
                            </motion.div>

                            <div className="flex-1 pb-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white tracking-tighter uppercase italic">
                                        {user?.displayName}
                                    </h1>
                                    <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                                        role === 'admin' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                        role === 'seller' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                                        'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
                                    }`}>
                                        {role || 'User'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-5 mt-4 text-gray-500 dark:text-gray-400 font-bold text-sm">
                                    <span className="flex items-center gap-2 hover:text-indigo-500 transition-colors"><FaEnvelope /> {user?.email}</span>
                                    <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-rose-500" /> Bangladesh</span>
                                    <span className="flex items-center gap-2 text-green-500"><FaShieldAlt /> Verified Profile</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {/* ... (আপনার আগের ম্যাপ করা স্ট্যাটস কোড এখানে থাকবে) ... */}
                        </div>

                        {/* Detailed Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Account Info */}
                            <div className="lg:col-span-1 space-y-6">
                                <h3 className="text-lg font-black text-gray-800 dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                    Account Info
                                    <div className="h-[2px] flex-1 bg-gray-100 dark:bg-gray-800"></div>
                                </h3>
                                <div className="space-y-5 bg-gray-50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Unique ID</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-200 truncate">{user?.uid?.slice(0, 15)}...</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Login</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-200">{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bio & Actions */}
                            <div className="lg:col-span-2 space-y-6">
                                <h3 className="text-lg font-black text-gray-800 dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                                    Professional Bio
                                    <div className="h-[2px] flex-1 bg-gray-100 dark:bg-gray-800"></div>
                                </h3>
                                <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic font-bold text-lg relative z-10">
                                        Greetings, I am {user?.displayName}. Actively operating as a <span className="text-indigo-500">{role}</span> on Property Hub.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <motion.button 
                                        onClick={() => document.getElementById('profile_modal').showModal()}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex-1 min-w-[160px] px-8 py-4 text-white font-black rounded-2xl shadow-xl transition-all uppercase text-[10px] tracking-[0.2em] ${
                                            role === 'admin' ? 'bg-red-600 shadow-red-500/20' : 'bg-indigo-600 shadow-indigo-500/20'
                                        }`}
                                    >
                                        Update Profile
                                    </motion.button>
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 min-w-[160px] px-8 py-4 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all uppercase text-[10px] tracking-[0.2em]"
                                    >
                                        View Activities
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Update Modal --- */}
                <dialog id="profile_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box dark:bg-[#1a1d23] dark:text-white rounded-3xl border border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-2xl uppercase italic tracking-tighter">Edit Profile</h3>
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                            </form>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                                    <FaUserCircle /> New Display Name
                                </label>
                                <input 
                                    name="name"
                                    type="text" 
                                    defaultValue={user?.displayName}
                                    placeholder="Enter your name" 
                                    className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                                    <FaCamera /> New Photo URL
                                </label>
                                <input 
                                    name="photo"
                                    type="url" 
                                    defaultValue={user?.photoURL}
                                    placeholder="https://example.com/photo.jpg" 
                                    className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                                    required
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50"
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default Profiles;