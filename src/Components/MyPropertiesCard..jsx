import React from 'react';

const MyPropertiesCard = ({ property }) => {

  return (
    <div className="rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 duration-200 flex flex-col bg-gradient-to-br from-indigo-50 via-white to-indigo-100 border border-indigo-200">

      {/* Image */}
      <div className="h-44 overflow-hidden rounded-t-xl">
        <img
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
          src={property.imageLink}
          alt={property.propertyName}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-indigo-700">
            {property.propertyName}
          </h3>

          <p className="text-sm text-gray-700">
            <span className="font-semibold text-indigo-800">Category:</span> {property.category}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold text-indigo-800">Price:</span> {property.price} ৳
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold text-indigo-800">Location:</span> {property.location}
          </p>

          <p className="text-xs text-gray-500 pt-1 italic">
            Posted: {(property.createdAt)}
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex gap-2">
          <button className="flex-1 py-1.5 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition font-medium shadow-sm">
            Update
          </button>

          <button className="flex-1 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition font-medium shadow-sm">
            Delete
          </button>

          <button className="flex-1 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-black transition font-medium shadow-sm">
            Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyPropertiesCard;
