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
    confirmButtonColor: "#2563eb", 
    cancelButtonColor: "#ef4444", 
    confirmButtonText: "Yes, cancel it!",
    background: "#ffffff",
    customClass: {
      popup: 'rounded-[24px]',
      confirmButton: 'rounded-xl px-6 py-3 font-bold',
      cancelButton: 'rounded-xl px-6 py-3 font-bold'
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

  if (isLoading) return <div className="text-center py-20 font-bold">Loading Bookings...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
          My <span className="text-blue-600">Bookings</span>
        </h2>
        <p className="text-gray-500 font-medium">Track your property purchase requests and status.</p>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-[#1a1d24] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr className="text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
              <th className="py-5 pl-8">Property</th>
              <th>Location</th>
              <th>Price</th>
              <th>Agent</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="py-5 pl-8">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={booking.image} alt={booking.propertyName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-lg">
                        {booking.propertyName}
                      </div>
                      <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                        {booking.category}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-gray-600 dark:text-gray-400 font-medium">
                   <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-400" size={12}/>
                      {booking.location}
                   </div>
                </td>

                <td className="font-black text-gray-900 dark:text-white text-lg">
                  ${booking.price}
                </td>

                <td>
                   <div className="text-sm dark:text-gray-300 font-bold">{booking.agentName}</div>
                   <div className="text-xs text-gray-400">{booking.agentEmail}</div>
                </td>

                <td>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-600 border border-amber-200' :
                    booking.status === 'approved' ? 'bg-green-100 text-green-600 border border-green-200' :
                    'bg-red-100 text-red-600 border border-red-200'
                  }`}>
                    {booking.status}
                  </span>
                </td>

                <th className="text-center">
                  <button 
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-medium">You haven't booked any property yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingProperty;