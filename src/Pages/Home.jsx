import React from "react";
import BannerSlider from "../Components/BannerSlider";
import WhyChooseUs from "../Components/WhyChooseUs";
import ExtraSections from "../Components/ExtraSections";

import { useLoaderData } from "react-router-dom";
import LatestCart from "../Components/LatestCart";

const Home = () => {
  const latestPropertyData = useLoaderData() || [];

  return (
    <div>
      <BannerSlider />

      {/* Latest Properties Section */}
      <div className="my-12 max-w-7xl mx-auto px-4">
        <title>Home Page</title>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Latest Properties
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {latestPropertyData.map((Property) => (
            <LatestCart key={Property._id} Property={Property} />
          ))}
        </div>
      </div>

      <WhyChooseUs />
      <ExtraSections />
    </div>
  );
};

export default Home;
