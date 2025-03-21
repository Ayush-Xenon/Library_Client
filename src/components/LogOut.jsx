import React from 'react'
import { useNavigate } from 'react-router-dom'
function LogOut() {
    const navigate = useNavigate();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    var l=localStorage.getItem('role')
    console.log("fvfdvf",l)
    navigate('/')
  return (
    <div>
        
        
    </div>
  )
}

export default LogOut