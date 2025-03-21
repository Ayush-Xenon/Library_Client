import React, { useState, useEffect ,createContext} from "react";
import axios from 'axios';
import vis from "../eye.png";
import invis from "../invisible.png";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate=useNavigate()
  const [f, setF] = useState({
      email: "",
      password: ""
    });
    const handleChange = (e) => {
      setF({
        ...f,
        [e.target.name]: e.target.value,
      });
      //console.log(f);
    };

    // const AuthContext = createContext(); 

    // export const AuthProvider = ({ children }) => {
    //    const [user, setUser] = useState(null); 
    //    const [token, setToken] = useState(localStorage.getItem("jwt") || ""); 
    
    // useEffect(() => { 
    //   if (token) { 
    //     axios.defaults.headers.common["Authorization"] = Bearer ${token};
    //     fetchUser(); } }, [token]); 

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   var url = "http://localhost:8081/login"
  //   axios.post(url, {
  //       "email": f.email,
  //       "password":f.password
  //   }).then((response)=>console.log(response))
  //   .catch((err)=>console.log(err));
  //   // axios.get("http://localhost:8081/books")
  //   // .then(res => {console.log(res.data);})
  //   // .catch(err => {console.log("error",err);});
  // };
  const l=async()=>{
    var url = "http://localhost:8081/login"
    try{
      const res=await axios.post(url, {
              "email": f.email,
              "password":f.password
          });
      const access_token =res.data.token
      const access_role = res.data.role
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', access_role);
      console.log("dehkdjcnhkesjhckjdehcn")
      console.log(access_role)
      // console.log(res.data)
      navigate('/profile')

    }
    catch(error){
      console.error("Login failed:",error); 
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    l();
    // axios.get("http://localhost:8081/books")
    // .then(res => {console.log(res.data);})
    // .catch(err => {console.log("error",err);});
  };
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  // const [errors, setErrors] = useState({
  //   chk:""
  // });


  return (
    <div className="log">
      <div className="login-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          

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
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-prompt">
        Don&apos;t have an account? <a href="/signup" className="signup-link">Sign up</a>
      </p>
      </div>
    </div>
  );

}

export default Login