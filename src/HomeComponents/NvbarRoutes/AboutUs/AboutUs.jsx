import React from 'react';
import { FaHome, FaCar, FaStore, FaLandmark, FaShieldAlt, FaHandshake, FaTags, FaUsers, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="min-h-screen transition-colors duration-300">
            {/* Hero Section with Animated Gradient */}
            <div className="relative py-24 bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-white/20">
                        The Multi-Property Marketplace
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                        Your Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">Property</span> Hub
                    </h1>
                    <p className="mt-6 text-indigo-100 font-bold max-w-2xl mx-auto italic text-lg md:text-xl leading-relaxed">
                        জমি, বাড়ি, গাড়ি কিংবা বাণিজ্যিক স্পেস—আপনার যা প্রয়োজন, সব পাবেন HomeNest-এ। 
                    </p>
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { icon: <FaHome />, label: "Homes & Villas", color: "bg-blue-500" },
                        { icon: <FaCar />, label: "Vehicles", color: "bg-purple-500" },
                        { icon: <FaLandmark />, label: "Lands & Plots", color: "bg-emerald-500" },
                        { icon: <FaStore />, label: "Shops & Offices", color: "bg-orange-500" }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center group hover:-translate-y-2 transition-all duration-300">
                            <div className={`p-4 rounded-2xl text-white text-2xl mb-4 shadow-lg ${item.color} group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <h4 className="font-black text-[10px] md:text-xs uppercase dark:text-gray-200 tracking-widest text-center">{item.label}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why HomeNest Section */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                        <div className="relative bg-white dark:bg-gray-800 p-10 md:p-16 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-2xl">
                            <h2 className="text-4xl font-black uppercase italic tracking-tight text-gray-800 dark:text-white leading-tight">
                                Everything in <br /> <span className="text-indigo-600">One Place</span>
                            </h2>
                            <p className="mt-8 text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic text-lg">
                                HomeNest-এ আমরা বিশ্বাস করি প্রপার্টি কেনা বা বেচা কোনো জটিল কাজ হওয়া উচিত নয়। জমি থেকে শুরু করে শখের গাড়ি, কিংবা নতুন ব্যবসার জন্য দোকান—সবকিছুকে একটি প্ল্যাটফর্মে নিয়ে আসাই আমাদের লক্ষ্য।
                            </p>
                            <Link to="/properties" className="mt-10 inline-flex items-center gap-3 px-10 py-4 bg-indigo-600 text-white font-black uppercase italic rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:gap-5 transition-all group">
                                Explore Listings <FaArrowRight className="text-sm" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:gap-8">
                        {[
                            { icon: <FaShieldAlt />, title: "100% Secure", desc: "Safe Transactions" },
                            { icon: <FaHandshake />, title: "Verified Sellers", desc: "Trusted Agents" },
                            { icon: <FaTags />, title: "Best Price", desc: "Fair Valuation" },
                            { icon: <FaUsers />, title: "Large Community", desc: "Active Users" }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 bg-slate-50 dark:bg-gray-800/40 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-center hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm">
                                <div className="text-3xl text-indigo-600 mb-4 flex justify-center">{item.icon}</div>
                                <h5 className="font-black text-xs uppercase dark:text-gray-200 mb-1">{item.title}</h5>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA / Summary Section */}
            <div className="py-24 bg-slate-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Link to="/properties" className="inline-block text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.4em] mb-6 italic hover:tracking-[0.6em] transition-all duration-500">
                        Experience HomeNest
                    </Link>
                    <h3 className="text-3xl md:text-4xl font-black italic dark:text-gray-200 leading-snug">
                        আপনার সম্পদ কেনাবেচার জন্য <br /> বাংলাদেশের আধুনিক ডিজিটাল মার্কেটপ্লেস।
                    </h3>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link to="/register" className="px-8 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-black uppercase italic rounded-xl hover:scale-105 transition-transform">
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;