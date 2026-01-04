import React from 'react';
import { 
    FaHome, FaSearchLocation, FaGavel, FaHandHoldingUsd, 
    FaFileContract, FaUserTie, FaCheckCircle, FaArrowRight 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            id: 1,
            icon: <FaSearchLocation />,
            title: "Property Search",
            description: "আপনার বাজেটের মধ্যে স্বপ্নের বাড়ি, জমি বা গাড়ি খুঁজে পেতে আমাদের অ্যাডভান্সড সার্চ ইঞ্জিন ব্যবহার করুন।",
            color: "bg-blue-600",
            lightColor: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            id: 2,
            icon: <FaHome />,
            title: "Buy & Sell",
            description: "সহজ এবং নিরাপদ উপায়ে প্রপার্টি কেনা বা বিক্রির জন্য আমাদের লিস্টিং সুবিধা উপভোগ করুন।",
            color: "bg-indigo-600",
            lightColor: "bg-indigo-50 dark:bg-indigo-900/20"
        },
        {
            id: 3,
            icon: <FaGavel />,
            title: "Legal Assistance",
            description: "প্রপার্টির কাগজপত্র যাচাই এবং আইনি জটিলতা এড়াতে আমাদের বিশেষজ্ঞ উকিলদের সহায়তা নিন।",
            color: "bg-purple-600",
            lightColor: "bg-purple-50 dark:bg-purple-900/20"
        },
        {
            id: 4,
            icon: <FaHandHoldingUsd />,
            title: "Home Loan Support",
            description: "দ্রুত এবং সহজ শর্তে ব্যাংক লোন পাওয়ার জন্য আমরা আপনাকে সঠিক ব্যাংকের সাথে সংযুক্ত করে দিই।",
            color: "bg-emerald-600",
            lightColor: "bg-emerald-50 dark:bg-emerald-900/20"
        },
        {
            id: 5,
            icon: <FaFileContract />,
            title: "Documentation",
            description: "জমির নামজারি থেকে শুরু করে যেকোনো চুক্তিপত্র তৈরির ঝামেলামুক্ত সমাধান আমরা প্রদান করি।",
            color: "bg-rose-600",
            lightColor: "bg-rose-50 dark:bg-rose-900/20"
        },
        {
            id: 6,
            icon: <FaUserTie />,
            title: "Expert Consulting",
            description: "কোথায় ইনভেস্ট করলে আপনার লাভ বেশি হবে, তা জানতে আমাদের রিয়েল এস্টেট বিশেষজ্ঞদের সাথে কথা বলুন।",
            color: "bg-amber-600",
            lightColor: "bg-amber-50 dark:bg-amber-900/20"
        }
    ];

    return (
        <div className="min-h-screen  transition-colors duration-300">
            {/* Header Section */}
            <div className="py-24 bg-slate-50 dark:bg-gray-900/50 border-b dark:border-gray-800 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-600 rounded-full blur-3xl"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs italic bg-indigo-50 dark:bg-indigo-900/20 px-4 py-1 rounded-full border border-indigo-100 dark:border-indigo-800">
                        Our Specialized Services
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic mt-6 dark:text-white tracking-tighter">
                        We Provide <span className="text-indigo-600 underline decoration-4 underline-offset-8 decoration-indigo-200">Solutions</span>
                    </h1>
                    <p className="mt-6 text-gray-500 dark:text-gray-400 font-bold max-w-2xl mx-auto italic text-lg leading-relaxed">
                        প্রপার্টি কেনা-বেচা থেকে শুরু করে আইনি পরামর্শ পর্যন্ত সবকিছু এক জায়গায়। আমরা নিশ্চিত করি আপনার প্রতিটি লেনদেনের নিরাপত্তা।
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service) => (
                        <div key={service.id} className="group p-10 bg-white dark:bg-gray-800 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:shadow-indigo-100 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-3">
                            <div className={`w-16 h-16 ${service.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-black uppercase italic dark:text-white mb-4 group-hover:text-indigo-600 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-bold text-sm leading-relaxed italic mb-8">
                                {service.description}
                            </p>
                            
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-xs font-black uppercase italic text-gray-400">
                                    <FaCheckCircle className="text-indigo-500" /> Professional Support
                                </li>
                                <li className="flex items-center gap-2 text-xs font-black uppercase italic text-gray-400">
                                    <FaCheckCircle className="text-indigo-500" /> Fast Execution
                                </li>
                            </ul>

                            <Link to="/contact-us" className="flex items-center gap-2 text-xs font-black uppercase italic text-indigo-600 group-hover:gap-4 transition-all">
                                Learn More <FaArrowRight />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-24 bg-indigo-600 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white leading-tight">
                            Why Trust <br /> <span className="text-indigo-200">PropertyHub?</span>
                        </h2>
                        <p className="mt-4 text-indigo-100 font-bold italic max-w-md">
                            আমরা শুধু লিস্টিং করি না, বরং প্রতিটি প্রপার্টি ম্যানুয়ালি ভেরিফাই করি আপনার নিরাপত্তার জন্য।
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                        <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center">
                            <h4 className="text-3xl font-black text-white italic">100%</h4>
                            <p className="text-[10px] font-black uppercase italic text-indigo-200 tracking-widest mt-2">Verified Ads</p>
                        </div>
                        <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center">
                            <h4 className="text-3xl font-black text-white italic">24/7</h4>
                            <p className="text-[10px] font-black uppercase italic text-indigo-200 tracking-widest mt-2">Legal Help</p>
                        </div>
                        <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center">
                            <h4 className="text-3xl font-black text-white italic">10k+</h4>
                            <p className="text-[10px] font-black uppercase italic text-indigo-200 tracking-widest mt-2">Users Served</p>
                        </div>
                        <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center">
                            <h4 className="text-3xl font-black text-white italic">0%</h4>
                            <p className="text-[10px] font-black uppercase italic text-indigo-200 tracking-widest mt-2">Hidden Costs</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-24 text-center">
                <h4 className="text-2xl font-black uppercase italic dark:text-white mb-8">Ready to get started?</h4>
                <Link to="/contact-us" className="inline-flex items-center gap-3 px-12 py-5 bg-indigo-600 text-white font-black uppercase italic rounded-2xl shadow-2xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:scale-110 transition-all">
                    Talk to an Expert <FaUserTie />
                </Link>
            </div>
        </div>
    );
};

export default Services;