import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

import Swal from "sweetalert2";
const AddProperty = () => {
  const { user } = useContext(AuthContext);


const handleAddProperty = (e) => {
  e.preventDefault();
  const form = e.target;

  const newProperty = {
    propertyName: form.propertyName.value,
    description: form.description.value,
    category: form.category.value,
    price: Number(form.price.value),
    location: form.location.value,
    imageLink: form.imageLink.value,
    userEmail: user?.email,
    userName: user?.displayName,
    createdAt: new Date(),
  };

 fetch("http://localhost:8000/addproperty", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newProperty),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "✅ Property Added Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    form.reset(); // ✅ form clear perfectly
  })
  .catch((err) => {
    console.log(err);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "❌ Failed to Add Property!",
    });
  });

};

  return (
    <div className="max-w-sm mx-auto my-6 p-4 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">
        Add New Property
      </h2>

      <form onSubmit={handleAddProperty} className="space-y-2">

        <div>
          <label className="text-sm font-medium text-blue-700">Property Name</label>
          <input
            type="text"
            name="propertyName"
            required
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-700">Category</label>
          <select
            name="category"
            required
            defaultValue=""
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Select</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-blue-700">Description</label>
          <textarea
            name="description"
            rows="2"
            required
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <div>
          <label className="text-sm font-medium text-blue-700">Price</label>
          <input
            type="number"
            name="price"
            required
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-700">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-700">Image Link</label>
          <input
            type="url"
            name="imageLink"
            required
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-700">Your Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-2 py-1 border border-gray-200 bg-gray-100 rounded-md text-sm cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-700">Your Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full px-2 py-1 border border-gray-200 bg-gray-100 rounded-md text-sm cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full py-1.5 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default AddProperty;
