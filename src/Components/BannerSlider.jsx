import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import flat from "../assets/flat.jpg";
import apartment from "../assets/car.jpg";
import house from "../assets/house.jpg";

const images = [flat, apartment, house];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
            {images.map((src, i) => (
              <div key={i} className="w-full shrink-0 relative">
                <img
                  src={src}
                  alt="Property"
                  className="w-full h-[40vh] md:h-[55vh] lg:h-[65vh] object-cover brightness-75"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1 md:p-2 rounded-full transition"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1 md:p-2 rounded-full transition"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>

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
