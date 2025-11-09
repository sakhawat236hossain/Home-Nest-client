import React from 'react';
import BannerSlider from '../Components/BannerSlider';
import WhyChooseUs from '../Components/WhyChooseUs';
import ExtraSections from '../Components/ExtraSections';

const Home = () => {
    return (
        <div>
        <BannerSlider></BannerSlider>
        <WhyChooseUs></WhyChooseUs>
        <ExtraSections></ExtraSections>
        </div>
    );
};

export default Home;