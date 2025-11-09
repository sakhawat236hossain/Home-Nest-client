import React from "react";
import { useLoaderData } from "react-router-dom";
import PropertiesCard from "../Components/PropertiesCard";

const AllProperties = () => {
  const propertiesData = useLoaderData();
  console.log(propertiesData);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-5">
  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
    All Properties
  </span>
</h1>

<p className="text-center max-w-2xl mx-auto mb-10 text-gray-700 dark:text-gray-300">
  <span className="text-blue-600 dark:text-blue-400 font-semibold">
    Discover
  </span>{" "}
  a variety of properties for{" "}
  <span className="text-green-600 dark:text-green-400 font-semibold">
    rent, sale, and investment
  </span>. Find your perfect place today! 
</p>

      {/* Properties Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        {propertiesData?.map((property) => (
          <PropertiesCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
