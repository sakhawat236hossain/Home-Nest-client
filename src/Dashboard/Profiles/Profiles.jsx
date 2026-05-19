import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { 
    FaEnvelope, FaEdit, 
    FaMapMarkerAlt, FaCheckCircle, FaShieldAlt, FaCamera, FaUserCircle 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import useRole from '../../hooks/useRole';
import Swal from 'sweetalert2';

const Profiles = () => {
    const { user, updateUserProfile } = useContext(AuthContext); 
    const { role, isLoading } = useRole();
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="min-h-screen py-6 md:py-10 px-2 bg-transparent">
            <div className="max-w-5xl mx-auto">
                
                <div className="bg-white dark:bg-[#1E293B] rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800/80 transition-all duration-500">
                    
                    {/* Header Banner */}
                    <div className={`h-40 md:h-60 relative transition-colors duration-700 rounded-t-[2.5rem] ${
                        role === 'admin' ? 'from-rose-600 to-pink-500 bg-gradient-to-r' : 
                        role === 'seller' ? 'from-amber-500 to-orange-500 bg-gradient-to-r' : 
                        'from-indigo-600 to-violet-500 bg-gradient-to-r'
                    }`}>
                        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        
                        {/* Edit Badge */}
                        <motion.button 
                            onClick={() => document.getElementById('profile_modal').showModal()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 p-3 rounded-2xl text-white transition-all shadow-xl cursor-pointer"
                        >
                            <FaEdit className="text-xl" />
                        </motion.button>
                    </div>

                    <div className="relative px-6 md:px-12 pb-12">
                        {/* Profile Image & Meta */}
                        <div className="flex flex-col md:flex-row items-end -mt-20 md:-mt-24 mb-10 gap-6">
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative group">
                                <img 
                                    src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                    className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] object-cover border-8 border-white dark:border-[#1E293B] shadow-2xl transition-transform duration-500 group-hover:rotate-1"
                                    alt="Profile" 
                                />
                                <div className="absolute bottom-4 right-4 bg-emerald-550 p-2.5 rounded-full border-4 border-white dark:border-[#1E293B] bg-emerald-500">
                                    <FaCheckCircle className="text-white text-base" />
                                </div>
                            </motion.div>

                            <div className="flex-1 pb-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic">
                                        {user?.displayName}
                                    </h1>
                                    <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                                        role === 'admin' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                                        role === 'seller' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                                        'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
                                    }`}>
                                        {role || 'User'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-5 mt-5 text-slate-500 dark:text-slate-455 font-bold text-xs uppercase tracking-wider">
                                    <span className="flex items-center gap-2 hover:text-indigo-500 transition-colors cursor-pointer"><FaEnvelope /> {user?.email}</span>
                                    <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-rose-500" /> Bangladesh</span>
                                    <span className="flex items-center gap-2 text-emerald-500"><FaShieldAlt /> Verified Profile</span>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Account Info */}
                            <div className="lg:col-span-1 space-y-6">
                                <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-3 uppercase tracking-wider">
                                    Account Info
                                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800/80"></div>
                                </h3>
                                <div className="space-y-5 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800/85">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Unique ID</span>
                                        <span className="font-bold text-sm text-slate-700 dark:text-slate-200 truncate mt-1">{user?.uid?.slice(0, 15)}...</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Last Login</span>
                                        <span className="font-bold text-sm text-slate-700 dark:text-slate-200 mt-1">{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bio & Actions */}
                            <div className="lg:col-span-2 space-y-6">
                                <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-3 uppercase tracking-wider">
                                    Professional Bio
                                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800/80"></div>
                                </h3>
                                <div className="p-8 rounded-[2.2rem] bg-indigo-500/5 border border-indigo-500/10 dark:border-indigo-500/5 relative overflow-hidden">
                                    <p className="text-slate-655 dark:text-slate-300 leading-relaxed italic font-bold text-lg relative z-10">
                                        Greetings, I am {user?.displayName}. Actively operating as a <span className="text-indigo-600 dark:text-indigo-400">{role}</span> on Property Hub.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <motion.button 
                                        onClick={() => document.getElementById('profile_modal').showModal()}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex-1 min-w-[160px] px-8 py-4 text-white font-black rounded-2xl shadow-md hover:shadow-lg transition-all uppercase text-[10px] tracking-[0.2em] cursor-pointer ${
                                            role === 'admin' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/10' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10'
                                        }`}
                                    >
                                        Update Profile
                                    </motion.button>
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 min-w-[160px] px-8 py-4 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 font-black rounded-2xl transition-all uppercase text-[10px] tracking-[0.2em] cursor-pointer"
                                    >
                                        View Activities
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Update Modal --- */}
                <dialog id="profile_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-md">
                    <div className="modal-box bg-white dark:bg-[#1E293B] dark:text-white rounded-[2.2rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-2xl uppercase italic tracking-tighter">Edit Profile</h3>
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost cursor-pointer text-base">✕</button>
                            </form>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                    <FaUserCircle /> New Display Name
                                </label>
                                <input 
                                    name="name"
                                    type="text" 
                                    defaultValue={user?.displayName}
                                    placeholder="Enter your name" 
                                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                    <FaCamera /> New Photo URL
                                </label>
                                <input 
                                    name="photo"
                                    type="url" 
                                    defaultValue={user?.photoURL}
                                    placeholder="https://example.com/photo.jpg" 
                                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350"
                                    required
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-50 cursor-pointer mt-2"
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