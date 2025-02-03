import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    graduationYear: '',
    type1: '',
    gender: '',
    currentposition: '',
    company: '',
    about: '', // Add About field
  });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/aut/Signup', formData);
      alert('Signup successful!');
      //navigate('/Login');
      navigate('/ProfilePage');
    } catch (err) {
      console.error(err);
      alert('Error during signup');
    }
  };

  return (
    <div className="signup-con">
         <div className="cardsignup">
    <form onSubmit={handleSubmit}>
   
      <h2>Signup Form</h2>
      <label htmlFor="name">Full Name</label>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <label htmlFor="email">Email</label>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <label htmlFor="graduationYear">Graduation Year</label>
      <input name="graduationYear" placeholder="Graduation Year" onChange={handleChange} required />
      <label htmlFor="usertype">User Type</label>
      <select name="type1" onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="admin">admin</option>
        <option value="student">Student</option>
        <option value="alumni">Alumni</option>
      </select>
      <label htmlFor="gender">Gender</label>
      <input name="gender" placeholder="Gender" onChange={handleChange} required />
      <label htmlFor="currentposition">Current Position</label>
      <input name="currentposition" placeholder="Enter your position" onChange={handleChange} required />
      <label htmlFor="company">Company</label>
      <input name="company" placeholder="Company" onChange={handleChange} required />
      <label htmlFor="about">About</label>
      <textarea 
        name="about" 
        placeholder="Tell us about yourself..." 
        onChange={handleChange} 
        rows="4" 
        required 
      />
      <button type="submit">Signup</button>
   </form></div> </div>
  );
};

export default Signup;
