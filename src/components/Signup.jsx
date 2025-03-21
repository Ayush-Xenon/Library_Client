import React, { useState, useEffect } from "react";
import vis from "../eye.png";
import invis from "../invisible.png";
import axios from 'axios';
function Signup() {
  const [f, setF] = useState({
    email: "",
    password: "",
    name: "",
    contactNum: "",
    confirmP:""
  });
  const handleChange = (e) => {
    setF({
      ...f,
      [e.target.name]: e.target.value,
    });
    //console.log(f);
  };
  const [errors, setErrors] = useState({
    chk:""
  });
  //const [submitting, setSubmitting] = useState(false);
  const validates = (val) => {
    let temperr = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const contactNumRegex = /^\d{10}$/;
    if (!contactNumRegex.test(val.contactNum)) {
      temperr.contactNum = "Invalid contact";
    }
    if (!passwordRegex.test(val.password)) {
      temperr.password =
        "Weak Password";
    }
    if(val.password != val.confirmP){
      temperr.cpassword="Password doesn't match"
    }
    return temperr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(f);
    const temperr = validates(f);
    setErrors(temperr);
    console.log(errors);
    //setSubmitting(true);
  };
  const finishSubmit = () => {
    console.log(f);
    var url = "http://localhost:8081/signup"
    axios.post(url, {
        "email": f.email,
        "password":f.password,
        "ContactNumber":f.contactNum,
        "Name":f.name
    }).then((response)=>console.log(response))
    .catch((err)=>console.log(err));
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      finishSubmit(f);
    }
  }, [errors]);

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  return (
    <div className="log">
      <div className="login-container">
        <h2 className="form-title">SignUp</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder={"Enter Name"}
              className="input-field"
              onChange={handleChange}
              required
              name="name"
            />
            <i className="material-symbols-rounded">{<img src={"dfd"} />}</i>
          </div>

          <div className="input-wrapper">
            <input
              type="email"
              placeholder={"Enter Email"}
              className="input-field"
              onChange={handleChange}
              name="email"
              required
            />

            <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder={"Enter Contact Num"}
              className="input-field"
              onChange={handleChange}
              name="contactNum"
              required
            />
            <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
            {errors.contactNum ? (
              <p className="error" style={{color:"red"}}>
                {errors.contactNum}
              </p>
            ) : null}
          </div>
          <div className="input-wrapper">
            <input
              type={isPasswordShown ? "text" : "password"}
              placeholder={"Enter Password"}
              className="input-field"
              onChange={handleChange}
              name="password"
              required
            />
            <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
            <i
              onClick={() => setIsPasswordShown((prevState) => !prevState)}
              className="material-symbols-rounded eye-icon"
            >
              {isPasswordShown ? (
                <img src={vis} className="pas-img" />
              ) : (
                <img src={invis} className="pas-img" />
              )}
            </i>
            {errors.password ? (
              <p className="error" style={{color:"red"}}>
                {errors.password}
              </p>
            ) : null}
          </div>
          <div className="input-wrapper">
            <input
              type={isPasswordShown ? "text" : "password"}
              placeholder={"Confirm Password"}
              className="input-field"
              onChange={handleChange}
              name="confirmP"
              required
            />
            <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
            <i
              onClick={() => setIsPasswordShown((prevState) => !prevState)}
              className="material-symbols-rounded eye-icon"
            >
              {isPasswordShown ? (
                <img src={vis} className="pas-img" />
              ) : (
                <img src={invis} className="pas-img" />
              )}
            </i>
            {errors.cpassword ? (
              <p className="error" style={{color:"red"}}>
                {errors.cpassword}
              </p>
            ) : null}
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
        <p className="signup-prompt">
        Already have an account? <a href="/" className="signup-link">Log In</a>
      </p>
      </div>
     
    </div>
  );
}

export default Signup;
