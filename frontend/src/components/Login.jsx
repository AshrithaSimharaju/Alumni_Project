import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type1, setType1] = useState('alumni'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password, type1 });
      
      // Adjust depending on your backend: some send res.data.user, some send res.data directly
      const user = res.data.user || res.data; 

      if (!user) {
        setError('Invalid response from server');
        return;
      }

      // Store user safely in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userEmail', user.email || ''); // optional

      console.log('Login successful, stored user:', user);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(); // no need to pass params
  };

  return (
    <div className="loginpage-con">
      <div className="logincard">
        <h2 className="t-h">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>User Type:</label>
            <select 
              value={type1} 
              onChange={(e) => setType1(e.target.value)} 
              required
            >
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
