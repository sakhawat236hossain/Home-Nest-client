import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBookingProperty = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myBookings/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this booking request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5", 
      cancelButtonColor: "#EF4444", 
      confirmButtonText: "Yes, cancel it!",
      background: "#ffffff",
      customClass: {
        popup: 'rounded-[2rem]',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/cancelBooking/${id}`);
          
          if (res.data.deletedCount > 0) {
            refetch(); 
            
            Swal.fire({
              title: "Cancelled!",
              text: "Your booking request has been removed.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong. Please try again.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-indigo-100 dark:bg-indigo-950/40 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 py-6 md:py-10 bg-transparent transition-colors duration-500">
      
      {/* Title */}
      <div className="mb-10 px-2">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
          My <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Bookings</span>
        </h2>
        <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1.5">Track your property purchase requests and status.</p>
      </div>

      {/* Table Shell */}
      <div className="overflow-x-auto bg-white dark:bg-[#1E293B] rounded-[2.2rem] shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800/80 transition-all duration-500">
        <table className="w-full text-left">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
              <th className="py-6 px-6 sm:px-8 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Property</th>
              <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Location</th>
              <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Price</th>
              <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Agent</th>
              <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Status</th>
              <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors duration-300">
                <td className="py-5 px-6 sm:px-8">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0">
                      <img src={booking.image} className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-805 shadow-sm" alt={booking.propertyName} />
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-850 dark:text-white leading-tight">
                        {booking.propertyName}
                      </div>
                      <div className="text-[9px] text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-widest mt-1">
                        {booking.category}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                   <div className="flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-rose-500 shrink-0" size={11}/>
                      {booking.location}
                   </div>
                </td>

                <td className="font-black text-slate-850 dark:text-white text-sm">
                  ${booking.price?.toLocaleString()}
                </td>

                <td>
                   <div className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">{booking.agentName}</div>
                   <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">{booking.agentEmail}</div>
                </td>

                <td>
                  <span className={`inline-block px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                    booking.status === 'pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                    booking.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                    'bg-rose-500/10 text-rose-600 border-rose-500/20 animate-pulse'
                  }`}>
                    {booking.status}
                  </span>
                </td>

                <td className="py-5 px-6 text-center">
                  <button 
                    onClick={() => handleDelete(booking._id)}
                    className="p-2.5 bg-rose-50 dark:bg-rose-950/20 text-rose-500 hover:bg-rose-500 dark:hover:bg-rose-650 hover:text-white rounded-xl transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.2rem] border border-slate-100 dark:border-slate-800/80">
            <p className="text-slate-400 dark:text-slate-550 font-black uppercase tracking-widest">You haven't booked any property yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingProperty;