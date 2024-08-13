import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import DataTable from '../../components/DataTable/DataTable';
import Sidebar from '../../components/sidebar/Sidebar';

import { FaFilter, FaHome  } from "react-icons/fa";
import './Dashboard.css'


const Dashboard = () => {
  const data = [
    { index: 1, brandName: 'Brand A', productType: 'Type 1', planName: 'Plan A', charge: 100, tax: 10, total: 110 },
    { index: 2, brandName: 'Brand B', productType: 'Type 2', planName: 'Plan B', charge: 200, tax: 20, total: 220 },
    { index: 3, brandName: 'Brand C', productType: 'Type 3', planName: 'Plan A', charge: 440, tax: 20, total: 460 },
    { index: 4, brandName: 'Brand D', productType: 'Type 2', planName: 'Plan B', charge: 220, tax: 20, total: 240 },
    { index: 5, brandName: 'Brand X', productType: 'Type 1', planName: 'Plan C', charge: 440, tax: 20, total: 460 },
    { index: 6, brandName: 'Brand Z', productType: 'Type 2', planName: 'Plan B', charge: 260, tax: 20, total: 280 },
    { index: 7, brandName: 'Brand S', productType: 'Type 1', planName: 'Plan C', charge: 400, tax: 20, total: 420 },
    { index: 8, brandName: 'Brand F', productType: 'Type 2', planName: 'Plan B', charge: 200, tax: 20, total: 220 },
    { index: 9, brandName: 'Brand W', productType: 'Type 3', planName: 'Plan A', charge: 260, tax: 20, total: 220 },
    { index: 10, brandName: 'Brand Q', productType: 'Type 3', planName: 'Plan B', charge: 500, tax: 20, total: 520 },
    // Add more rows as needed
  ];

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [filteredData, setFilteredData] = useState(data);

  const applyFilters = (filters) => {
    const { companyName, zipCode, minPrice, maxPrice } = filters;
    const brandName = companyName;
    const filtered = data.filter(row => {
      const withinPriceRange = (minPrice === '' || row.charge >= minPrice) &&
                               (maxPrice === '' || row.charge <= maxPrice);
      return (
        (!companyName || row.brandName.includes(companyName)) &&
        (!zipCode || row.zipCode.includes(zipCode)) &&
        withinPriceRange
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="dashboard">
    
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onApplyFilters={applyFilters}
        />
      <div className="content">
        <div className='dashboard-header'>
            <div className='dashboard-nav-items'>
            <NavLink to='/'>
            <FaHome /> home / DashBoard
            </NavLink>
            </div>
            <h2>Company or Customer Dashboard</h2>
        </div>
       <div className='table-container'>
        <div>
        <button className='filter-button' onClick={() => setSidebarOpen(true)}><FaFilter size={15}/></button>
        <input className='search-field' type="text" placeholder='Search...' />
        </div>
        <DataTable data={filteredData} />
       </div>
      </div>
    </div>
  );
};

export default Dashboard;
