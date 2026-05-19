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
        <section className="py-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Premium Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.4em]">Our Professionals</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">
                        Meet Our Expert Agents
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-tight">
                       Our experienced team will provide you with professional assistance in finding the right property.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {agents.map((agent, index) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-[#1E293B] rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800/80 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between"
                        >
                            {/* Image Section */}
                            <div className="relative h-72 p-3 overflow-hidden rounded-[2rem]">
                                <img 
                                    src={agent.image} 
                                    alt={agent.name} 
                                    className="w-full h-full object-cover rounded-[1.8rem] transition-transform duration-700 group-hover:scale-105 filter brightness-[0.95]"
                                />
                                {/* Rating Badge */}
                                <div className="absolute top-6 left-6 bg-white/95 dark:bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-slate-100 dark:border-slate-800/20">
                                    <FaStar className="text-yellow-400 text-xs" />
                                    <span className="text-[10px] font-black dark:text-white tracking-widest leading-none">{agent.rating}</span>
                                </div>
                                {/* Social Floating */}
                                <div className="absolute bottom-6 right-6 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                    <SocialLink icon={<FaFacebookF />} />
                                    <SocialLink icon={<FaLinkedinIn />} />
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="px-6 pb-6 pt-2">
                                <h3 className="text-base font-black text-slate-800 dark:text-white tracking-tight uppercase">
                                    {agent.name}
                                </h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-extrabold text-[10px] uppercase tracking-[0.2em] mt-1.5">
                                    {agent.role}
                                </p>

                                <div className="mt-6 space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 group/item">
                                        <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover/item:bg-indigo-50 dark:group-hover/item:bg-indigo-900/30 transition-colors border border-slate-100 dark:border-slate-700/20">
                                            <FaEnvelope className="text-xs group-hover/item:text-indigo-600" />
                                        </div>
                                        <a href={`mailto:${agent.email}`} className="text-xs font-black uppercase tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate">
                                            {agent.email}
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 group/item">
                                        <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover/item:bg-green-50 dark:group-hover/item:bg-green-900/30 transition-colors border border-slate-100 dark:border-slate-700/20">
                                            <FaPhoneAlt className="text-xs group-hover/item:text-green-600" />
                                        </div>
                                        <a href={`tel:${agent.phone}`} className="text-xs font-black uppercase tracking-tight hover:text-green-600 dark:hover:text-green-400 transition-colors">
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
    <button className="w-9 h-9 bg-white/95 dark:bg-slate-900/90 text-slate-700 dark:text-white rounded-xl flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all shadow-md border border-slate-100 dark:border-slate-800/40 cursor-pointer">
        {icon}
    </button>
);

export default MeetOurAgents;