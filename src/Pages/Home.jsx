import React, { useEffect, useState } from "react";
import BannerSlider from "../HomeComponents/BannerSlider/BannerSlider";
import WhyChooseUs from "../Components/WhyChooseUs";
import ExtraSections from "../Components/ExtraSections";

import { useLoaderData } from "react-router-dom";
import LatestCart from "../Components/LatestCart";
import LoadingData from "../Components/LoadingData";
import Testimonials from "../HomeComponents/Testimonials/Testimonials";
import MeetOurAgents from "../HomeComponents/MeetOurAgents/MeetOurAgents";
import SuccessCounter from "../HomeComponents/SuccessCounter/SuccessCounter";
import FAQSection from "../HomeComponents/FAQSection/FAQSection";

const Home = () => {
  const latestPropertyData = useLoaderData() || [];
const [loading,setLoading]=useState(true)
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1500);

  return () => clearTimeout(timer);
}, []);

if (loading) {
  return <LoadingData />;
}
  return (
    <div>
      <BannerSlider />

      <SuccessCounter />

      <div className="my-12 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Latest Properties
        </h1>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {latestPropertyData.map((Property) => (
            <LatestCart key={Property._id} Property={Property} />
          ))}
        </div>
      </div>

      <WhyChooseUs />

      <MeetOurAgents />

      <Testimonials />

      <ExtraSections />

      <FAQSection />
    </div>
  );
};

export default Home;
