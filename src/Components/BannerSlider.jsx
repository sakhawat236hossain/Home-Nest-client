import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import flat from "../assets/flat.jpg";
import apartment from "../assets/car.jpg";
import house from "../assets/house.jpg";

const images = [
  {
    src: flat,
    title: "Find Your Dream Home",
    subtitle: "Browse the best properties in your city",
  },
  {
    src: apartment,
    title: "Best Deals on Properties",
    subtitle: "Affordable homes for your perfect life",
  },
  {
    src: house,
    title: "Trusted Real Estate Platform",
    subtitle: "We provide verified and reliable listings",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // slide change every 5 sec
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for current slide
  useEffect(() => {
    const title = images[current].title;
    const subtitle = images[current].subtitle;

    setTypedTitle("");
    setTypedSubtitle("");

    let titleIndex = 0;
    let subtitleIndex = 0;

    const titleInterval = setInterval(() => {
      setTypedTitle((prev) => prev + title[titleIndex]);
      titleIndex++;
      if (titleIndex === title.length) clearInterval(titleInterval);
    }, 100);

    const subtitleInterval = setTimeout(() => {
      const subInterval = setInterval(() => {
        setTypedSubtitle((prev) => prev + subtitle[subtitleIndex]);
        subtitleIndex++;
        if (subtitleIndex === subtitle.length) clearInterval(subInterval);
      }, 50);
    }, title.length * 100 + 300); // subtitle starts after title typed

    return () => {
      clearInterval(titleInterval);
      clearTimeout(subtitleInterval);
    };
  }, [current]);

  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  return (
    <>
      <div className="w-full flex justify-center mt-4 px-2 md:px-0">
        <div className="w-full max-w-7xl mx-auto relative rounded-lg md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">

          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="w-full shrink-0 relative">
                <img
                  src={img.src}
                  alt="Property"
                  className="w-full h-[40vh] md:h-[55vh] lg:h-[65vh] object-cover brightness-75"
                />

                {/* Text Overlay + Explore More Button */}
                {i === current && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                      {typedTitle}
                    </h2>
                    <p className="mb-4 text-sm md:text-lg">{typedSubtitle}</p>

                    <motion.a
                      href="/properties"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 15px rgba(255,255,255,0.6)",
                        backgroundColor: "rgba(255,255,255,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 md:px-6 md:py-2 bg-white/30 text-white backdrop-blur-md 
                        rounded-full text-sm md:text-base font-semibold flex items-center justify-center gap-2 border border-white/40"
                    >
                      Explore More <FaArrowRight />
                    </motion.a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            whileHover={{
              scale: 1.2,
              backgroundColor: "rgba(255,255,255,0.5)",
              boxShadow: "0 0 10px rgba(255,255,255,0.7)",
            }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 
            bg-white/30 text-white p-1 md:p-2 rounded-full transition"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            whileHover={{
              scale: 1.2,
              backgroundColor: "rgba(255,255,255,0.5)",
              boxShadow: "0 0 10px rgba(255,255,255,0.7)",
            }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 
            bg-white/30 text-white p-1 md:p-2 rounded-full transition"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${
                  current === i ? "bg-white w-4 md:w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16 md:mb-24"></div>
    </>
  );
};

export default Banner;
