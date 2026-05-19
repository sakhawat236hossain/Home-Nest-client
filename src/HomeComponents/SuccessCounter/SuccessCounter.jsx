import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaHome, FaUsers, FaAward, FaKey } from 'react-icons/fa';

const SuccessCounter = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const stats = [
        {
            id: 1,
            count: 550,
            suffix: "+",
            label: "Property Sold",
            icon: <FaKey className="text-3xl text-indigo-600 dark:text-indigo-400" />,
            description: "সফলভাবে হস্তান্তর করা হয়েছে",
            glowColor: "group-hover:shadow-indigo-500/10"
        },
        {
            id: 2,
            count: 12,
            suffix: "k+",
            label: "Happy Customers",
            icon: <FaUsers className="text-3xl text-emerald-600 dark:text-emerald-400" />,
            description: "আমাদের ওপর আস্থা রেখেছেন",
            glowColor: "group-hover:shadow-emerald-500/10"
        },
        {
            id: 3,
            count: 1500,
            suffix: "+",
            label: "Total Properties",
            icon: <FaHome className="text-3xl text-orange-600 dark:text-orange-400" />,
            description: "বর্তমানে লিস্টেড আছে",
            glowColor: "group-hover:shadow-orange-500/10"
        },
        {
            id: 4,
            count: 25,
            suffix: "+",
            label: "Awards Won",
            icon: <FaAward className="text-3xl text-blue-600 dark:text-blue-400" />,
            description: "সেরা সেবার স্বীকৃতি",
            glowColor: "group-hover:shadow-blue-500/10"
        }
    ];

    return (
        <section ref={ref} className="py-12 md:py-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {stats.map((stat) => (
                        <div 
                            key={stat.id} 
                            className={`group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[2.2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center ${stat.glowColor}`}
                        >
                            {/* Icon with Premium Circle Badge */}
                            <div className="mb-6 inline-flex p-5 rounded-[1.8rem] bg-slate-50 dark:bg-slate-800/50 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-700/50 transition-all duration-500 shadow-sm border border-slate-100 dark:border-slate-700/20">
                                {stat.icon}
                            </div>

                            {/* Counter Number */}
                            <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                                {inView ? (
                                    <CountUp end={stat.count} duration={2.5} delay={0.1} />
                                ) : (
                                    "0"
                                )}
                                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{stat.suffix}</span>
                            </div>

                            {/* Label */}
                            <h3 className="mt-4 text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.2em]">
                                {stat.label}
                            </h3>
                            
                            {/* Description */}
                            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-16 md:mt-24 max-w-5xl mx-auto border-b border-slate-100 dark:border-slate-800/80"></div>
        </section>
    );
};

export default SuccessCounter;