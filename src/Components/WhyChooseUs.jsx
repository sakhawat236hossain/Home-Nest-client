import { useState, useEffect } from "react";
import WhyChooseUsCard from "./WhyChooseUsCard";

const WhyChooseUs = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/whyChooseUs.json")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose <span className="text-blue-600">Us?</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {items.map(item => (
          <WhyChooseUsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
