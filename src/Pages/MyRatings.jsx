import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import RatingCart from "../Components/RatingCart";
import LoadingData from "../Components/LoadingData";

const MyRatings = () => {
  const ratingsData = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);



if(loading){
  return <LoadingData />;
}

  if (!ratingsData || ratingsData.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No Ratings Found 😔</p>;
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      <title>My Ratings</title>
      {ratingsData.map((rating) => (
        <RatingCart key={rating._id} rating={rating} />
      ))}
    </div>
  );
};

export default MyRatings;
