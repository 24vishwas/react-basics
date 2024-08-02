import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import './Login.css';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [submit ,setSubmit] = useState(false);

  const onSubmit = (data) => {
    localStorage.setItem(data.name, JSON.stringify({ 
        name: data.name, password: data.password 
    }));
    console.log(JSON.parse(localStorage.getItem(data.name)));
    setSubmit('true')
  };
  console.log(watch("name"));

  return (
    <div className='login-page'>
      <p className="title">Register Form</p>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Name' {...register("name", { required: true })} required />
        {errors.name && <span style={{ color: "red" }}>*Name* is mandatory</span>}
        
        <input type="password" placeholder='Password' {...register("password", { required: true })} required />
        {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}
        
        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
      {
        submit ? ( <h1>Registered</h1> ) : ( <h1></h1> )
      }
    </div>
  );
}

export default Register;
