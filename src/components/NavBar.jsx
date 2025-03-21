import React from 'react';
import logo from '../images/5.png';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };
  var role = localStorage.getItem('role');
  console.log(role);
  return (
    <div className="nav">
      <div className="nav-container">
        <img src={logo} alt="logo" className="logo" />
        {/* <ul className="nav-menu"> */}
        {role===null&&
                <ul className="nav-menu">   
            <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/">Login</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/signup">Signup</NavLink></li>
            </ul>
            }
            
            {role==='owner'&&
                <ul className="nav-menu">   
            <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/profile">Profile</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/request">Request</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/issuereg">IssueReg</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/assign">Assign</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/books">Books</NavLink></li>
            <li><a onClick={Logout}>LogOut</a></li>
            </ul>
            }

            {role==='admin' && <ul className="nav-menu">
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/profile">Profile</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/request">Request</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/issuereg">IssueReg</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/addbook">AddBook</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/books">Books</NavLink></li>
                <li><a onClick={Logout}>LogOut</a></li>
            </ul>}



            {role==='reader' && <ul className="nav-menu">
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/profile">Profile</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/request">Request</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/issuereg">IssueReg</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/books">Books</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/enroll">Enroll</NavLink></li>
                <li><a onClick={Logout}>LogOut</a></li>
            </ul>}



            {role==='user' && <ul className="nav-menu">
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/enroll">Enroll</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/create">Create</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/profile">Profile</NavLink></li>
            </ul>}
        
          {/* <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/request">Request</NavLink></li>
          <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/issuereg">IssueReg</NavLink></li> */}
          
          
        {/* </ul> */}
      </div>
    </div>
  );
}

export default NavBar;