import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/login.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });  // Debug log
    try {
      const res = await axios.post('/api/login', { email, password });
      console.log('Login response:', res.data);  // Debug log
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      console.log('Token saved, redirecting...');  // Debug log
      navigate('/students');  // Should redirect automatically
    } catch (err) {
      console.error('Login error:', err.response?.data);  // Debug log
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;