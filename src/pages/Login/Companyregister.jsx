import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import bgimg from '../../assets/login-bg.jpg';
import { FaUser, FaLock, FaSignInAlt, FaEnvelope, FaPhone, FaQuestionCircle, FaHome } from 'react-icons/fa';

import './Register.css';

const formConfig = {
    fields: [
        {
            section: "Company Details",
            fields: [
                { name: "companyName", type: "text", placeholder: "Enter Company Name", label:'Company', validation: { required: true }, icon: "FaUser" },
                { name: "address1", type: "text", placeholder: "Enter Address 1", label:'Address 1', validation: { required: true } },
                { name: "address2", type: "text", placeholder: "Enter Address 2", label:'Address 2', validation: { required: true } },
            ],
        },
        {
            section: "Contact Person",
            fields: [
                { name: "firstName", type: "text", placeholder: "Enter First Name", label:'First Name', validation: { required: true }, icon: "FaUser" },
                { name: "middleName", type: "text", placeholder: "Enter Middle Name", label:'Middle Name', validation: { required: false }, icon: "FaUser" },
                { name: "lastName", type: "text", placeholder: "Enter Last Name", label:'Last Name', validation: { required: true }, icon: "FaUser" },
                { name: "email", type: "email", placeholder: "Enter Email", label:'Email', validation: { required: true }, icon: "FaEnvelope" },
                { name: "phone", type: "tel", placeholder: "Enter Phone", label:'Phone', validation: { required: true }, icon: "FaPhone" },
                { name: "fax", type: "tel", placeholder: "Enter Fax", label:'Fax', validation: { required: false }, icon: "FaPhone" },
            ],
        },
        // {
        //     section: "Property Details",
        //     fields: [
        //         { name: "swimmingPool", type: "select", placeholder: "Swimming Pool", options: ["yes", "No"] },
        //         { name: "houseType", type: "select", placeholder: "House Type", options: ["Apartment", "Villa", "Townhouse"] },
        //         { name: "numRooms", type: "number", placeholder: "Number of Rooms", validation: { required: true } },
        //         { name: "numEVs", type: "text", placeholder: "Number of EVs", validation: { required: true } },
        //     ],
        // },
    ],
};

const CompanyRegister = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submit, setSubmit] = useState(false);

    const onSubmit = (data) => {
        localStorage.setItem(data.companyName, JSON.stringify({
            companyName: data.companyName,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            
            address1: data.address1,
            address2: data.address2,
            phone: data.phone,
            email: data.email,
            fax: data.fax,
            
        }));
        console.log(JSON.parse(localStorage.getItem(data.companyName)));
        setSubmit(true);
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
        <div className='register-page'>
            <div className='register-content'>
                <h1>Welcome to NPS</h1>
                <p>Please fill all the Company details and click on register - sample help text</p>
                {submit && <p>Registered</p>}
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    {formConfig.fields.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="form-section">
                            <h3>{section.section}</h3>
                            <div className='form-section-wrapper'>

                            
                            {section.fields.map((field, index) => (
                                <div key={index} className="fields-container">
                                    <label htmlFor={field.name}>{field.label}</label>
                                    <div className="input-fields">
                                    {field.icon && iconComponents[field.icon]}
                                    {field.type === "select" ? (
                                        <select {...register(field.name, field.validation)} id={field.name}>
                                            {field.options.map((option, optIndex) => (
                                                <option key={optIndex} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : field.type === "checkbox" ? (
                                        <label>
                                            <input type="checkbox" {...register(field.name)} id={field.name}/>
                                            {field.placeholder}
                                        </label>
                                    ) : (
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            id={field.name}
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
                    <button type="reset" className="submit-button reset-button"> Clear</button>
                    <button type="submit" className="submit-button"> <FaSignInAlt /> Register</button>
                    </div>
                </form>
                <p>Already have an account?</p>
                <p><NavLink className='register-link' to="/Login">Login here</NavLink></p>
            </div>
           
        </div>
    );
};

export default CompanyRegister;
