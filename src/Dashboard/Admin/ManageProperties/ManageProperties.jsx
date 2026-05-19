import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingData from "../../../Components/LoadingData";
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-properties");
      return res.data;
    },
  });

  const handleVerify = async (id) => {
    try {
      const res = await axiosSecure.patch(`/property/verify/${id}`);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Verified!", "Property approved.", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Action failed.", "error");
    }
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Reject Property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Reject!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/property/reject/${id}`);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Rejected", "Property rejected.", "info");
          }
        } catch (error) {
          Swal.fire("Error", "Action failed.", "error");
        }
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/property/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Property removed.", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Delete failed.", "error");
        }
      }
    });
  };

  if (isLoading) return <LoadingData />;

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-transparent transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
              Manage <span className="text-indigo-650 dark:text-indigo-400 italic">Properties</span>
            </h2>
            <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1.5">Review and moderate all listings</p>
          </div>
          <div className="px-5 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm hidden sm:block">
             <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Listings:</span>
             <span className="ml-3 font-black text-sm text-indigo-605 dark:text-indigo-400">{properties.length}</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-[#1E293B] rounded-[2.2rem] shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden transition-all duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Property</th>
                  <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Location</th>
                  <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Agent</th>
                  <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Price</th>
                  <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Status</th>
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors duration-300">
                    {/* Property Image & Name */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <img src={property.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-205 dark:border-slate-800 shadow-sm" />
                        <div>
                          <p className="font-black text-sm text-slate-800 dark:text-white leading-tight">{property.propertyName}</p>
                          <span className="text-[9px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mt-1 block">{property.category}</span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-5 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {property.location}
                    </td>

                    {/* Agent */}
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={property.agentImage} className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-850 shadow-sm" alt="" />
                        <p className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">{property.agentName}</p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-5 px-4">
                      <span className="font-black text-sm text-slate-855 dark:text-white">${property.price?.toLocaleString()}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-4">
                      <span className={`inline-block px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                        property.status === 'verified' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                        property.status === 'rejected' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 animate-pulse' : 
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      }`}>
                        {property.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-5 px-6">
                      <div className="flex justify-center gap-2">
                        {property.status !== 'verified' && (
                          <button onClick={() => handleVerify(property._id)} className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all duration-300 shadow-sm cursor-pointer" title="Verify">
                            <FaCheck size={11} />
                          </button>
                        )}
                        {property.status !== 'rejected' && (
                          <button onClick={() => handleReject(property._id)} className="p-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-all duration-300 shadow-sm cursor-pointer" title="Reject">
                            <FaTimes size={11} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(property._id)} className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all duration-300 shadow-sm cursor-pointer" title="Delete">
                          <FaTrashAlt size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.2rem] mt-10 border-2 border-dashed border-slate-100 dark:border-slate-800/80">
            <p className="text-slate-400 dark:text-slate-550 font-black uppercase tracking-widest">No listings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;