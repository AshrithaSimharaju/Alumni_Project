import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login1.css';

export default function Login1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert('Fill all fields');

    try {
      const res = await axios.post('http://localhost:5000/api/login1', { email, password });
      const user = res.data.user;

      // Check if the logged-in user is an alumni
      if (user.type1 === 'alumni') {
        localStorage.setItem('token', res.data.token);
        navigate('/contact_admin'); // only alumni can go
      } else {
        alert('You are not authorized. Contact admin.');
      }

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
