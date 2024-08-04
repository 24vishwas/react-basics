import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import bgimg from '../../assets/login-bg.jpg'
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa'; // Import the required icons
import "./Login.css";

const formConfig = {
  fields: [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      validation: { required: true },
      icon: "FaUser"
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      validation: { required: true },
      icon: "FaLock"
    }
  ]
};

function Login() {
  const [login, setLogin] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.name));
    if (userData) {
      if (userData.password === data.password) {
        console.log(userData.name + " You Are Successfully Logged In");
        setLogin(true);
        setLoggedInUser(userData.name);
      } else {
        console.log("Email or Password is not matching with our record");
        setLogin(false);
        setLoggedInUser("");
      }
    } else {
      console.log("Email or Password is not matching with our record");
      setLogin(false);
      setLoggedInUser("");
    }
    setSubmitted(true); // Set submitted to true when the form is submitted
  };

  const iconComponents = {
    FaUser: <FaUser />,
    FaLock: <FaLock />
  };

  return (
    <div>
      
     
    <div className="login-page">
      <div className="login-content">
        <h1>Logo</h1>
        {submitted && ( // Only show messages after form is submitted
          login ? (
            <p className="msg">{loggedInUser} is logged in  </p>
          ) : (
            <p className="msg">Error no match found!</p>
          )
        )}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {formConfig.fields.map((field, index) => (
            <div key={index} className="input-container">
              {field.icon && iconComponents[field.icon]}
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, field.validation)}
              />
              {errors[field.name] && <span style={{ color: "red" }}>
                *{field.placeholder}* is mandatory
              </span>}
            </div>
          ))}
          <button type="submit" className="submit-button"> <FaSignInAlt />LOGIN</button>
        </form>
        <p>Forgot password?</p>
        <p>Dont have an account ? <NavLink className='register-link' to="/Register">Register here</NavLink> </p>
        
      
      </div>
      <div className="img-container">
        <img src={bgimg} alt="background" />
      </div>
    </div>
    </div>
  );
}

export default Login;
