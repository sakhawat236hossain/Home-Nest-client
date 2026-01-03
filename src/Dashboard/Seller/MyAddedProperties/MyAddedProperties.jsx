import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query"; // ১. TanStack Query ইমপোর্ট
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingData from "../../../Components/LoadingData";
import MyAddedPropertiesCard from "../../../AllCards/MyAddedPropertiesCard/MyAddedPropertiesCard";

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // ২. useQuery ব্যবহার করে ডাটা ফেচিং
  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ["myProperties", user?.email], // ডাটা ক্যাশ করার জন্য ইউনিক কি
    enabled: !!user?.email, // ইউজার ইমেইল থাকলে তবেই ফেচ হবে
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/deleteProperty/${id}`);
        if (res.data.deletedCount > 0) {
          // ৩. ডিলিট সফল হলে সরাসরি রিফেচ কল করা
          refetch(); 
          Swal.fire("Deleted!", "Your property has been deleted.", "success");
        }
      }
    });
  };

  // TanStack Query এর isLoading ব্যবহার করা হয়েছে
  if (isLoading) return <LoadingData />;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-black text-center mb-10 text-gray-800 dark:text-white">
        My Added <span className="text-blue-600">Properties</span>
      </h2>

      {properties.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-3xl">
          <p className="text-gray-500 text-xl font-bold italic">No properties added yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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