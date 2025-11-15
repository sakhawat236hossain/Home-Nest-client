import React from "react";
import toast from "react-hot-toast/headless";
import { FaDollarSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyPropertiesCard = ({ property }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://home-nest-server-rho.vercel.app/deleteProperty/${property._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            navigate("/properties");
            console.log(data);
            Swal.fire({
              title: "Deleted!",
              text: "Your property has been removed.",
              icon: "success",
            });
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    });
  };

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
            <span className="font-semibold text-indigo-800">Category:</span>{" "}
            {property.category}
          </p>

          <p className="text-sm text-gray-700 flex items-center gap-1">
            <span className="font-semibold text-indigo-800">Price:</span>
            {property.price}
            <FaDollarSign className="text-indigo-800" />
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold text-indigo-800">Location:</span>{" "}
            {property.location}
          </p>

          <p className="text-xs text-gray-500 pt-1 italic">
            Posted: {property.createdAt}
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex gap-2">
          <Link
            to={`/update-property/${property._id}`}
            className="flex-1 py-1.5 text-center text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition font-medium shadow-sm"
          >
            Update
          </Link>

          <button
            onClick={handleDelete}
            className="flex-1 py-1.5 text-sm text-center bg-red-500 text-white rounded-md hover:bg-red-600 transition font-medium shadow-sm"
          >
            Delete
          </button>

          <Link
            to={`/propertyDetails/${property._id}`}
            className="flex-1 py-1.5 text-sm bg-gray-900 text-center text-white rounded-md hover:bg-black transition font-medium shadow-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPropertiesCard;
