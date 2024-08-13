import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import './Sidebar.css'

const Sidebar = ({ isOpen, onClose, onApplyFilters }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      companyName: '',
      zipCode: '',
      minPrice: '',
      maxPrice: '',
    }
  });

  const onSubmit = data => {
    onApplyFilters(data);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='sidebar-header'>
        <h2>Search Criteria</h2>
      </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Company Name</label>
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => <input type="text" {...field} />}
        />
      </div>
      <div className="form-group">
        <label>Zip Code</label>
        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => <input type="text" {...field} />}
        />
      </div>
      <div className="form-group">
        <label>Min Price</label>
        <Controller
          name="minPrice"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
      </div>
      <div className="form-group">
        <label>Max Price</label>
        <Controller
          name="maxPrice"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
      </div>
      <button type="submit" className="apply-filters">Apply Filters</button>
    </form>
    <button onClick={onClose} className="close-btn">Close</button>
  </div>
  );
};

export default Sidebar;
