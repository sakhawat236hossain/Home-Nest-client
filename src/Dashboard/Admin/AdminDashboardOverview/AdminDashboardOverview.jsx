import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserOverview from './components/UserOverview';
import PropertyOverview from './components/PropertyOverview';
import RatingOverview from './components/RatingOverview';
import BookingOverview from './components/BookingOverview';

const AdminDashboardOverview = () => {
    const [allStats, setAllStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/admin/overview-stats')
            .then(res => {
                setAllStats(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Stats fetch error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-[400px] font-black italic text-indigo-500 animate-pulse">LOADING ANALYTICS...</div>;
    }

    return (
        <div className="p-4 md:p-8 space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gray-800 dark:text-white">
                    System <span className="text-indigo-600">Overview</span>
                </h1>
                <p className="text-gray-500 font-bold text-sm mt-1">Real-time platform statistics and management.</p>
            </div>

            {/* Overview Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <UserOverview stats={allStats?.users} />

                <PropertyOverview stats={allStats?.properties} />

                <BookingOverview stats={allStats?.bookings} />

                <RatingOverview stats={allStats?.ratings} />
            </div>
        </div>
    );
};

export default AdminDashboardOverview;