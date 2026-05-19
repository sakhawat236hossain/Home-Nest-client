import React, { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { uploadImageToCloudinary } from "../../../hooks/Utils";
import { motion } from "framer-motion";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("House");

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
    <div className="max-w-3xl mx-auto my-6 p-8 sm:p-10 bg-white dark:bg-[#1E293B] shadow-sm hover:shadow-2xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 transition-all duration-500">
      <h2 className="text-3xl font-black text-center mb-10 text-slate-800 dark:text-white uppercase tracking-tight">
        Post Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Listing</span>
      </h2>

      <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Item / Property Name</label>
          <input 
            type="text" 
            name="propertyName" 
            required 
            placeholder="e.g. Toyota Corolla or Luxury Villa"
            className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Category</label>
          <select 
            name="category" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350 cursor-pointer"
          >
            <option value="House">House / Flat</option>
            <option value="Land">Land / Plot</option>
            <option value="Car">Car / Vehicle</option>
            <option value="Shop">Shop / Commercial</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Price ($)</label>
          <input 
            type="number" 
            name="price" 
            required 
            placeholder="Amount in USD"
            className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
          />
        </div>

        {/* Dynamic Fields */}
        {selectedCategory === "House" || selectedCategory === "Shop" ? (
          <div className="grid grid-cols-3 gap-3 md:col-span-2">
            <div>
              <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2 ml-1">BEDS</label>
              <input 
                type="number" 
                name="beds" 
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2 ml-1">BATHS</label>
              <input 
                type="number" 
                name="baths" 
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2 ml-1">SQFT AREA</label>
              <input 
                type="number" 
                name="area" 
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
              />
            </div>
          </div>
        ) : selectedCategory === "Land" ? (
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Land Area (Katha/Decimal)</label>
            <input 
              type="number" 
              name="area" 
              placeholder="Size of the land" 
              required
              className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
            />
          </div>
        ) : selectedCategory === "Car" ? (
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Vehicle Model / Year</label>
            <input 
              type="text" 
              name="carModel" 
              placeholder="e.g. 2022 Hybrid" 
              required
              className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
            />
          </div>
        ) : null}

        {/* Location */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Location</label>
          <input 
            type="text" 
            name="location" 
            required 
            placeholder="Property Address"
            className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
          />
        </div>

        {/* Contact */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Contact Number</label>
          <input 
            type="text" 
            name="contactNumber" 
            required 
            placeholder="Phone Number"
            className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" 
          />
        </div>

        {/* Photo Upload */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Photo Listing</label>
          <input 
            type="file" 
            name="image" 
            required 
            className="w-full text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-50 dark:file:bg-indigo-950/40 file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 bg-slate-50 dark:bg-slate-900 cursor-pointer dark:text-slate-400 font-bold" 
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Description</label>
          <textarea 
            name="description" 
            rows="4" 
            required 
            placeholder="Provide comprehensive details about what you are selling..."
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className={`md:col-span-2 w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all duration-300 shadow-md ${
            uploading 
              ? "bg-slate-400 dark:bg-slate-700 cursor-not-allowed" 
              : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-indigo-500/10 hover:shadow-lg hover:-translate-y-0.5 active:scale-98 cursor-pointer"
          }`}
        >
          {uploading ? "Publishing Listing..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;