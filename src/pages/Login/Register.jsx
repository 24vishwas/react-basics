import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
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
                { name: "phone", type: "tel", placeholder: "Phone", validation: { required: true }, icon: "FaPhone" },
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
                { name: "primary", type: "checkbox", placeholder: "Mark as Primary", validation: { required: true } },
            ],
        },
        {
            title: "Customer Phone Details",
            fields: [
                { name: "meterId", type: "text", placeholder: "Meter Id", validation: { required: true }, icon: "FaLock" },
                { name: "isResBus", type: "select", placeholder: "Is Res Bus", options: ["R-Res", "B-small Business", "C-Commerce"], validation: { required: true }, icon: "FaQuestionCircle" },
                { name: "tdsp", type: "text", placeholder: "TDSP", validation: { required: true }, icon: "FaLock" },
                { name: "address1", type: "text", placeholder: "Address 1", validation: { required: true }, icon: "FaAddressCard" },
                
            ],
        },
    ],
};

const Register = () => {
    const { register, handleSubmit, control, watch, formState: { errors, isValid }, trigger, getValues, setValue } = useForm({ mode: 'onChange' });
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(null);
    const { fields: addressFields, append, remove } = useFieldArray({
        control,
        name: "customerAddresses",
    });
    const [primaryAddress, setPrimaryAddress] = useState(null);

    const onSubmit = async (data) => {

        const updatedData = { ...data, customerAddresses: data.customerAddresses.map((address, index) => ({
            ...address,
            primary: index === primaryAddress, // Ensure only one primary address
        })) };

        localStorage.setItem("formData", JSON.stringify(data));
        console.log(data);
    };

    const handleNext = async () => {
        const currentSection = formConfig.sections[currentStep].fields.map(field => field.name);
        const valid = await trigger([...currentSection, `customerAddresses`]);

        if (valid) {
            if (currentStep === 0 && addressFields.length === 0) {
                // Optionally append a default address here
            }
            if (currentStep === formConfig.sections.length - 1) {
                setFormData(getValues());
                setCurrentStep(prevStep => prevStep + 1);
            } else {
                setCurrentStep(prevStep => prevStep + 1);
            }
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prevStep => prevStep - 1);
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
                                            <div key={item.id} className='customer-section-wrapper'>
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
                            <div>
                                <h3>Personal Details</h3>
                                <div className='review-content'>
                                    {formConfig.sections[0].fields.map((field, index) => (
                                        <div className='review-item' key={field.name || index}>
                                            <h3>{field.placeholder}:</h3>
                                            {field.type === 'file' ? (
                                                formData?.[field.name]?.[0] ? (
                                                    <>
                                                        <img
                                                            src={URL.createObjectURL(formData[field.name][0])}
                                                            alt={field.placeholder || "File Preview"}
                                                            style={{ width: '200px', height: 'auto', objectFit: 'cover', borderRadius: '10px' }}
                                                        />
                                                        <div>{formData[field.name][0].name}</div>
                                                    </>
                                                ) : (
                                                    <p>No file selected</p>
                                                )
                                            ) : (
                                                <p>{formData?.[field.name] || 'Not Provided'}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3>Address and Property Details</h3>
                                {formData?.customerAddresses?.map((address, addressIndex) => (
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
                                ))}
                            </div>
                        </div>
                        <div className="button-container">
                            <button type="button" className="submit-button" onClick={handleEdit}>Edit</button>
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </div>
                    
                    )}
                    <div className='button-container'>
                        {currentStep > 0 && <button type="button" className='submit-button' onClick={handlePrevious}>Prev</button>}
                        {currentStep < formConfig.sections.length && <button type="button" onClick={handleNext}>Next</button>}
                        {/* {currentStep === formConfig.sections.length && <button type="submit">Submit</button>} */}
                        {/* {currentStep < formConfig.sections.length && <button type="button" onClick={handleEdit}>Edit</button>} */}
                        {currentStep === 1 && <button type="button" onClick={addMoreAddress}>Add More Address</button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
