import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/navbar.css";
import logo from "../asset/logo.png";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-band">
        <img src={logo} alt="logo" className="logo"/>
      <h2>Student Management System</h2>
      </div>
      <div>
        <Link to="/students" className="nav-link">Students</Link>
        <Link to="/add-student" className="nav-link">Add Student</Link>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;