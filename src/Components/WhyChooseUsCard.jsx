import { motion } from "framer-motion";

// import { motion } from "framer-motion";


const icons = {
  "shield-check": (
    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2l6 3v5c0 5-3.5 9-6 9S4 15 4 10V5l6-3z"></path>
    </svg>
  ),
  "wallet": (
    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 7H2v13h20V7zm-2 6H4v-2h16v2z"></path>
    </svg>
  ),
  "lock": (
    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a4 4 0 00-4 4v4H4v8h12v-8h-2V6a4 4 0 00-4-4z"></path>
    </svg>
  ),
  "headphones": (
    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 10a6 6 0 1112 0v6h-3v-4H7v4H4v-6z"></path>
    </svg>
  ),
  "filter": (
    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 18h4v-2h-4v2zm-7-6v2h18v-2H3zm3-6v2h12V6H6z"></path>
    </svg>
  ),
  "bolt": (
    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M11 1L3 11h6l-1 8 8-10h-6l1-8z"></path>
    </svg>
  ),
  "star": (
    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2l2.39 5.26L18 8.27l-4 3.91L15.17 18 10 15l-5.17 3 1.17-5.82-4-3.91 5.61-.99L10 2z"></path>
    </svg>
  ),
  "user-check": (
    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15 14c2.67 0 8 1.33 8 4v2H7v-2c0-2.67 5.33-4 8-4zM15 12a4 4 0 100-8 4 4 0 000 8z"></path>
    </svg>
  )
};

const WhyChooseUsCard = ({ item }) => {
  return (
    <motion.div
      className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-200"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >

      <div className="mb-4 w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-blue-400 text-white rounded-full shadow-md">
        {icons[item.icon]}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
    </motion.div>
  );
};

export default WhyChooseUsCard;



