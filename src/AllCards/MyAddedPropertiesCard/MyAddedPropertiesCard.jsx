import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAddedPropertiesCard = ({ property, onDelete, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!property) return null;

  const { _id, propertyName, location, price, image,  category, description } = property;

 
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      propertyName: form.propertyName.value,
      location: form.location.value,
      price: form.price.value,
      category: form.category.value,
      description: form.description.value,
    };

    try {
      const res = await axiosSecure.patch(`/updateProperty/${_id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Property updated successfully", "success");
        setIsModalOpen(false); // মডাল বন্ধ করা
        refetch(); 
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group">
      {/* Image and Card UI... (Same as before) */}
      <div className="relative h-48 overflow-hidden">
        <img src={image} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold dark:text-white">{propertyName}</h3>
        <p className="text-gray-400 text-xs mb-4 flex items-center gap-1"><FaMapMarkerAlt/> {location}</p>
        
        <div className="flex justify-between items-center mb-5">
           <span className="text-blue-600 font-black text-xl">${price}</span>
           <span className="badge badge-outline text-[10px]">{category}</span>
        </div>

        <div className="flex gap-2">
          {/* Update Button (Modal trigger) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-700"
          >
            <FaEdit /> Update
          </button>
          
          <button onClick={() => onDelete(_id)} className="px-4 bg-red-50 text-red-500 py-2 rounded-xl hover:bg-red-500 hover:text-white">
            <FaTrashAlt />
          </button>
        </div>
      </div>

      {/* --- Update Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors">
              <FaTimes size={20} />
            </button>
            
            <h2 className="text-2xl font-black mb-6 dark:text-white">Update Property</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Property Name</label>
                <input name="propertyName" defaultValue={propertyName} className="w-full mt-1 p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">Price ($)</label>
                  <input name="price" type="number" defaultValue={price} className="w-full mt-1 p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">Category</label>
                  <input name="category" defaultValue={category} className="w-full mt-1 p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Location</label>
                <input name="location" defaultValue={location} className="w-full mt-1 p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Description</label>
                <textarea name="description" defaultValue={description} rows="3" className="w-full mt-1 p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedPropertiesCard;