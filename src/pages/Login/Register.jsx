import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import bgimg from '../../assets/login-bg.jpg';
import { FaUser, FaLock, FaSignInAlt, FaEnvelope, FaPhone, FaQuestionCircle, FaHome } from 'react-icons/fa';

import './Register.css';

const formConfig = {
    fields: [
        {
            section: "Personal Details",
            fields: [
                { name: "firstName", type: "text", placeholder: "First Name", validation: { required: true }, icon: "FaUser" },
                { name: "lastName", type: "text", placeholder: "Last Name", validation: { required: true }, icon: "FaUser" },
                { name: "dob", type: "date", placeholder: "Date of Birth", validation: { required: true } },
                { name: "address", type: "text", placeholder: "Address", validation: { required: true } },
                { name: "phone", type: "tel", placeholder: "Phone", validation: { required: true }, icon: "FaPhone" },
            ],
        },
        {
            section: "Account Details",
            fields: [
                { name: "email", type: "email", placeholder: "Email", validation: { required: true }, icon: "FaEnvelope" },
                { name: "password", type: "password", placeholder: "Password", validation: { required: true }, icon: "FaLock" },
                { name: "confirmPassword", type: "password", placeholder: "Confirm Password", validation: { required: true }, icon: "FaLock" },
                { name: "securityQuestion1", type: "select", placeholder: "Security Question 1",options: ["Apartment", "Villa", "Townhouse"], validation: { required: true }, icon: "FaQuestionCircle" },
                { name: "answer1", type: "text", placeholder: "Answer for Question 1", validation: { required: true }, icon: "FaQuestionCircle" },
                { name: "securityQuestion2", type:  "select", placeholder: "Security Question 2",options: ["Apartment", "Villa", "Townhouse"], validation: { required: true }, icon: "FaQuestionCircle" },
                { name: "answer2", type: "text", placeholder: "Answer for Question 2", validation: { required: true }, icon: "FaQuestionCircle" },
            ],
        },
        {
            section: "Property Details",
            fields: [
                { name: "swimmingPool", type: "select", placeholder: "Swimming Pool", options: ["yes", "No"] },
                { name: "houseType", type: "select", placeholder: "House Type", options: ["Apartment", "Villa", "Townhouse"] },
                { name: "numRooms", type: "number", placeholder: "Number of Rooms", validation: { required: true } },
                { name: "numEVs", type: "text", placeholder: "Number of EVs", validation: { required: true } },
            ],
        },
    ],
};

const Register = () => {
    const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({ mode: 'onChange' });
    const [submit, setSubmit] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const onSubmit = (data) => {
        localStorage.setItem(data.firstName, JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            address: data.address,
            phone: data.phone,
            email: data.email,
            password: data.password,
            securityQuestion1: data.securityQuestion1,
            securityQuestion2: data.securityQuestion2,
            swimmingPool: data.swimmingPool,
            houseType: data.houseType,
            numRooms: data.numRooms,
            numEVs: data.numEVs,
        }));
        console.log(JSON.parse(localStorage.getItem(data.firstName)));
        setSubmit(true);
    };

    // const handleNext = async () => {
    //     const valid = await trigger(); // Triggers validation for the current section
    //     if (valid) {
    //         setCurrentSection(currentSection + 1);
    //     }
    // };
    const handleNext = async () => {
        const currentFields = formConfig.fields[currentStep].fields.map(field => field.name);
        const valid = await trigger(currentFields);
        
        if (valid) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    // const handlePrevious = () => {
    //     setCurrentSection(currentSection - 1);
    // };
    const handlePrevious = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const iconComponents = {
        FaUser: <FaUser />,
        FaLock: <FaLock />,
        FaEnvelope: <FaEnvelope />,
        FaPhone: <FaPhone />,
        FaQuestionCircle: <FaQuestionCircle />,
        FaHome: <FaHome />,
    };

    return (
    //     <div className='register-page'>
    //     <div className='register-content'>
    //         <h1>Customer Registration</h1>
    //         <p>Please fill in your details and click on register - sample help text</p>
    //         {submit && <p>Registered</p>}
    //         <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
    //             {formConfig.sections.map((section, sectionIndex) => (
    //                 sectionIndex === currentSection && (
    //                     <div key={sectionIndex} className="form-section">
    //                         <h3>{section.section}</h3>
    //                         <div className='form-section-wrapper'>
    //                             {section.fields.map((field, index) => (
    //                                 <div key={index} className="fields-container">
    //                                     <label htmlFor={field.placeholder}>{field.placeholder}</label>
    //                                     <div className="input-fields">
    //                                         {field.icon && iconComponents[field.icon]}
    //                                         {field.type === "select" ? (
    //                                             <select {...register(field.name, field.validation)}>
    //                                                 {field.options.map((option, optIndex) => (
    //                                                     <option key={optIndex} value={option}>{option}</option>
    //                                                 ))}
    //                                             </select>
    //                                         ) : field.type === "checkbox" ? (
    //                                             <label>
    //                                                 <input type="checkbox" {...register(field.name)} />
    //                                                 {field.placeholder}
    //                                             </label>
    //                                         ) : (
    //                                             <input
    //                                                 type={field.type}
    //                                                 placeholder={field.placeholder}
    //                                                 {...register(field.name, field.validation)}
    //                                             />
    //                                         )}
    //                                         {errors[field.name] && <span className='error-note'>
    //                                             *{field.placeholder}* is mandatory
    //                                         </span>}
    //                                     </div>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     </div>
    //                 )
    //             ))}
    //             <div className='button-container'>
    //                 {currentSection > 0 && (
    //                     <button type="button" className="submit-button prev-button" onClick={handlePrevious}>
    //                         Previous
    //                     </button>
    //                 )}
    //                 {currentSection < formConfig.sections.length - 1 ? (
    //                     <button type="button" className="submit-button next-button" onClick={handleNext} disabled={!isValid}>
    //                         Next
    //                     </button>
    //                 ) : (
    //                     <button type="submit" className="submit-button">
    //                         <FaSignInAlt /> Register
    //                     </button>
    //                 )}
    //             </div>
    //         </form>
    //         <p>Already have an account?</p>
    //         <p><NavLink className='register-link' to="/Login">Login here</NavLink></p>
    //     </div>
    // </div>
    <div className='register-page'>
    <div className='register-content'>
        <h1>Customer Registration</h1>
        <p>Please fill all your details and click on register - sample help text</p>
        {submit && <p>Registered</p>}
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            {formConfig.fields.map((section, sectionIndex) => (
                <div key={sectionIndex} className={`form-section ${currentStep === sectionIndex ? '' : 'hidden'}`}>
                    <h3>{section.section}</h3>
                    <div className='form-section-wrapper'>
                        {section.fields.map((field, index) => (
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
                                    {errors[field.name] && <span className='error-note'>
                                        *{field.placeholder}* is mandatory
                                    </span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className='button-container'>
                {currentStep > 0 && <button type="button" className="submit-button" onClick={handlePrevious}>Previous</button>}
                {currentStep < formConfig.fields.length - 1 ? (
                    <button type="button" className="submit-button" onClick={handleNext}>Next</button>
                ) : (
                    <button type="submit" className="submit-button"> <FaSignInAlt /> Register</button>
                )}
            </div>
        </form>
        <p>Already have an account?</p>
        <p><NavLink className='register-link' to="/Login">Login here</NavLink></p>
    </div>
</div>
    );
};

export default Register;
