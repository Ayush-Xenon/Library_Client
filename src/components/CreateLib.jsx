import React, { useState, useEffect ,createContext} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function CreateLib() {
  const [query, setQuery] = useState('');
  const [ans, setAns] = useState('');
  const token = localStorage.getItem('token');
  const navigate=useNavigate()
        const handleSubmit = async(e) => {
            e.preventDefault();
            try {
              const res= await axios.post(`http://localhost:8081/auth/library/create`, {
                  "Name":query
              },{
                  headers:{'Authorization': `Bearer ${token}`,}
              });
              setAns(res.data.data)
              console.log(res.data.data)
              localStorage.setItem('role','owner')
              navigate('/assign')
          } catch (error) {
            if(error.response.data.error ==="You are not authorized to perform this action , owner cannot be a reader or admin"){
              setAns("User can own only one library")  
              // console.log("dnjklcv")
            }
            else if(error.response.data.error ==="You are not authorized to perform this action , admin cannot be a reader or owner"){
              setAns("Admin cannot own library")  
              // console.log("Admins cannot own library")
            }
            else{

              setAns(error.response.data.error);
              console.log(error.response.data.error)
            }
          }
          };



    return (
        <div className="log">
          <div className="login-container">
            <h2 className="form-title">Create Library</h2>
            <form onSubmit={handleSubmit} className="login-form">
              
    
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder={"Enter Library Name"}
                  className="input-field"
                  onChange={(e)=>setQuery(e.target.value)}
                  name="lib_name"
                  required
                />
                <h4>{ans}</h4>
              <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
              </div>
              
              <button type="submit" className="login-button">
                Create
              </button>
            </form>
          </div>
          
        </div>
      );
}

export default CreateLib