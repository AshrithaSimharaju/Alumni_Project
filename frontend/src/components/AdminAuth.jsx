import { useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import {useNavigate} from 'react-router-dom';
export default function AdminAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({
    name: '',
    job_id: '',
    email_id: '',
    password: '',
    qualification: '',
    work_experience: '',
    joining_date: ''
  });
const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        // Signup: validate job_id exists in Employee collection
        const res = await axios.post('http://localhost:5000/api/admin/signup', form);
        alert(res.data.message || 'Signup successful! Login now.');
        setIsSignup(false);
      } else {
        // Login: send job_id and password
        const res = await axios.post('http://localhost:5000/api/admin/login', {
          job_id: form.job_id,
          password: form.password
        });
        localStorage.setItem('adminToken', res.data.token);
        setLoggedIn(true);
          navigate('/admin_dashboard'); 
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  if (loggedIn) return <AdminDashboard/>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{isSignup ? 'Admin Signup' : 'Admin Login'}</h2>
      <form>
        {isSignup ? (
          <div>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            <br />
            <input
              name="job_id"
              placeholder="Job ID"
              value={form.job_id}
              onChange={handleChange}
            />
            <br />
            <input
              name="email_id"
              placeholder="Email ID"
              value={form.email_id}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <br />
            <input
              name="qualification"
              placeholder="Qualification"
              value={form.qualification}
              onChange={handleChange}
            />
            <br />
            <input
              name="work_experience"
              placeholder="Work Experience"
              value={form.work_experience}
              onChange={handleChange}
            />
            <br />
            <input
              type="date"
              name="joining_date"
              placeholder="Joining Date"
              value={form.joining_date}
              onChange={handleChange}
            />
            <br />
          </div>
        ) : (
          <div>
            <input
              name="job_id"
              placeholder="Job ID"
              value={form.job_id}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        )}
        <br />
        <button type="button" onClick={handleSubmit}>
          {isSignup ? 'Signup' : 'Login'}
        </button>
      </form>
      <p
        onClick={() => setIsSignup(!isSignup)}
        style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
      >
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
      </p>
    </div>
  );
}
