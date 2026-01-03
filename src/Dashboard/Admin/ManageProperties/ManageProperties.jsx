import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingData from "../../../Components/LoadingData";

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
        Swal.fire({
          title: "Verified!",
          text: "Property has been approved successfully.",
          icon: "success",
          confirmButtonColor: "#4F46E5",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Could not verify property.", "error");
    }
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Reject Property?",
      text: "Are you sure you want to reject this listing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Reject it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/property/reject/${id}`);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Rejected", "Property status set to rejected.", "info");
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
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/property/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Property has been removed.", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Delete failed.", "error");
        }
      }
    });
  };

  if (isLoading) return <LoadingData />;

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">
              Manage <span className="text-indigo-600">Properties</span>
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              Review submissions and moderate the marketplace.
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Listings</p>
             <p className="text-2xl font-black text-slate-800">{properties.length}</p>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-[2.5rem] shadow-xl shadow-indigo-100/40 border border-slate-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300"
            >
              {/* Image & Status Badge */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={property.propertyName}
                />
                <div className="absolute top-5 left-5">
                  <span
                    className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
                      property.status === "verified"
                        ? "bg-emerald-500/90 text-white"
                        : property.status === "rejected"
                        ? "bg-rose-500/90 text-white"
                        : "bg-amber-500/90 text-white"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-7 flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">
                    {property.propertyName}
                  </h3>
                  <span className="shrink-0 text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-black uppercase">
                    {property.category}
                  </span>
                </div>

                <p className="text-slate-400 text-xs mb-5 flex items-center gap-1 font-bold uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {property.location}
                </p>

                {/* Agent Info Box */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-3xl mb-5 border border-slate-100">
                  <img
                    src={property.agentImage}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                    alt="agent"
                  />
                  <div>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">
                      Agent Name
                    </p>
                    <p className="text-sm font-bold text-slate-700 leading-none">
                      {property.agentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-indigo-600">${property.price}</span>
                  <span className="text-slate-400 text-xs font-bold uppercase">/ Price</span>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="p-7 pt-0">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    {/* Approve Button */}
                    <button
                      onClick={() => handleVerify(property._id)}
                      disabled={property.status === "verified"}
                      className={`flex-1 py-4 rounded-2xl text-xs font-black transition-all shadow-md active:scale-95 ${
                        property.status === "verified"
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                      }`}
                    >
                      {property.status === "verified" ? "APPROVED" : "APPROVE"}
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => handleReject(property._id)}
                      disabled={property.status === "rejected"}
                      className={`flex-1 py-4 rounded-2xl text-xs font-black transition-all border shadow-sm active:scale-95 ${
                        property.status === "rejected"
                        ? "bg-slate-100 text-slate-400 border-transparent cursor-not-allowed"
                        : "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white"
                      }`}
                    >
                      {property.status === "rejected" ? "REJECTED" : "REJECT"}
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-red-600 transition-all flex items-center justify-center gap-2 group/del shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/del:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
                    </svg>
                    REMOVE PROPERTY
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-inner border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-lg">No listings available to manage.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;