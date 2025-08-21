import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const [formData, setFormData] = useState({
    email: '',
    password:'',
    type1:'',
    fullName: '',
    location: '',
    skills: '',
    currentPosition: '',
    company: '',
    about: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:5000/api/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile created successfully!');
      setFormData({
        email: '',
        password:'',
        type1:'',
        fullName: '',
        location: '',
        skills: '',
        currentPosition: '',
        company: '',
        about: '',
        profilePicture: null,
      });

      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile.');
    }
  };

  return (
    <div className="profile-page">
      {/* <h1>Create Profile</h1> */}
      <div className="carddiv">
     
      <form className="profile-form" onSubmit={handleSubmit}>
      <h1>Create Profile</h1>
      
      
      <label>Name:</label><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
      <label>Email:</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <label>Password:</label> <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" required />
      <label>Type:</label> <select
          name="type1"
          value={formData.type1}
          onChange={handleChange}
          required
        >
       <option value="">Select a role</option>
          <option value="student">student</option>
          <option value="alumni">alumni</option>
          <option value="admin">admin</option>
        </select>
        <label>Location:</label>  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <label>Skills:</label> <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma-separated)" required />
        <label>Current_position:</label>   <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleChange} placeholder="Current Position" required />
        <label>Company</label> <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
        <label>About:</label>   <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About You" rows="4" />

        <label htmlFor="profilePicture">Profile Picture</label>
        <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" />

        <button type="submit">Create Profile</button>
      </form>
    </div></div>
  );
};

export default ProfilePage;
