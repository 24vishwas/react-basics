import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import "./Login.css";

const formConfig = {
  fields: [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      validation: { required: true }
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      validation: { required: true }
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

  return (
    <div className="login-page">
      <p className="title">Login Form</p>
      
      <NavLink className="button" to="/Register">Register here</NavLink>
      
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {formConfig.fields.map((field, index) => (
          <div key={index}>
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
        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>

      {submitted && ( // Only show messages after form is submitted
        login ? (
          <h1>{loggedInUser} is logged in</h1>
        ) : (
          <h2>Error no match found!</h2>
        )
      )}
    </div>
  );
}

export default Login;
