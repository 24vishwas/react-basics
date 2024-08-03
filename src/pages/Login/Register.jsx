import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Login.css';

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

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submit, setSubmit] = useState(false);

  const onSubmit = (data) => {
    localStorage.setItem(data.name, JSON.stringify({
      name: data.name, password: data.password
    }));
    console.log(JSON.parse(localStorage.getItem(data.name)));
    setSubmit(true);
  };

  return (
    <div className='login-page'>
      <p className="title">Register Form</p>

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

      {submit && <h1>Registered</h1>}
    </div>
  );
}

export default Register;
