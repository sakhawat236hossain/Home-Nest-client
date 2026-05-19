import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query"; 
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingData from "../../../Components/LoadingData";
import MyAddedPropertiesCard from "../../../AllCards/MyAddedPropertiesCard/MyAddedPropertiesCard";

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ["myProperties", user?.email], 
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/myProperties?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/deleteProperty/${id}`);
        if (res.data.deletedCount > 0) {
          refetch(); 
          Swal.fire("Deleted!", "Your property has been deleted.", "success");
        }
      }
    });
  };

  if (isLoading) return <LoadingData />;

  return (
    <div className="container mx-auto px-2 py-6 md:py-10">
      <h2 className="text-3xl font-black text-center mb-10 text-slate-800 dark:text-white uppercase tracking-tight">
        My Added <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Properties</span>
      </h2>

      {properties.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[2.2rem] shadow-sm">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-black uppercase tracking-widest italic">No properties added yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <MyAddedPropertiesCard
              key={property._id}
              property={property}
              onDelete={handleDelete}
              refetch={refetch} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;