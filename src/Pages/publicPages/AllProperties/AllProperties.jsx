import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import LoadingData from "../../../Components/LoadingData";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LatestCart from "../../../Components/LatestCart";

const AllProperties = () => {
  const propertiesData = useLoaderData();
  const [properties, setProperties] = useState(propertiesData);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [searchText, setSearchText] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Typewriter state
  const fullTitle = "All Properties";
  const fullSubtitle =
    "Discover a variety of properties for rent, sale & investment. Find your perfect place today!";
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  // Search & Filter Logic
  useEffect(() => {
    setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      fetch(
        `https://home-nest-server-rho.vercel.app/searchProperty?search=${searchText}`
      )
        .then((res) => res.json())
        .then((data) => {
          let sorted = [...data];
          if (sortBy === "low-to-high")
            sorted.sort((a, b) => a.price - b.price);
          else if (sortBy === "high-to-low")
            sorted.sort((a, b) => b.price - a.price);
          else if (sortBy === "newest")
            sorted.sort(
              (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
            );
          else if (sortBy === "oldest")
            sorted.sort(
              (a, b) => new Date(a.postedDate) - new Date(b.postedDate)
            );

          setProperties(sorted);
          setCurrentPage(1);
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, sortBy]);

  // Pagination Calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Typewriter effect
  useEffect(() => {
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, titleIndex + 1));
      titleIndex++;
      if (titleIndex === fullTitle.length) clearInterval(titleInterval);
    }, 100);

    const subtitleTimeout = setTimeout(() => {
      let subIndex = 0;
      const subInterval = setInterval(() => {
        setTypedSubtitle(fullSubtitle.slice(0, subIndex + 1));
        subIndex++;
        if (subIndex === fullSubtitle.length) clearInterval(subInterval);
      }, 30);
    }, 1500);

    return () => {
      clearInterval(titleInterval);
      clearTimeout(subtitleTimeout);
    };
  }, []);

  if (loading && properties.length === 0) return <LoadingData />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-transparent">
      
      {/* Title & Subtitle */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.4em]">Catalog Explorer</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {typedTitle}
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
          {typedSubtitle}
        </p>
      </div>

      {/* Search + Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800/80 mb-12 transition-all duration-300">
        <div className="relative w-full md:w-2/3">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by property name or location..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-14 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-semibold text-sm transition-all duration-300"
          />
        </div>

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-1/3 p-3.5 bg-slate-50 dark:bg-slate-950 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-bold text-xs uppercase tracking-widest cursor-pointer transition-all duration-300"
        >
          <option value="default">Sort: Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="newest">Newest Listed</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingData />
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems.map((Property) => (
              <LatestCart key={Property._id} Property={Property} />
            ))}
          </div>

          {/* No Data State */}
          {properties.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest">
                No properties found!
              </h3>
            </div>
          )}

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white disabled:opacity-50 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <FaChevronLeft size={12} />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-11 h-11 rounded-xl font-black text-xs transition-all duration-300 cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-indigo-605 bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                      : "bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:border-indigo-650"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white disabled:opacity-50 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllProperties;
