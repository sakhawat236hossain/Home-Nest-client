import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoadingSpinner from "../Components/LoadingSpinner";
import MyPropertiesCard from "../Components/MyPropertiesCard.";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:8000/myProperties?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
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
