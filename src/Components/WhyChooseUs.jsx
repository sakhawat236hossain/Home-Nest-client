import { motion } from "framer-motion";
import logo from "../assets/property.jpg";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Verified Homes",
      desc: "Every property listed is carefully verified for full reliability.",
      icon: "🛡️",
      glowColor: "group-hover:border-indigo-500/35"
    },
    {
      title: "Affordable Pricing",
      desc: "Get the best homes at prices that match your budget perfectly.",
      icon: "🏷️",
      glowColor: "group-hover:border-emerald-500/35"
    },
    {
      title: "Secure Payment",
      desc: "Payment is protected with top-level encrypted security systems.",
      icon: "💳",
      glowColor: "group-hover:border-blue-500/35"
    },
    {
      title: "24/7 Support",
      desc: "Our team is always ready to help you — any time, any day.",
      icon: "💬",
      glowColor: "group-hover:border-purple-500/35"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 md:px-6 lg:px-8">
      {/* Premium Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.4em]">Why PropertyHub</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Us?</span>
        </h2>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* ✅ Left Cards Grid */}
        <motion.div
          className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {features.map((item, idx) => (
            <div 
              key={idx}
              className={`p-8 bg-white dark:bg-[#1E293B] rounded-[2rem] border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between ${item.glowColor}`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-slate-700/20 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ✅ Right Image Panel */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={logo}
            alt="Property"
            className="rounded-[2.5rem] shadow-2xl w-full lg:max-w-[480px] object-cover hover:scale-102 transition-transform duration-500 border border-slate-200/50 dark:border-slate-850"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
