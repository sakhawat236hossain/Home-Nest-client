import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaPhoneAlt, FaEnvelope, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const MeetOurAgents = () => {
    const agents = [
        {
            id: 1,
            name: "Sabbir Ahmed",
            role: "Senior Consultant",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", 
            email: "sabbir@homenest.com",
            phone: "+880 1712 345678",
            rating: 4.9
        },
        {
            id: 2,
            name: "Nusrat Jahan",
            role: "Residential Expert",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
            email: "nusrat@homenest.com",
            phone: "+880 1812 987654",
            rating: 5.0
        },
        {
            id: 3,
            name: "Tanvir Hossain",
            role: "Commercial Agent",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
            email: "tanvir@homenest.com",
            phone: "+880 1911 112233",
            rating: 4.8
        },
        {
            id: 4,
            name: "Mehedi Hasan",
            role: "Investment Specialist",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
            email: "mehedi@homenest.com",
            phone: "+880 1610 445566",
            rating: 4.7
        }
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#0B0D10] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-indigo-600 font-bold text-xs uppercase tracking-[0.4em]"
                    >
                        Our Professionals
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4"
                    >
                        Meet Our Expert Agents
                    </motion.h2>
                    <p className=" mt-6 max-w-2xl mx-auto text-lg">
                       Our experienced team will provide you with professional assistance in finding the right property.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {agents.map((agent, index) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-[#16191E] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 group"
                        >
                            {/* Image Section */}
                            <div className="relative h-72 overflow-hidden">
                                <img 
                                    src={agent.image} 
                                    alt={agent.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Rating Badge */}
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <FaStar className="text-yellow-400 text-xs" />
                                    <span className="text-xs font-black dark:text-white">{agent.rating}</span>
                                </div>
                                {/* Social Floating */}
                                <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                    <SocialLink icon={<FaFacebookF />} />
                                    <SocialLink icon={<FaLinkedinIn />} />
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-6">
                                <h3 className="text-xl font-black text-gray-800 dark:text-white tracking-tight">
                                    {agent.name}
                                </h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mt-1">
                                    {agent.role}
                                </p>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group/item">
                                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover/item:bg-indigo-100 dark:group-hover/item:bg-indigo-900/30 transition-colors">
                                            <FaEnvelope className="text-sm group-hover/item:text-indigo-600" />
                                        </div>
                                        <a href={`mailto:${agent.email}`} className="text-xs font-bold hover:text-indigo-600 transition-colors truncate">
                                            {agent.email}
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group/item">
                                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover/item:bg-green-100 dark:group-hover/item:bg-green-900/30 transition-colors">
                                            <FaPhoneAlt className="text-sm group-hover/item:text-green-600" />
                                        </div>
                                        <a href={`tel:${agent.phone}`} className="text-xs font-bold hover:text-green-600 transition-colors">
                                            {agent.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SocialLink = ({ icon }) => (
    <button className="w-9 h-9 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-xl">
        {icon}
    </button>
);

export default MeetOurAgents;