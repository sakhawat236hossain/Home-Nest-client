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
        container: 'rounded-[2rem]'
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
    <div className="p-2 sm:p-6 min-h-screen bg-transparent transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 px-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
              User <span className="text-indigo-650 dark:text-indigo-400 italic">Central</span>
            </h2>
            <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1.5">Configure access control and permissions</p>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm hidden sm:block">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Total platform members:</span>
            <span className="ml-3 font-black text-sm text-indigo-600 dark:text-indigo-400">{users.length}</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-[2.2rem] bg-white dark:bg-[#1E293B] shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden transition-all duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
                  <th className="py-6 px-6 sm:px-8 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Member Identity</th>
                  <th className="py-6 px-4 hidden lg:table-cell text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Email Address</th>
                  <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center">Current Role</th>
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors duration-300">
                    
                    {/* User Info */}
                    <td className="py-5 px-6 sm:px-8">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative shrink-0">
                          <img 
                            src={user.photoURL || "https://i.ibb.co/0Q9LS6m/user.png"} 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-205 dark:border-slate-800 shadow-sm" 
                            alt="avatar" 
                          />
                          <div className={`absolute -top-1 -right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full border-2 border-white dark:border-[#1E293B] shadow-sm ${user.role === 'fraud' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-slate-800 dark:text-white leading-tight">{user.name}</span>
                          <span className="text-[9px] sm:hidden font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">{user.role || 'buyer'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-5 px-4 hidden lg:table-cell">
                      <span className="font-bold text-sm text-slate-600 dark:text-slate-300">{user.email}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-4 text-center">
                      <span className={`inline-block px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                        user.role === 'admin' ? 'bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border-indigo-500/20' :
                        user.role === 'seller' ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' :
                        user.role === 'fraud' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 animate-pulse' : 
                        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                      }`}>
                        {user.role || 'buyer'}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-5 px-6">
                      <div className="flex justify-center items-center">
                        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                          
                          {/* Admin Button */}
                          {user.role !== 'admin' && (
                            <button onClick={() => handleMakeRole(user, 'admin')} className="action-btn bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/15">Make Admin</button>
                          )}
                          
                          {/* Seller Button */}
                          {user.role !== 'seller' && (
                            <button onClick={() => handleMakeRole(user, 'seller')} className="action-btn bg-sky-600 hover:bg-sky-700 hover:shadow-sky-500/15">Make Seller</button>
                          )}
                          
                          {/* Buyer Button */}
                          {user.role !== 'buyer' && user.role !== undefined && (
                            <button onClick={() => handleMakeRole(user, 'buyer')} className="action-btn bg-emerald-500 hover:bg-emerald-650 hover:shadow-emerald-500/15">Make Buyer</button>
                          )}
                          
                          {/* Fraud Button */}
                          {user.role !== 'fraud' && (
                            <button onClick={() => handleMakeRole(user, 'fraud')} className="action-btn bg-rose-500 hover:bg-rose-600 hover:shadow-rose-500/15">Mark Fraud</button>
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
          border-radius: 10px;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: white;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }
        .action-btn:hover {
          transform: translateY(-1px);
        }
        .action-btn:active {
          transform: scale(0.97);
        }
      `}</style>
    </div>
  );
};

export default ManageUsers;