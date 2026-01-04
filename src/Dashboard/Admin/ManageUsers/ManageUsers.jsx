import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingData from "../../../Components/LoadingData";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeRole = async (user, role) => {
    Swal.fire({
      title: "Confirm Action",
      text: `Update ${user.name} to ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, Update",
      customClass: {
        container: 'rounded-3xl'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/role/${user._id}`, { role });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Success", "User role updated.", "success");
          }
        } catch (error) {
          Swal.fire("Failed", "Server error occurred.", "error");
        }
      }
    });
  };

  if (isLoading) return <LoadingData />;

  return (
    <div className="p-2 sm:p-6 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black ">
              User <span className="text-indigo-600 italic">Central</span>
            </h2>
            <p className=" text-sm sm:text-base font-medium">Configure access control and permissions</p>
          </div>
          <div className="px-4 py-2 rounded-2xl shadow-sm border border-slate-100 hidden sm:block">
            <span className="text-sm">Total Members:</span>
            <span className="ml-2 font-bold text-indigo-600">{users.length}</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-[2rem] shadow-2xl shadow-indigo-100/40 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className=" border-b border-slate-100">
                  <th className="py-6 px-4 sm:px-8 text-xs font-bold  uppercase tracking-widest">Member Identity</th>
                  <th className="py-6 px-4 hidden lg:table-cell text-xs font-bold  uppercase tracking-widest">Email Address</th>
                  <th className="py-6 px-4 text-xs font-bold  uppercase tracking-widest text-center">Status</th>
                  <th className="py-6 px-4 text-xs font-bold  uppercase tracking-widest text-center">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-indigo-50/20 transition-all duration-300">
                    
                    {/* User Info */}
                    <td className="py-5 px-4 sm:px-8">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative group">
                          <img 
                            src={user.photoURL || "https://i.ibb.co/0Q9LS6m/user.png"} 
                            className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform" 
                            alt="avatar" 
                          />
                          <div className={`absolute -top-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 rounded-full border-2 border-white shadow-sm ${user.role === 'fraud' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm sm:text-base leading-tight">{user.name}</span>
                          <span className="text-[10px] sm:hidden  font-medium">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email (Desktop Only) */}
                    <td className="py-5 px-4 hidden lg:table-cell">
                      <span className="text-slate-500 font-medium text-sm">{user.email}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                        user.role === 'admin' ? ' text-indigo-700' :
                        user.role === 'seller' ? ' text-sky-700' :
                        user.role === 'fraud' ? ' text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {user.role || 'Member'}
                      </span>
                    </td>

                    {/* Control Buttons */}
                    <td className="py-5 px-4">
                      <div className="flex justify-center items-center gap-2 flex-wrap max-w-[250px] mx-auto">
                        
                        {/* Action Buttons with Tooltip-like feel */}
                        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto cursor-pointer">
                          {user.role !== 'admin' && (
                            <button onClick={() => handleMakeRole(user, 'admin')} className="action-btn cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700">Admin</button>
                          )}
                          {user.role !== 'agent' && (
                            <button onClick={() => handleMakeRole(user, 'seller')} className="action-btn cursor-pointer bg-sky-500 text-white hover:bg-sky-600">Seller</button>
                          )}
                          {user.role !== 'user' && user.role !== '' && (
                            <button onClick={() => handleMakeRole(user, 'user')} className="action-btn cursor-pointer bg-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white">User</button>
                          )}
                          {user.role !== 'fraud' && (
                            <button onClick={() => handleMakeRole(user, 'fraud')} className="action-btn cursor-pointer bg-rose-500 text-white hover:bg-rose-700 col-span-1">Fraud</button>
                          )}
                        </div>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Global CSS for buttons to keep JSX clean */}
      <style jsx>{`
        .action-btn {
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          text-align: center;
        }
        .action-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default ManageUsers;