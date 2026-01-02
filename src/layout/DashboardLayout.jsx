import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaUser, FaPlusCircle, FaList, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';


const DashboardLayout = () => {

    const { user, logOutUser } = useContext(AuthContext);

  const handleLogOut = () => {
    logOutUser();
    toast.success("LogOut successful!");
  };


    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* ১. সাইডবার (Sidebar) */}
            <aside className="w-full md:w-64 bg-indigo-800 text-white flex flex-col">
                {/* Logo */}
          <Link
            className="text-xl font-bold text-indigo-600 flex items-center gap-2"
            to="/"
          >
            <img
              className="w-[40px] hidden sm:block"
              src="https://img.icons8.com/?size=48&id=FkIuPao6TWWG&format=png"
              alt="logo"
            />
            Property Hub
          </Link>



          
                
                <nav className="flex-1 p-4 space-y-2 text-sm font-medium">
                    {/* Profile */}
                    <NavLink 
                        to="/dashboard/profile" 
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-amber-500 shadow-lg' : 'hover:bg-indigo-700'}`}
                    >
                        <FaUser /> My Profile
                    </NavLink>

                    {/* add property from*/}
                    <NavLink 
                        to="/dashboard/add-property" 
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-amber-500 shadow-lg' : 'hover:bg-indigo-700'}`}
                    >
                        <FaPlusCircle /> Add Property
                    </NavLink>

                    {/* My Added property*/}
                    <NavLink 
                        to="/dashboard/my-addedProperties" 
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-amber-500 shadow-lg' : 'hover:bg-indigo-700'}`}
                    >
                        <FaList /> My Properties
                    </NavLink>


                    {/* My reatings*/}
                    <NavLink 
                        to="/dashboard/my-ratings" 
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-amber-500 shadow-lg' : 'hover:bg-indigo-700'}`}
                    >
                        <FaList /> My Ratings
                    </NavLink>

                    <div className="my-4 border-t border-indigo-700"></div>

                    {/* go to home */}
                    <NavLink to="/" className="flex items-center gap-3 p-3 hover:bg-indigo-700 rounded-lg">
                        <FaHome /> Back to Home
                    </NavLink>

                    <button 
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-3 p-3 hover:bg-red-600 rounded-lg transition"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </nav>
            </aside>

            
            <main className="flex-1">
              
                <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Dashboard Panel</h2>
                   
                </header>

                
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;