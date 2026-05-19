import { motion } from "framer-motion";
import houseImg from "../assets/houseImg.jpg";

const ExtraSections = () => {
  const steps = [
    {
      title: "Browse Properties",
      desc: "Explore thousands of verified homes from trusted sellers.",
      icon: "🏘️",
    },
    {
      title: "Choose Your Favorite",
      desc: "Shortlist the homes you love, compare and decide easily.",
      icon: "✅",
    },
    {
      title: "Schedule a Visit",
      desc: "Fix a meeting with the owner or agent anytime.",
      icon: "📅",
    },
    {
      title: "Securely Purchase",
      desc: "Complete payments with full data protection.",
      icon: "💳",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      review: "Found my perfect home easily! Service was excellent 💙",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "John Smith",
      review: "Very smooth process & trustworthy property deals!",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Ayesha Khan",
      review: "Customer support was super friendly & helpful!",
      stars: 4,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      {/* How It Works Section */}
      <section className="my-20">
        <div className="text-center mb-16 space-y-4">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.4em]">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">It Works</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Image */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={houseImg}
              alt="How It Works"
              className="rounded-[2.5rem] shadow-2xl w-full lg:max-w-[480px] object-cover hover:scale-102 transition-transform duration-500 border border-slate-200/50 dark:border-slate-800/40"
            />
          </motion.div>

          {/* Steps */}
          <motion.div
            className="flex gap-6 overflow-x-auto py-4 w-full lg:w-1/2 cursor-grab active:cursor-grabbing scrollbar-hide"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                className="min-w-[270px] sm:min-w-[280px] lg:min-w-[300px] p-8 bg-white dark:bg-[#1E293B] rounded-[2rem] border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex-shrink-0 group flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <div className="w-12 h-12 flex items-center justify-center text-2xl mb-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/20 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="my-24">
        <div className="text-center mb-16 space-y-4">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.4em]">Client Feed</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Clients Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-white dark:bg-[#1E293B] rounded-[2.2rem] border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="relative mb-5">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100 dark:border-slate-700 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="italic text-slate-600 dark:text-slate-350 text-sm leading-relaxed mb-4">“{client.review}”</p>
              <div className="text-amber-400 text-xs mb-3 select-none">
                {"⭐".repeat(client.stars)}
              </div>
              <h4 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-wider leading-none mt-2">
                {client.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
