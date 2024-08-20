import React, { useState } from 'react';
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
    const { register, handleSubmit, control, formState: { errors, isValid }, trigger, getValues, setValue } = useForm({ mode: 'onChange' });
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(null);  // Holds the form data
    const { fields: addressFields, append, remove } = useFieldArray({
        control,
        name: "customerAddresses",
    });

    const onSubmit = async (data) => {
        // setFormData(data);  // Save data for final review
        // Optionally, store data temporarily
        console.log(formData);
        localStorage.setItem("formData", JSON.stringify(data));
        console.log(JSON.parse(localStorage.getItem("formData")));
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
            if (currentStep === formConfig.sections.length - 1) {
                // Final Review step
                setFormData(getValues());
                setCurrentStep(prevStep => prevStep + 1);
            } else {
                setCurrentStep(prevStep => prevStep + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep === formConfig.sections.length) {
            setCurrentStep(prevStep => prevStep - 1);
        } else {
            setCurrentStep(prevStep => prevStep - 1);
        }
    };

    const handleEdit = () => {
        setCurrentStep(0);  // Go back to the first step for editing
    };

    const addMoreAddress = () => {
        append({});
    };

    const deleteAddress = (index) => {
        if (confirm('Please confirm the delete')) {

            remove(index);
        }

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
                    {currentStep < formConfig.sections.length ? (
                        formConfig.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className={`form-section ${currentStep === sectionIndex ? '' : 'hidden'}`}>
                                <h3>{section.title}</h3>
                                <div className='form-section-wrapper'>
                                    {sectionIndex === 1 ? (
                                        // Handle Customer Address with Add/Delete functionality



                                        addressFields.map((item, index) => (
                                            <div className='customer-section-wrapper'>
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

                                                </div>
                                                <button type="button" className="delete-button" onClick={() => deleteAddress(index)}><CgClose /></button>
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
                                {sectionIndex === 1 && (
                                    <button type="button" className="next-button" onClick={addMoreAddress}>Add More</button>
                                )}
                            </div>

                        ))
                    ) : (
                        // Final Review Section

                        <div className="form-section">
                            <h2>Review Your Details</h2>
                            <div className='review-section'>
                                <div>
                                    <h3>Personal Details</h3>
                                    <div className='review-content'>
                                        {formConfig.sections[0].fields.map((field, index) => (
                                            <div className='review-item' key={field.name || index}> {/* Ensure unique key */}
                                                <h3>{field.placeholder} : </h3>

                                                {field.type === 'file' ? (
                                                    formData?.[field.name]?.[0] ? (
                                                        <>
                                                            <img
                                                                src={URL.createObjectURL(formData[field.name][0])}
                                                                alt="Profile Preview"
                                                                style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                                                            />
                                                            <div>{formData[field.name][0].name}</div>
                                                        </>
                                                    ) : (
                                                        'No file selected'
                                                    )
                                                ) : (
                                                    <p>{formData?.[field.name] || 'N/A'}</p>
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
                                                    <strong>{field.placeholder}:</strong> <br />
                                                    <p>{address[field.name] || 'N/A'}</p>
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

                    <div className="form-navigation button-container">
                        {currentStep > 0 && (
                            <button type="button" className="submit-button" onClick={handlePrevious}>
                                Previous
                            </button>
                        )}
                        {currentStep < formConfig.sections.length ? (
                            <button type="button" className="submit-button" onClick={handleNext}>
                                Next
                            </button>
                        ) : null}
                    </div>
                </form>
                <p>Already have an account?</p>
                <p><NavLink className='login-link' to='/login'>Login</NavLink></p>
            </div>
        </div>
    );
};

export default Register;
