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
        <h2 className="text-3xl font-bold text-center mb-14">
          How <span className="text-blue-600">It Works</span>
        </h2>

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
              className="rounded-2xl shadow-2xl w-full lg:max-w-[480px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Steps */}
          <motion.div
            className="flex gap-6 overflow-x-auto py-2 w-full lg:w-1/2 cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                className="min-w-[260px] sm:min-w-[280px] lg:min-w-[300px] p-6 rounded-xl shadow-md border hover:shadow-2xl transition flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 flex items-center justify-center text-2xl mb-3 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold ">{item.title}</h3>
                <p className="text-sm  mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="my-24">
        <h2 className="text-3xl font-bold text-center mb-14">
          What Our <span className="text-blue-600">Clients Say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-xl shadow-md border hover:shadow-2xl transition flex flex-col items-center text-center"
            >
              <img
                src={client.avatar}
                alt={client.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="italic">“{client.review}”</p>
              <div className="mt-4 text-yellow-500 text-lg">
                {"⭐".repeat(client.stars)}
              </div>
              <h4 className="mt-2 font-semibold ">
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
