import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaQuestionCircle, FaAddressCard, FaCalendarDay } from 'react-icons/fa';

import { createUser } from '../../api/user';

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
            ],
        },
    ],
};

const Register = () => {
    const { register, handleSubmit, control, formState: { errors, isValid }, trigger, getValues } = useForm({ mode: 'onChange' });
    const [currentStep, setCurrentStep] = useState(0);
    const [personalData, setPersonalData] = useState({});
    const { fields: addressFields, append, remove } = useFieldArray({
        control,
        name: "customerAddresses",
    });

    const onSubmit = async (data) => {
        setPersonalData(data.personalDetails);
        localStorage.setItem("formData", JSON.stringify(data));
        console.log(data);

        try {
            const response = await createUser(data);
            console.log('User created successfully:', response);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleNext = async () => {
        // Validate the current section
        const currentSection = formConfig.sections[currentStep].fields.map(field => field.name);
        const valid = await trigger(currentSection);

        if (valid) {
            if (currentStep === 0 && addressFields.length === 0) {
                // Ensure at least one address is present
                append({});
            }
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const addMoreAddress = () => {
        append({});
    };

    const deleteAddress = (index) => {
        remove(index);
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
                <p>Please fill all your details and click on register - sample help text</p>
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    {formConfig.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={`form-section ${currentStep === sectionIndex ? '' : 'hidden'}`}>
                            <h3>{section.title}</h3>
                            <div className='form-section-wrapper'>
                                {sectionIndex === 1 ? (
                                    // Handle Customer Address with Add/Delete functionality
                                    addressFields.map((item, index) => (
                                        <div key={item.id} className="address-section">
                                            {section.fields.map((field, fieldIndex) => (
                                                <div key={fieldIndex} className="fields-container">
                                                    <label htmlFor={field.placeholder}>{field.placeholder}</label>
                                                    <div className="input-fields">
                                                        {field.icon && iconComponents[field.icon]}
                                                        {field.type === "select" ? (
                                                            <select {...register(`customerAddresses.${index}.${field.name}`, field.validation)}>
                                                                {field.options.map((option, optIndex) => (
                                                                    <option key={optIndex} value={option}>{option}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <input
                                                                type={field.type}
                                                                placeholder={field.placeholder}
                                                                {...register(`customerAddresses.${index}.${field.name}`, field.validation)}
                                                            />
                                                        )}
                                                        {errors?.customerAddresses?.[index]?.[field.name] && (
                                                            <span className='error-note'>*{field.placeholder}* is mandatory</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            <div className='button-container'>
                                                <button type="button" className="delete-button" onClick={() => deleteAddress(index)}>Delete</button>
                                                {sectionIndex === 1 && (
                                    <button type="button" className="next-button" onClick={addMoreAddress}>Add More</button>
                                )}
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
                                                            <option key={optIndex} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        {...register(field.name, field.validation)}
                                                    />
                                                )}
                                                {errors[field.name] && (
                                                    <span className='error-note'>*{field.placeholder}* is mandatory</span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                               
                            </div>
                        </div>
                    ))}

                    <div className="form-navigation button-container">
                        {currentStep > 0 && (
                            <button type="button" className="submit-button" onClick={handlePrevious}>
                                Previous
                            </button>
                        )}
                        {currentStep < formConfig.sections.length - 1 ? (
                            <button type="button" className="submit-button" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        )}
                    </div>
                </form>
                <p>Already have an account?</p>
                <p><NavLink className='login-link' to='/login'>Login</NavLink></p>
            </div>
        </div>
    );
};

export default Register;
