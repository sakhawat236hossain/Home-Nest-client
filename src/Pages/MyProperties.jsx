import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

import MyPropertiesCard from "../Components/MyPropertiesCard.";
import LoadingData from "../Components/LoadingData";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://home-nest-server-rho.vercel.app/myProperties?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <LoadingData></LoadingData>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <title>My Properties page</title>
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        My Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have not added any properties yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {properties.map((property) => (
            <MyPropertiesCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
