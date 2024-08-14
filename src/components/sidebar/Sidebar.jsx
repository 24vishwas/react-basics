import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import './Sidebar.css'

const Sidebar = ({ isOpen, onClose, onApplyFilters, companyOptions, productTypes  }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            companyName: '',
            zipCode: '',
            minPrice: '',
            maxPrice: '',
			productTypes: [],
        }
    });

    const onSubmit = data => {
        onApplyFilters(data);
    };

	const clearFilters = () => {
        reset();
        onApplyFilters({});
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
                        render={({ field }) => (
                            <select {...field}>
                                <option value="">Select a company</option>
                                {companyOptions.map((company, index) => (
                                    <option key={index} value={company}>
                                        {company}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    <Controller
                        name="companyName"
                        control={control}
                        render={({ field }) => <input type="text" {...field} placeholder="Or type here..." />}
                    />
                </div>
				<div className='product-type'>
                    <label>Product Type</label>
					
                    {productTypes.map((type, index) => (
                        <Controller
                            key={index}
                            name="productTypes"
                            control={control}
                            render={({ field }) => (
								
                                <div className="checkbox-group">
									
                                    <input
                                        type="checkbox"
                                        value={type}
                                        {...field}
                                        checked={field.value.includes(type)}
                                        onChange={() => {
                                            if (field.value.includes(type)) {
                                                field.onChange(field.value.filter(item => item !== type));
                                            } else {
                                                field.onChange([...field.value, type]);
                                            }
                                        }}
                                    />
                                    <label>{type}</label>
                                </div>
                            )}
                        />
                    ))}
                </div>
               
				<h3>Price Range</h3>
                <div className='price-limit-wrapper'>
                    <div className="form-group">
                        <label>Min </label>
                        <Controller
                            name="minPrice"
                            control={control}
                            render={({ field }) => <input type="number" {...field} />}
                        />
                    </div>
                    <div className="form-group">
                        <label>Max </label>
                        <Controller
                            name="maxPrice"
                            control={control}
                            render={({ field }) => <input type="number" {...field} />}
                        />
                    </div>
                </div>
				<div className="form-group">
                    <label>Zip Code</label>
                    <Controller
                        name="zipCode"
                        control={control}
                        render={({ field }) => <input type="text" {...field} />}
                    />
                </div>
                <button type="submit" className="apply-filters">Apply Filters</button>
            </form>
			<button type="submit" className="clear-filters" onClick={clearFilters}>Clear Filters</button>
            <button onClick={onClose} className="close-btn">Close</button>
        </div>
    );
};

export default Sidebar;
