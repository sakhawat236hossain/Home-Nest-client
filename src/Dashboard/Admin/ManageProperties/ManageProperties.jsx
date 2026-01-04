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
    <div className="p-4 sm:p-8 min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-800 dark:text-white uppercase">
              Manage <span className="text-indigo-600">Properties</span>
            </h2>
            <p className="text-gray-500 text-sm font-medium">Review and moderate all listings</p>
          </div>
          <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
             <p className="text-[10px] font-black uppercase text-gray-400">Total</p>
             <p className="text-xl font-black dark:text-white">{properties.length}</p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Property</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Location</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Agent</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Price</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    {/* Property Image & Name */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img src={property.image} alt="" className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                        <div>
                          <p className="font-bold text-gray-800 dark:text-gray-200">{property.propertyName}</p>
                          <span className="text-[10px] font-bold text-indigo-500 uppercase">{property.category}</span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="p-5 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {property.location}
                    </td>

                    {/* Agent */}
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <img src={property.agentImage} className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800" alt="" />
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{property.agentName}</p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-5">
                      <span className="font-black text-gray-900 dark:text-white">${property.price}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        property.status === 'verified' ? 'bg-emerald-100 text-emerald-600' :
                        property.status === 'rejected' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {property.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        {property.status !== 'verified' && (
                          <button onClick={() => handleVerify(property._id)} className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-lg shadow-emerald-200 dark:shadow-none" title="Verify">
                            <FaCheck size={12} />
                          </button>
                        )}
                        {property.status !== 'rejected' && (
                          <button onClick={() => handleReject(property._id)} className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-all shadow-lg shadow-amber-200 dark:shadow-none" title="Reject">
                            <FaTimes size={12} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(property._id)} className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all shadow-lg shadow-rose-200 dark:shadow-none" title="Delete">
                          <FaTrashAlt size={12} />
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
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[2rem] mt-10 border-2 border-dashed border-gray-100 dark:border-gray-800">
            <p className="text-gray-400 font-bold uppercase tracking-widest">No listings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;