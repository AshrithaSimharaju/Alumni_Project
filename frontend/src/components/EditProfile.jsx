import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    about: '',
    type1: '',
    skills: '',
    profilePicture: null, // store File object
  });

  const [preview, setPreview] = useState(''); // image preview
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  if (!userId) {
    return <p>User not found. Please go back to your profile.</p>;
  }

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        setFormData({
          fullName: response.data.fullName || '',
          email: response.data.email || '',
          password: '',
          about: response.data.about || '',
          type1: response.data.type1 || 'alumni',
          skills: response.data.skills || '',
          profilePicture: null,
        });
        setPreview(`http://localhost:5000${response.data.profilePicture || ''}`);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile data.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files[0]) {
      setFormData({ ...formData, profilePicture: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit updated profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('about', formData.about);
      data.append('type1', formData.type1);
      data.append('skills', formData.skills);
      if (formData.profilePicture) {
        data.append('profilePicture', formData.profilePicture);
      }

      const response = await axios.put(
        `http://localhost:5000/api/profile/${userId}`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Profile updated successfully!');
      navigate(-1); // back to previous page
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile.');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="form-group">
          <label>About:</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Skills (comma separated):</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select
            name="type1"
            value={formData.type1}
            onChange={handleChange}
          >
            <option value="alumni">Alumni</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div className="form-group">
          <label>Profile Picture:</label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
          />
          {preview && <img src={preview} alt="Preview" className="preview-img" />}
        </div>

        <button type="submit" className="submit-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;

