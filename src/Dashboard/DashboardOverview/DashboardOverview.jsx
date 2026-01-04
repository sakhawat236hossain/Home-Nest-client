import React from 'react';
import useRole from '../../hooks/useRole';
import AdminDashboardOverview from '../Admin/AdminDashboardOverview/AdminDashboardOverview';
import SellerDashboardOverview from '../Seller/SellerDashboardOverview/SellerDashboardOverview';
import BuyerDashboardOverview from '../Users/BuyerDashboardOverview/BuyerDashboardOverview';

const DashboardOverview = () => {
   const { role, isLoading } = useRole();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 italic uppercase tracking-tighter">
                {role} Dashboard Overview
            </h1>

            {role === 'admin' && <AdminDashboardOverview></AdminDashboardOverview>}
            {role === 'seller' && <SellerDashboardOverview></SellerDashboardOverview>}
            {role === 'buyer' && <BuyerDashboardOverview></BuyerDashboardOverview>}
        </div>
    );
};

export default DashboardOverview;