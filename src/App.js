import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SocialLogin from "./components/SocialLogin";
//import InputField from "./components/InputField";
import Login from './components/Login';
import Signup from './components/Signup';
import EnrollLib from './components/EnrollLib';
import CreateLib from './components/CreateLib';
import AssignAdmin from './components/AssignAdmin';
import Profile from './components/Profile';
import SearchBooks from './components/SearchBooks';
import AddBook from './components/AddBook';
import Request_approve_decline from './components/Request';
import GetIssueReg from './components/GetIssueReg';
import NavBar from './components/NavBar';
import LogOut from './components/LogOut';

const App = () => {
  return (
    <Router>
      <div >
        <NavBar/>
        <Routes>
          <Route path="/social-login" element={<SocialLogin />} />
          <Route path="/" element={<Login/> } />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/enroll" element={<EnrollLib/>}/>
          <Route path="/create" element={<CreateLib/>}/>
          <Route path="/assign" element={<AssignAdmin/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/books" element={<SearchBooks/>}/>
          <Route path="/addbook" element={<AddBook/>}/>
          <Route path="/request" element={<Request_approve_decline/>}/>
          <Route path="/issuereg" element={<GetIssueReg/>}/>
          <Route path="/logout" element={<LogOut/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;