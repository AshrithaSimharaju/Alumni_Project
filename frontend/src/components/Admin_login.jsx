import React, { useState } from 'react';
import './Login.css';

const Admin_login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type1] = useState('admin'); // Fixed to admin
  const [error, setError] = useState('');

  const handleLogin = async (email, password, type1) => {
    try {
      console.log('Sending data:', { email, password, type1 });
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, type1 }),
      });

      if (response.ok) {
        const data = await response.json();

        const user = {
          _id: data._id,
          fullName: data.fullName,
          email: data.email,
          type1: data.type1,
          profilePicture: data.profilePicture,
        };
        localStorage.setItem('admin', JSON.stringify(user));
        console.log("Admin logged in:", user);

        window.location.href = '/admin/dashboard';
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, type1);
  };

  return (
    <div className="loginpage-con">
      <h2>Admin Login</h2>
      <div className="logincard">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Admin_login;
