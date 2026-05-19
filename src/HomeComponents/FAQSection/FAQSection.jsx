import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaCircle } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";

const faqData = [
  {
    question: "How can I list my property as a Seller?",
    answer: "After logging in, go to the 'Add Property' section from your dashboard. Fill in the details, upload images, and submit. Your property will initially be in 'Pending' status until the Admin reviews and approves it for public viewing."
  },
  {
    question: "What does the 'Pending' status mean?",
    answer: "Every property added by a seller goes through a verification phase. 'Pending' means our Admin team is currently reviewing the property details and documents to ensure authenticity before it becomes visible to potential buyers."
  },
  {
    question: "How do I buy or express interest in a property?",
    answer: "Once you find a property you like, click 'View Details'. You can then send a request or contact the seller directly using the provided information. Sellers and Admins are available to assist you with all the necessary information regarding the property."
  },
  {
    question: "Can an Admin delete or modify a listed property?",
    answer: "Yes, to maintain the quality of our marketplace, Admins have the authority to edit or delete any listing if it contains misinformation, inappropriate content, or if the property is no longer available."
  },
  {
    question: "Can I change the status of my property after it's live?",
    answer: "Sellers can update property details, but certain status changes (like marking as Sold or changing verification status) may require Admin approval or specific actions within your seller dashboard to ensure the platform's integrity."
  },
  {
    question: "How can I get help if I encounter an issue?",
    answer: "Our support team, along with the Admin and the respective Sellers, are dedicated to providing a smooth experience. You can reach out through our contact form or directly message the support desk from your profile."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.4em]">Help & Support</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Guideline & FAQ</span>
          </motion.h2>
          <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about buying, selling, and property management on our platform.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group border border-slate-100 dark:border-slate-800/80 rounded-[2rem] overflow-hidden bg-white dark:bg-[#1E293B] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-7 text-left outline-none cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <HiQuestionMarkCircle className="text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" size={24} />
                  <span className="text-base font-black text-slate-800 dark:text-slate-100 leading-snug uppercase tracking-tight">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="text-slate-400 shrink-0 ml-4 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 transition-colors"
                >
                  <FaChevronDown size={14} />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-bold uppercase tracking-tight pl-16">
                      <div className="flex gap-3">
                         <FaCircle size={6} className="mt-1.5 text-indigo-500 dark:text-indigo-400 shrink-0 animate-pulse" />
                         <p className="normal-case font-medium text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;