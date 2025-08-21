import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', userType: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock validation
    if (credentials.userType === 'admin') {
      alert('Login successful! Redirecting to event form...');
      navigate('/event'); // Redirect to event form
    } else {
      alert('Only admins are allowed to add events!');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <select name="userType" value={credentials.userType} onChange={handleChange} required>
          <option value="">Select User Type</option>
          <option value="admin">admin</option>
          <option value="student">student</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
