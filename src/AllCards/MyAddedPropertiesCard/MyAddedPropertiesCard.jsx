import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAddedPropertiesCard = ({ property, onDelete, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!property) return null;

  const { _id, propertyName, location, price, image, category, description } = property;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      propertyName: form.propertyName.value,
      location: form.location.value,
      price: Number(form.price.value),
      category: form.category.value,
      description: form.description.value,
    };

    try {
      const res = await axiosSecure.patch(`/updateProperty/${_id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Property updated successfully", "success");
        setIsModalOpen(false); 
        refetch(); 
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-[2.2rem] overflow-hidden border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-2xl transition-all duration-300 group p-3 flex flex-col justify-between">
      
      <div>
        {/* Image wrapper */}
        <div className="relative h-48 overflow-hidden rounded-[1.8rem] shrink-0">
          <img src={image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
        </div>

        {/* Text Body */}
        <div className="p-4">
          <h3 className="text-base font-black text-slate-800 dark:text-white truncate uppercase tracking-tight">{propertyName}</h3>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] mb-4 flex items-center gap-1 font-bold uppercase tracking-wider mt-1.5"><FaMapMarkerAlt className="text-rose-500 shrink-0" size={11} /> {location}</p>
          
          <div className="flex justify-between items-center mb-2">
             <span className="text-indigo-650 dark:text-indigo-400 font-black text-lg">${price?.toLocaleString()}</span>
             <span className="bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100/50 dark:border-indigo-900/30">{category}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-md hover:shadow-indigo-500/10 active:scale-98 transition-all"
          >
            <FaEdit /> Update
          </button>
          
          <button onClick={() => onDelete(_id)} className="px-4.5 bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 py-3 rounded-xl hover:bg-rose-500 dark:hover:bg-rose-600 hover:text-white cursor-pointer active:scale-98 transition-all duration-300">
            <FaTrashAlt />
          </button>
        </div>
      </div>

      {/* --- Update Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer text-lg">
              <FaTimes />
            </button>
            
            <h2 className="text-2xl font-black mb-8 dark:text-white uppercase tracking-tight">Update Property</h2>
            
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">Property Name</label>
                <input name="propertyName" defaultValue={propertyName} className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">Price ($)</label>
                  <input name="price" type="number" defaultValue={price} className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" required />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">Category</label>
                  <input name="category" defaultValue={category} className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" required />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">Location</label>
                <input name="location" defaultValue={location} className="premium-input w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" required />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 block mb-2">Description</label>
                <textarea name="description" defaultValue={description} rows="3" className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none text-sm font-bold dark:text-white transition duration-350" required></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-md hover:shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer">
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