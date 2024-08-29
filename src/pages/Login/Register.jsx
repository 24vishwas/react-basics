import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import { createUser } from '../../api/user';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaQuestionCircle, FaAddressCard, FaCalendarDay } from 'react-icons/fa';
import { CgClose } from "react-icons/cg";
import './Register.css';

const formConfig = {
    sections: [
        {
            title: "Personal Details",
            fields: [
                { name: "firstName", type: "text", placeholder: "First Name", validation: { required: true }, icon: "FaUser" },
                { name: "middleName", type: "text", placeholder: "Middle Name", validation: { required: false }, icon: "FaUser" },
                { name: "lastName", type: "text", placeholder: "Last Name", validation: { required: true }, icon: "FaUser" },
                { name: "email", type: "email", placeholder: "Email", validation: { required: true }, icon: "FaEnvelope" },
                { name: "password", type: "password", placeholder: "Password", validation: { required: true }, icon: "FaLock" },
                { name: "confirmPassword", type: "password", placeholder: "Confirm Password", validation: { required: true }, icon: "FaLock" },
                { name: "ssn", type: "text", placeholder: "SSN", validation: { required: true }, icon: "FaLock" },
                { name: "profileImage", type: "file", placeholder: "Upload Profile Image", validation: { required: true }, icon: "FaUser" },
                { name: "dob", type: "date", placeholder: "Date of Birth", validation: { required: true }, icon: 'FaCalendarDay' },
                // { name: "phone", type: "tel", placeholder: "Phone", validation: { required: true }, icon: "FaPhone" },
            ],
        },
        {
            title: "Customer Address and Property details",
            fields: [
                { name: "meterId", type: "text", placeholder: "Meter Id", validation: { required: true }, icon: "FaLock" },
                { name: "isResBus", type: "select", placeholder: "Is Res Bus", options: ["R-Res", "B-small Business", "C-Commerce"], validation: { required: true }, icon: "FaQuestionCircle" },
                { name: "tdsp", type: "text", placeholder: "TDSP", validation: { required: true }, icon: "FaLock" },
                { name: "address1", type: "text", placeholder: "Address 1", validation: { required: true }, icon: "FaAddressCard" },
                { name: "address2", type: "text", placeholder: "Address 2", validation: { required: false }, icon: "FaAddressCard" },
                { name: "city", type: "text", placeholder: "City", validation: { required: true }, icon: "FaAddressCard" },
                { name: "state", type: "text", placeholder: "State", validation: { required: true }, icon: "FaAddressCard" },
                { name: "country", type: "text", placeholder: "Country", validation: { required: true }, icon: "FaAddressCard" },
                { name: "swimmingPool", type: "select", placeholder: "Swimming Pool", options: ["yes", "No"] },
                { name: "houseType", type: "select", placeholder: "House Type", options: ["Apartment", "Villa", "Townhouse"] },
                { name: "numRooms", type: "number", placeholder: "Number of Rooms", validation: { required: true } },
                { name: "numEVs", type: "text", placeholder: "Number of EVs", validation: { required: true } },
                { name: "phone type", type: "select", placeholder: "Phone type", options: ["Cell", "Work", "Home", "Fax"], validation: { required: true }, icon: "FaPhone" },
                { name: "phone", type: "tel", placeholder: "Phone", validation: { required: true }, icon: "FaPhone" },
                { name: "primary", type: "checkbox", placeholder: "Mark as Primary", validation: { required: true } },
            ],
        },
        {
            title: "Electric Bill Usages",
            fields: [
                //     { name: 'customerAddress',
                //     type: 'select',
                //     placeholder: 'Select Customer Address',
                //     validation:{ required: true},
                //     options: [customerAddresses]
                // },
                {
                    name: 'January',
                    type: 'number',
                    placeholder: 'Jan',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'February',
                    type: 'number',
                    placeholder: 'feb',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'March',
                    type: 'number',
                    placeholder: 'mar',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'April',
                    type: 'number',
                    placeholder: 'apr',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'May',
                    type: 'number',
                    placeholder: 'may',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'June',
                    type: 'number',
                    placeholder: 'jun',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'July',
                    type: 'number',
                    placeholder: 'jul',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'August',
                    type: 'number',
                    placeholder: 'aug',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'September',
                    type: 'number',
                    placeholder: 'sept',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'October',
                    type: 'number',
                    placeholder: 'oct',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'November',
                    type: 'number',
                    placeholder: 'nov',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
                {
                    name: 'December',
                    type: 'number',
                    placeholder: 'dec',
                    validation: { required: false },
                    icon: "FaCalenderDay"
                },
               
               


            ],
        },

    ],
};

const Register = () => {
    const { register, handleSubmit, control, watch, formState: { errors, isValid }, trigger, getValues, setValue } = useForm({ mode: 'onChange' });
    const [currentStep, setCurrentStep] = useState(0);
    const [isAddressSectionInitialized, setIsAddressSectionInitialized] = useState(false);
    const [personalDetails, setPersonalDetails] = useState({});
    const [formData, setFormData] = useState(null);
    const [bills, setBills] = useState([]);
    const { fields: addressFields, append, remove } = useFieldArray({
        control,
        name: "customerAddresses",
    });
    const { fields: electricBills, append: appendBills, remove: removeBills } = useFieldArray({
        control,
        name: "customerBills",
    });
    // const { fields: personalFields } = useFieldArray({
    //     control,
    //     name: "personalDetails",
    // });
    
    const [primaryAddress, setPrimaryAddress] = useState(null);
    // const [primaryPhone, setPrimaryPhone] = useState(null);
    const customerAddresses = watch("customerAddresses");
    
   console.log(personalDetails)
    console.log(customerAddresses);
    const onSubmit = async (data) => {
        // const personalDetails = data.personalDetails.reduce((acc, field) => {
        //     const [key, value] = Object.entries(field)[0];
        //     acc[key] = value;
        //     return acc;
        // }, {});
        const updatedData = {
            // ...data,
            customerAddresses: data.customerAddresses.map((address, index) => ({
                ...address,
                primary: index === primaryAddress,
            })),
            customerBills: bills.map((bills, index) => ({
                ...bills,
            })),
            personalDetails,
            
        };

        try {
            const response = await createUser(updatedData);
            console.log('User created successfully:', response);
        } catch (error) {
            console.error('Error creating user:', error);
        }
        localStorage.setItem("formData", JSON.stringify(updatedData));
        console.log(updatedData);
        console.log(bills)
    };

    const handleNext = async () => {
        const currentSection = formConfig.sections[0].fields.map(field => field.name);
        // const valid = await trigger([...currentSection, `customerAddresses`, `customerBills`]);
        let valid = false;
        if(currentStep == 0){
            valid = await trigger([...currentSection]);
            if (!isAddressSectionInitialized) {
                append({}); // Add one address field
                setIsAddressSectionInitialized(true); // Mark section as initialized
            }
        }
        if(currentStep == 1){
             valid = await trigger('customerAddresses');
            
        }
        if(currentStep == 2){
             valid = await trigger([...currentSection,'customerBills']);
        }
        // var valid = true
        // setCurrentStep(prevStep => prevStep + 1);
        
        if (valid) {
            if(currentStep === 0){
                // const personalinfo = watch('personalDetails')
                // const personal = personalinfo.reduce((acc, field) => {
                //     const [key, value] = Object.entries(field)[0];
                //     acc[key] = value;
                //     return acc;
                // }, {});
                const allValues = getValues();
                const currentSectionValues = currentSection.reduce((acc, fieldName) => {
                    if (allValues[fieldName] !== undefined) {
                        acc[fieldName] = allValues[fieldName];
                    }
                    return acc;
                }, {});
                setPersonalDetails(currentSectionValues)
                setCurrentStep(currentStep + 1);
            }
            if (currentStep === formConfig.sections.length - 1) {

                setFormData(getValues());
                setCurrentStep(currentStep + 1);
                console.log(personalDetails);
            } else {
                setCurrentStep(currentStep + 1);
                console.log(currentStep)
                setFormData(getValues());
            }
        }else{
            console.log('error')
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
        console.log(currentStep)
        
    };

    const handleEdit = () => {
        setCurrentStep(0);
    };

    const addMoreAddress = () => {
        append({});
    };

    const deleteAddress = (index) => {
        if (primaryAddress === index) {
            alert("Primary address cannot be deleted");
            return;
        }
        if (confirm('Please confirm the delete')) {
            remove(index);
        }
    };

    const handlePrimaryChange = (index) => {
        setPrimaryAddress(index);
        addressFields.forEach((_, i) => {
            setValue(`customerAddresses[${i}].primary`, i === index);
        });
    };

    // customer phone
    const addMoreBills = () => {
        appendBills({});
    };

    const deleteBills = (index) => {

        if (confirm('Please confirm the delete')) {
            removeBills(index);
        }
    };

    const getAvailableMeterIds = (index) => {
        const selectedMeterIds = watch('customerBills')?.map(bill => bill.customerAddress) || [];

        // Filter out already selected meterIds, except the one for the current index
        return customerAddresses.filter(address =>
            !selectedMeterIds.includes(address.meterId) || address.meterId === selectedMeterIds[index]
        );
    };

    const [selectedAddress, setSelectedAddress] = useState({ meterId: null, address1: null });



    // Handle selecting an address and creating a new bill for it
    const handleSelectAddress = (address) => {
        const existingBill = bills.find(bill => bill.meterId === address.meterId);
        if (!existingBill) {
            // If the bill for the selected address doesn't exist, create a new one
            setBills(prevBills => [
                ...prevBills,
                {
                    meterId: address.meterId,
                    address1: address.address1,
                    fields: {} // Placeholder for bill form fields
                }
            ]);
        }
        setSelectedAddress({meterId: address.meterId,
            address1: address.address1});
    };

    // Handle form field updates for each address
    const handleFieldChange = (index, fieldName, value) => {
        const updatedBills = bills.map((bill, i) =>
            i === index
                ? { ...bill, fields: { ...bill.fields, [fieldName]: value } }
                : bill
        );
        setBills(updatedBills);

    };

    // Find the selected bill based on selectedAddress
    const selectedBill = electricBills.find(item => item.meterId === selectedAddress);
    // const handlePrimaryPhoneChange = (index) => {
    //     setPrimaryPhone(index);
    //     phoneFields.forEach((_, i) => {
    //         setValue(`customerPhones[${i}].primary`, i === index);
    //     });
    // };
    const iconComponents = {
        FaUser: <FaUser />,
        FaLock: <FaLock />,
        FaEnvelope: <FaEnvelope />,
        FaPhone: <FaPhone />,
        FaQuestionCircle: <FaQuestionCircle />,
        FaAddressCard: <FaAddressCard />,
        FaCalendarDay: <FaCalendarDay />,
    };

    return (
        <div className='register-page'>
            <div className='register-content'>
                <h1>Customer Registration</h1>
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    {currentStep < formConfig.sections.length ? (
                        formConfig.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className={`form-section ${currentStep === sectionIndex ? '' : 'hidden'}`}>
                                <h3>{section.title}</h3>
                                <div className='form-section-wrapper'>
                                    {sectionIndex === 1 ? (
                                        addressFields.map((item, index) => (
                                            <div key={index} className='customer-section-wrapper'>
                                                <div className="address-section">
                                                    {section.fields.map((field, fieldIndex) => (
                                                        <div key={fieldIndex} className="fields-container">
                                                            <label htmlFor={field.placeholder}>{field.placeholder}</label>
                                                            <div className="input-fields">
                                                                {field.icon && iconComponents[field.icon]}
                                                                {field.type === "select" ? (
                                                                    <select
                                                                        {...register(`customerAddresses.${index}.${field.name}`, field.validation)}
                                                                    >
                                                                        {field.options.map((option, optIndex) => (
                                                                            <option key={optIndex} value={option}>
                                                                                {option}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                ) : field.type === 'checkbox' ? (
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={primaryAddress === index}
                                                                        onChange={() => handlePrimaryChange(index)}
                                                                    // {...register(`customerAddresses[${index}].primary`)}
                                                                    />
                                                                ) :
                                                                    (
                                                                        <input
                                                                            type={field.type}
                                                                            placeholder={field.placeholder}
                                                                            {...register(`customerAddresses.${index}.${field.name}`, field.validation)}
                                                                        />
                                                                    )}
                                                                {errors?.customerAddresses?.[index]?.[field.name] && (
                                                                    <span className='error-note'>
                                                                        *{field.placeholder}* is mandatory
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="address-actions">
                                                    {/* <label className="primary-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={primaryAddress === index}
                                                            onChange={() => handlePrimaryChange(index)}
                                                        />
                                                        Mark as Primary
                                                    </label> */}
                                                    <button
                                                        type="button"
                                                        className="delete-button"
                                                        onClick={() => deleteAddress(index)}
                                                    // disabled={primaryAddress === index}
                                                    >
                                                        <CgClose />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                        ) : sectionIndex === 2 ? (
                                            <div className='electric-usage-page'>
                                            {/* <h3>{section.title}</h3> */}

                                            <div className="address-list">
                                                <h3>Select Customer Address :</h3>
                                                {customerAddresses && customerAddresses.length > 0 ? (
                                                    customerAddresses.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className={`address-card ${selectedAddress.meterId === item.meterId ? 'selected' : ''}`}
                                                            
                                                        >
                                                            <h4>MeterID : {item.meterId}</h4>
                                                            <h4> Address : {item.address1}</h4>
                                                        <button className='prev-button' onClick={() => handleSelectAddress(item)}>
                                                            Add Usage
                                                        </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No addresses available.</p>
                                                )}
                                            </div>

                                            {/* Display bill form for each selected address */}
                                            <div  className='bill-section'>
                                            {bills.length > 0 ? (
                                                bills.map((bill, index) => (
                                                    <div key={bill.meterId} className={`bill-form ${selectedAddress.meterId === bill.meterId ? 'selected' : ''}`}>
                                                        <h3>Fill monthly Electric usage for : {bill.meterId} - {bill.address1}</h3>

                                                        {section.fields.map((field, fieldIndex) => (
                                                            <div key={fieldIndex} className="usage-fields-container">
                                                                
                                                                <label htmlFor={field.placeholder}>{field.name} : </label>
                                                                <div className="usage-fields">
                                                                {field.icon && iconComponents[field.icon] }
                                                                    {field.type === "select" ? (
                                                                        <select
                                                                        type={field.type}
                                                                        value={bill.fields[field.name] || ''}
                                                                        onChange={(e) => handleFieldChange(index, field.name, e.target.value)}
                                                                        placeholder={field.placeholder}
                                                                        >
                                                                            {field.options.map((option, optIndex) => (
                                                                                <option key={optIndex} value={option}>
                                                                                    {option}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    ) : (
                                                                        <input
                                                                        type={field.type}
                                value={bill.fields[field.name] || ''}
                                onChange={(e) => handleFieldChange(index, field.name, e.target.value)}
                                placeholder={field.placeholder}
                                                                        />
                                                                    )}
                                                                    units
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {/* <div className="bill-actions">
                                                            <button
                                                                type="button"
                                                                className="delete-button"
                                                                onClick={() => deleteBills(index)}
                                                            >
                                                                <CgClose/>
                                                            </button>
                                                        </div> */}
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Please select an address to fill in the bill details.</p>
                                            )}
                                            </div>


                                        </div>

                                    ) : (
                                        section.fields.map((field, index) => (
                                            <div key={index} className="fields-container">
                                                <label htmlFor={field.placeholder}>{field.placeholder}</label>
                                                <div className="input-fields">
                                                    {field.icon && iconComponents[field.icon]}
                                                    {field.type === "select" ? (
                                                        <select {...register(field.name, field.validation)}>
                                                            {field.options.map((option, optIndex) => (
                                                                <option key={optIndex} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            placeholder={field.placeholder}
                                                            {...register(field.name, field.validation)}
                                                        />
                                                    )}
                                                    {errors?.[field.name] && (
                                                        <span className='error-note'>
                                                            *{field.placeholder}* is mandatory
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="form-section">
                            <h2>Review Your Details</h2>
                            <div className='review-section'>
                            <div className='review-card'>
                                    <h3>Personal Details</h3>
                                    <div className='review-content'>
                                        {formConfig.sections[0].fields.map((field, index) => (
                                            <div className='review-item' key={field.name || index}>
                                                <h3>{field.placeholder}:</h3>
                                                {field.type === 'file' ? (
                                                    personalDetails[field.name]?.[0] ? (
                                                        <>
                                                            <img
                                                                src={URL.createObjectURL(personalDetails[field.name][0])}
                                                                alt={field.placeholder || "File Preview"}
                                                                style={{ width: '200px', height: 'auto', objectFit: 'cover', borderRadius: '10px' }}
                                                            />
                                                            <div>{personalDetails[field.name][0].name}</div>
                                                        </>
                                                    ) : (
                                                        <p>No file selected</p>
                                                    )
                                                ) : (
                                                    <p>{personalDetails[field.name] || 'Not Provided'}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
           
                
                                <div className='review-card'>
                                    <h3>Address and Property Details</h3>
                                    {formData?.customerAddresses?.map((address, addressIndex) => (
                                        <>
                                            <h3>{addressIndex}.</h3>
                                        <div key={addressIndex} className='review-content'>
                                            {formConfig.sections[1].fields.map((field, fieldIndex) => (
                                                <div key={field.name || `${addressIndex}-${fieldIndex}`} className="review-item">
                                                    <strong>{field.placeholder}:</strong>
                                                    <p>
                                                        {field.type === 'checkbox' ?
                                                            (address[field.name] ? 'Yes' : 'No')
                                                            : address[field.name] || 'Not Provided'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        </>
                                    ))}
                                </div>
                                <div className='review-card'>
                                    <h3>Bill Details</h3>
                                    {bills?.map((phone, phoneIndex) => (
                                        <>
                                         {/* <h3>{phoneIndex}</h3> */}
                                         <h4>Meter ID : {phone.meterId}</h4>
                                         <h4>Address : {phone.address1}</h4>
                                        <div key={phoneIndex} className='review-content'>
                                            {formConfig.sections[2].fields.map((field, fieldIndex) => (
                                                <div key={field.name || `${phoneIndex}-${fieldIndex}`} className="review-item">
                                                    <strong>{field.placeholder}:</strong>
                                                    <p>
                                                        {field.type === 'checkbox' ?
                                                            (phone.fields[field.name] ? 'Yes' : 'No')
                                                            : phone.fields[field.name] || 'Not Provided'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        </>
                                    ))}
                                </div>

                            </div>

                            <div className="button-container">
                                <button type="button" className="submit-button" onClick={handleEdit}>Edit</button>
                                <button type="submit" className="submit-button">Submit</button>
                            </div>
                        </div>

                    )}
                    {/* {currentStep === 1 && <button type="button" className='prev-button' onClick={addMoreAddress}>Add More Address</button>} */}
                    <div className='button-container'>
                        {currentStep > 0 && <button type="button" className='submit-button' onClick={handlePrevious}>Prev</button>}
                        {currentStep < formConfig.sections.length && <button type="button" className='submit-button' onClick={handleNext}>Next</button>}
                        {/* {currentStep === formConfig.sections.length && <button type="submit">Submit</button>} */}
                        {/* {currentStep < formConfig.sections.length && <button type="button" onClick={handleEdit}>Edit</button>} */}
                        {currentStep === 1 && <button type="button" className='prev-button' onClick={addMoreAddress}>Add More Address</button>}
                        {/* {currentStep === 2 && <button type="button" className='submit-button' onClick={addMoreBills}>Add More Bills</button>} */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
