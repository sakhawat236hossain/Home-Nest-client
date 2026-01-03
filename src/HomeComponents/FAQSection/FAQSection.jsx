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
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            Property <span className="text-blue-600">Guideline & FAQ</span>
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-2xl mx-auto">
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
              transition={{ delay: index * 0.1 }}
              className="group border border-gray-100 dark:border-gray-800 rounded-[24px] overflow-hidden bg-white dark:bg-[#1a1d24] shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-7 text-left outline-none"
              >
                <div className="flex items-start gap-4">
                  <HiQuestionMarkCircle className="text-blue-600 mt-1 shrink-0" size={26} />
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-snug">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="text-gray-400 shrink-0 ml-4"
                >
                  <FaChevronDown size={20} />
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
                    <div className="px-8 pb-8 text-[17px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium pl-16">
                      <div className="flex gap-3">
                         <FaCircle size={8} className="mt-2.5 text-blue-500 shrink-0" />
                         <p>{item.answer}</p>
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