import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import flat from "../../assets/flat.jpg";
import apartment from "../../assets/car.jpg";
import house from "../../assets/house.jpg";

const images = [
  {
    src: flat,
    title: "Find Your Dream Home",
    subtitle: "Browse the best premium properties in your city",
  },
  {
    src: apartment,
    title: "Best Deals on Properties",
    subtitle: "Affordable luxury homes for your perfect life",
  },
  {
    src: house,
    title: "Trusted Real Estate Platform",
    subtitle: "We provide verified and premium luxury listings",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000); // slide change every 6 sec
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
    }, 80);

    const subtitleInterval = setTimeout(() => {
      const subInterval = setInterval(() => {
        setTypedSubtitle((prev) => prev + subtitle[subtitleIndex]);
        subtitleIndex++;
        if (subtitleIndex === subtitle.length) clearInterval(subInterval);
      }, 40);
    }, title.length * 80 + 200); // subtitle starts after title typed

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
      <div className="w-full flex justify-center mt-6 px-4 md:px-6">
        <div className="w-full max-w-7xl mx-auto relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/20 dark:border-slate-800/40">

          {/* Slides */}
          <div
            className="flex transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="w-full shrink-0 relative">
                <img
                  src={img.src}
                  alt="Property"
                  className="w-full h-[45vh] md:h-[60vh] lg:h-[70vh] object-cover filter brightness-[0.7] contrast-[1.05]"
                />
                
                {/* Visual Depth Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-900/10" />

                {/* Text Overlay + Explore More Button */}
                {i === current && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white px-6 w-full max-w-4xl">
                    <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter uppercase italic bg-gradient-to-b from-white to-slate-100 bg-clip-text text-transparent drop-shadow-lg"
                    >
                      {typedTitle}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mb-8 text-sm md:text-xl text-slate-200/90 font-medium tracking-wide drop-shadow"
                    >
                      {typedSubtitle}
                    </motion.p>

                    <div className="flex justify-center">
                      <motion.a
                        href="/properties"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 border border-indigo-500/20 transition-all"
                      >
                        Explore More <FaArrowRight className="text-xs" />
                      </motion.a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)", color: "#1e1b4b" }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 
            bg-white/10 dark:bg-black/20 text-white p-3.5 rounded-2xl backdrop-blur-xl border border-white/20 dark:border-white/10 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)", color: "#1e1b4b" }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 
            bg-white/10 dark:bg-black/20 text-white p-3.5 rounded-2xl backdrop-blur-xl border border-white/20 dark:border-white/10 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 bg-slate-900/30 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  current === i ? "bg-white w-7" : "bg-white/40 w-2.5 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-12"></div>
    </>
  );
};

export default Banner;
