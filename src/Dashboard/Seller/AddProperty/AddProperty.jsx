import React, { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { uploadImageToCloudinary } from "../../../hooks/Utils";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("House"); // ডিফল্ট ক্যাটাগরি

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const form = e.target;

    const propertyName = form.propertyName.value;
    const category = form.category.value;
    const price = Number(form.price.value);
    const location = form.location.value;
    const description = form.description.value;
    const contactNumber = form.contactNumber.value;
    const imageFile = form.image.files[0];

    // ডাইনামিক ফিল্ডের ভ্যালু (যদি থাকে তবে নিবে, না থাকলে null)
    const beds = form.beds ? Number(form.beds.value) : null;
    const baths = form.baths ? Number(form.baths.value) : null;
    const area = form.area ? Number(form.area.value) : null;
    const carModel = form.carModel ? form.carModel.value : null;

    if (!imageFile) {
      return Swal.fire("Error", "Please select an image first!", "error");
    }

    try {
      setUploading(true);
      const photoURL = await uploadImageToCloudinary(imageFile);

      const newProperty = {
        propertyName,
        description,
        category,
        price,
        location,
        image: photoURL,
        // ক্যাটাগরি অনুযায়ী ডাটা পাঠানো
        specs: {
          beds,
          baths,
          area,
          carModel,
        },
        agentContact: contactNumber,
        agentEmail: user?.email,
        agentName: user?.displayName,
        agentImage: user?.photoURL,
        status: "pending",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/addProperty", newProperty);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Successfully Added!",
          text: "Admin will review your listing soon.",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white dark:bg-[#16191E] shadow-2xl rounded-3xl border border-gray-100 dark:border-gray-800">
      <h2 className="text-3xl font-black text-center mb-8 text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">
        Post Your Listing
      </h2>

      <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* সবার জন্য কমন ফিল্ড */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Item / Property Name</label>
          <input type="text" name="propertyName" required placeholder="e.g. Toyota Corolla or Luxury Villa"
            className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
          <select 
            name="category" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white"
          >
            <option value="House">House / Flat</option>
            <option value="Land">Land / Plot</option>
            <option value="Car">Car / Vehicle</option>
            <option value="Shop">Shop / Commercial</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Price</label>
          <input type="number" name="price" required placeholder="Amount"
            className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white" />
        </div>

        {/* ক্যাটাগরি অনুযায়ী ডাইনামিক ফিল্ডস */}
        {selectedCategory === "House" || selectedCategory === "Shop" ? (
          <div className="grid grid-cols-3 gap-3 md:col-span-2">
            <div>
              <label className="text-[10px] font-bold text-gray-400">BEDS</label>
              <input type="number" name="beds" className="w-full p-2 border rounded-lg dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400">BATHS</label>
              <input type="number" name="baths" className="w-full p-2 border rounded-lg dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400">SQFT / AREA</label>
              <input type="number" name="area" className="w-full p-2 border rounded-lg dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white" />
            </div>
          </div>
        ) : selectedCategory === "Land" ? (
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Land Area (Katha/Decimal)</label>
            <input type="number" name="area" placeholder="Size of the land" required
              className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white" />
          </div>
        ) : selectedCategory === "Car" ? (
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Vehicle Model / Year</label>
            <input type="text" name="carModel" placeholder="e.g. 2022 Hybrid" required
              className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white" />
          </div>
        ) : null}

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Location</label>
          <input type="text" name="location" required placeholder="Address"
            className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Contact Number</label>
          <input type="text" name="contactNumber" required placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Photo</label>
          <input type="file" name="image" required className="file-input file-input-bordered file-input-indigo w-full rounded-xl dark:bg-[#0B0D10] dark:border-gray-700" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
          <textarea name="description" rows="3" required placeholder="Details about what you are selling..."
            className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-[#0B0D10] dark:border-gray-700 dark:text-white"></textarea>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`md:col-span-2 w-full py-4 rounded-2xl text-lg font-black text-white transition-all transform hover:-translate-y-1 ${
            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none"
          }`}
        >
          {uploading ? "Uploading Data..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;