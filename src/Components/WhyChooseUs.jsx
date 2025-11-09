import { motion } from "framer-motion";
import logo from "../assets/property.jpg";

const WhyChooseUs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose <span className="text-blue-600">Us?</span>
      </h2>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* ✅ Left Cards Section */}
        <motion.div
          className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-2xl transition">
            <h3 className="text-lg font-bold text-blue-600 mb-2">
              Verified Homes
            </h3>
            <p className="text-sm text-gray-600">
              Every property listed is carefully verified for full reliability.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-2xl transition">
            <h3 className="text-lg font-bold text-blue-600 mb-2">
              Affordable Pricing
            </h3>
            <p className="text-sm text-gray-600">
              Get the best homes at prices that match your budget perfectly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-2xl transition">
            <h3 className="text-lg font-bold text-blue-600 mb-2">
              Secure Payment
            </h3>
            <p className="text-sm text-gray-600">
              Payment is protected with top-level encrypted security systems.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-2xl transition">
            <h3 className="text-lg font-bold text-blue-600 mb-2">
              24/7 Support
            </h3>
            <p className="text-sm text-gray-600">
              Our team is always ready to help you — any time, any day.
            </p>
          </div>
        </motion.div>

        {/* ✅ Right Image Section */}
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
            className="rounded-2xl shadow-xl w-full lg:max-w-[480px] object-cover"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
