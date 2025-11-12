import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import PropertiesCard from "../Components/PropertiesCard";
import LoadingData from "../Components/LoadingData";

const AllProperties = () => {
  const propertiesData = useLoaderData();
  const [properties,setProperties]=useState(propertiesData)
const [loading,setLoading]=useState(true)

  const handleSearch=(e)=>{
e.preventDefault()
const search_text=e.target.search.value
setLoading(true)
fetch(`http://localhost:8000/searchProperty?search=${search_text}`)
.then(res=>res.json())
.then(data=>{
  setProperties(data)
  setLoading(false)
})
  }

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1500);

  return () => clearTimeout(timer);
}, []);


if (loading) {
  return <LoadingData />;
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
<title>All Property page</title>
      {/*  Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-5">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          All Properties
        </span>
      </h1>

      {/*  Subtitle */}
      <p className="text-center max-w-2xl mx-auto mb-10 text-gray-700 dark:text-gray-300">
        <span className="text-blue-600 dark:text-blue-400 font-semibold">
          Discover
        </span>{" "}
        a variety of properties for{" "}
        <span className="text-green-600 dark:text-green-400 font-semibold">
          rent, sale & investment
        </span>. Find your perfect place today!
      </p>

      {/*  Search Box */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
        <label htmlFor="search" className="sr-only">Search</label>

        <div className="relative">
          <input
            type="text"
           name="search"
            className="block w-full p-3 ps-10 text-sm border rounded-lg 
            text-gray-900 bg-gray-50 border-gray-300 
            focus:ring-indigo-500 focus:border-indigo-500 
            dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            placeholder="Search property..."
            
          />

          {/*  Search Icon */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>

          {/*  Search Button */}
          <button
            type="submit"
            className="absolute end-1.5 top-1/2 -translate-y-1/2 px-4 py-2 text-sm font-semibold rounded-md
            bg-indigo-600 hover:bg-indigo-700 text-white
            focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Properties Grid */}
      <div className="grid gap-8 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4">
        {properties?.map((property) => (
          <PropertiesCard key={property._id} property={property} />
        ))}
      </div>

    </div>
  );
};

export default AllProperties;
