import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PropertyDetailsCart from './PropertyDetailsCart';

const PropertyDetails = () => {
  const detailsData = useLoaderData();

  return (
    <div className="px-4">
      <PropertyDetailsCart detailsData={detailsData} />
    </div>
  );
};

export default PropertyDetails;
