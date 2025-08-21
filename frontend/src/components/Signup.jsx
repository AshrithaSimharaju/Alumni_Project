// Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: false,
});

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    graduationYear: '',
    type1: '',
    gender: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Extract batch year from email, e.g., 'b191001' → 19
  const extractBatchYear = (email) => {
    const match = email.match(/^b(\d{2})\d{4}@rgukt\.ac\.in$/i);
    return match ? parseInt(match[1], 10) : null;
  };

  // Calculate graduation year and user type
  const calculateGraduationAndType = (batchYear) => {
    if (!batchYear) return { graduationYear: '', type1: '' };
    const graduationYear = 2000 + batchYear + 6; // 6-year course
    const currentYear = new Date().getFullYear();
    const type1 = currentYear >= graduationYear ? 'alumni' : 'student';
    return { graduationYear, type1 };
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    // Auto-calculate graduation year and type when email changes
    if (name === 'email') {
      const batchYear = extractBatchYear(value);
      const { graduationYear, type1 } = calculateGraduationAndType(batchYear);
      updatedForm.graduationYear = graduationYear;
      updatedForm.type1 = type1;
    }

    setFormData(updatedForm);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!extractBatchYear(formData.email)) {
      setErrorMessage('Enter a valid college email (e.g., b19xxxx@rgukt.ac.in)');
      return;
    }

    try {
      await api.post('/api/auth/signup', formData);
      navigate('/ProfilePage'); // Go to profile after successful signup
    } catch (err) {
      if (err.response?.data?.message) {
        const msg = err.response.data.message;
        setErrorMessage(msg);
        if (msg.toLowerCase().includes('already exists')) {
          // Redirect to login page after 2 seconds
          setTimeout(() => navigate('/Login'), 2000);
        }
      } else {
        setErrorMessage('Error occurred during signup.');
      }
    }
  };

  return (
    <div className="signup-con">
      <div className="cardsignup">
        <form onSubmit={handleSubmit}>
          <h2>Signup Form</h2>

          {errorMessage && <div className="error-banner">{errorMessage}</div>}

          <label>Name</label>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />

          <label>Email</label>
          <input name="email" placeholder="Email" onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <label>Graduation Year</label>
          <input name="graduationYear" value={formData.graduationYear} readOnly />

          <label>User Type</label>
          <input name="type1" value={formData.type1} readOnly />

          <label>Gender</label>
          <input name="gender" placeholder="Gender" onChange={handleChange} required />

          <button type="submit">Signup</button>

          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            Already have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/Login')}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
