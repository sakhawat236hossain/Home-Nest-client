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
            Swal.fire("Success", `User is now a ${role}.`, "success");
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
            <span className="text-sm font-bold">Total Platform Members:</span>
            <span className="ml-2 font-black text-indigo-600">{users.length}</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-[2rem] shadow-2xl shadow-indigo-100/40 border border-slate-100 overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className=" border-b border-slate-100 ">
                  <th className="py-6 px-4 sm:px-8 text-xs font-black uppercase tracking-widest">Member Identity</th>
                  <th className="py-6 px-4 hidden lg:table-cell text-xs font-black uppercase tracking-widest">Email Address</th>
                  <th className="py-6 px-4 text-xs font-black uppercase tracking-widest text-center">Current Role</th>
                  <th className="py-6 px-4 text-xs font-black uppercase tracking-widest text-center">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user._id} className=" transition-all duration-300">
                    
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
                          <span className="font-black text-sm sm:text-base leading-tight">{user.name}</span>
                          <span className="text-[10px] sm:hidden font-bold uppercase tracking-tighter">{user.role || 'buyer'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email (Desktop Only) */}
                    <td className="py-5 px-4 hidden lg:table-cell">
                      <span className=" font-bold text-sm">{user.email}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                        user.role === 'admin' ? ' border-indigo-100 text-indigo-700' :
                        user.role === 'seller' ? ' border-sky-100 text-sky-700' :
                        user.role === 'fraud' ? ' border-rose-100 text-rose-700' : 
                        ' border-emerald-100 text-emerald-700'
                      }`}>
                        {user.role || 'buyer'}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-5 px-4">
                      <div className="flex justify-center items-center gap-2">
                        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                          
                          {/* Admin Button */}
                          {user.role !== 'admin' && (
                            <button onClick={() => handleMakeRole(user, 'admin')} className="action-btn bg-indigo-600  hover:bg-indigo-700">Make Admin</button>
                          )}
                          
                          {/* Seller/Agent Button */}
                          {user.role !== 'seller' && (
                            <button onClick={() => handleMakeRole(user, 'seller')} className="action-btn  bg-sky-600">Make Seller</button>
                          )}
                          
                          {/* Buyer Button */}
                          {user.role !== 'buyer' && user.role !== undefined && (
                            <button onClick={() => handleMakeRole(user, 'buyer')} className="action-btn bg-emerald-500  hover:bg-emerald-600">Make Buyer</button>
                          )}
                          
                          {/* Fraud Button */}
                          {user.role !== 'fraud' && (
                            <button onClick={() => handleMakeRole(user, 'fraud')} className="action-btn bg-rose-500  hover:bg-rose-700">Mark Fraud</button>
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

      <style jsx>{`
        .action-btn {
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .action-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default ManageUsers;