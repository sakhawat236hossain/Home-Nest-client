import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaHome, FaUsers, FaAward, FaKey } from 'react-icons/fa';

const SuccessCounter = () => {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    const stats = [
        {
            id: 1,
            count: 550,
            suffix: "+",
            label: "Property Sold",
            icon: <FaKey className="text-4xl text-indigo-500" />,
            description: "সফলভাবে হস্তান্তর করা হয়েছে"
        },
        {
            id: 2,
            count: 12,
            suffix: "k+",
            label: "Happy Customers",
            icon: <FaUsers className="text-4xl text-emerald-500" />,
            description: "আমাদের ওপর আস্থা রেখেছেন"
        },
        {
            id: 3,
            count: 1500,
            suffix: "+",
            label: "Total Properties",
            icon: <FaHome className="text-4xl text-orange-500" />,
            description: "বর্তমানে লিস্টেড আছে"
        },
        {
            id: 4,
            count: 25,
            suffix: "+",
            label: "Awards Won",
            icon: <FaAward className="text-4xl text-blue-500" />,
            description: "সেরা সেবার স্বীকৃতি"
        }
    ];

    return (
        <section ref={ref} className="py-20  transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center group">
                            {/* Icon with Animation */}
                            <div className="mb-6 inline-flex p-5 rounded-3xl bg-gray-50 dark:bg-[#16191E] group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-gray-800 transition-all duration-500 shadow-sm group-hover:shadow-xl">
                                {stat.icon}
                            </div>

                            {/* Counter Number */}
                            <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                                {inView ? (
                                    <CountUp end={stat.count} duration={3} delay={0.2} />
                                ) : (
                                    "0"
                                )}
                                <span className="text-indigo-600">{stat.suffix}</span>
                            </div>

                            {/* Label & Description */}
                            <h3 className="mt-3 text-lg font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">
                                {stat.label}
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            
            <div className="mt-20 max-w-5xl mx-auto border-b border-gray-100 dark:border-gray-800"></div>
        </section>
    );
};

export default SuccessCounter;