import React from 'react';
import { motion } from 'framer-motion';
import { FaCity, FaHome, FaBuilding, FaHotel } from 'react-icons/fa';

const FeaturedCategories = () => {
    // ক্যাটাগরি ডেটা (আপনি চাইলে আপনার ডেটাবেসের এলাকাগুলো এখানে দিতে পারেন)
    const categories = [
        { id: 1, name: "Dhaka", count: "450+ Properties", icon: <FaCity />, img: "https://images.unsplash.com/photo-1583323767721-e36b27d8ce64?q=80&w=1470&auto=format&fit=crop" },
        { id: 2, name: "Apartments", count: "1200+ Listings", icon: <FaHome />, img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1470&auto=format&fit=crop" },
        { id: 3, name: "Chattogram", count: "320+ Properties", icon: <FaBuilding />, img: "https://images.unsplash.com/photo-1623916428399-63300892c57f?q=80&w=1471&auto=format&fit=crop" },
        { id: 4, name: "Commercial", count: "85+ Properties", icon: <FaHotel />, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop" },
    ];

    return (
        <div className="py-20 max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white">Explore by Categories</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Find your perfect place in your favorite city or property type.</p>
                </div>
                <button className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                    View All Categories
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <motion.div
                        key={cat.id}
                        whileHover={{ y: -10 }}
                        className="group relative h-72 rounded-[2rem] overflow-hidden cursor-pointer shadow-lg"
                    >
                        {/* Background Image */}
                        <img 
                            src={cat.img} 
                            alt={cat.name} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute bottom-6 left-6 text-white">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl mb-3 border border-white/30">
                                {cat.icon}
                            </div>
                            <h3 className="text-xl font-bold">{cat.name}</h3>
                            <p className="text-sm opacity-80">{cat.count}</p>
                        </div>

                        {/* Hidden Badge on Hover */}
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-indigo-600 text-[10px] px-3 py-1 rounded-full font-black text-white uppercase tracking-widest">
                                Explore
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCategories;