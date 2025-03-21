import React from 'react';
import { useState } from "react";
import vis from '../eye.png'
import invis from '../invisible.png'
//import logo from "../logo.svg"
const InputField = ({ type, placeholder, icon,name ,val,}) => {
  const validates = (val) => {
    let temperr={};
    //event.preventDefault();
   // const password = event.target.elements.password.value;
   // const contactNum = event.target.elements.contactNum.value;
    //formData.name='ayush'
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const contactNumRegex = /^\d{10}$/;
    if (!contactNumRegex.test(val.contactNum)) {
      temperr.contactNum='Contact number must be exactly 10 digits.'
    }
    if (!passwordRegex.test(val.password)) {
      temperr.password='Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    }
    return temperr;
  };
 

const [f ,setF]=useState({ 
    email: "",
    password: "",
    name:"",
    contactNum:""
  });
  const [errors, setErrors] = useState({});

  const handleChange =(e)=>{
    // e.preventDefault();
    //const {name,value} = e.target
    setF({
      ...f,
      [e.target.name]:e.target.value
    });
    console.log(f)
   }
  // State to toggle password visibility
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? 'text' : type}
        placeholder={placeholder}
        className="input-field"
        value={val}
        name={name}
        onChange={handleChange}
        required
      />
      <i className="material-symbols-rounded">{<img src={icon}/>}</i>
      {type === 'password' && (
        <i onClick={() => setIsPasswordShown(prevState => !prevState)} className="material-symbols-rounded eye-icon">
          {isPasswordShown ? <img src={vis} className='pas-img'/> : <img src={invis} className='pas-img'/>}
        </i>
      )}
    </div>
  )
}
export default InputField;