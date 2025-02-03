// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Import the CSS file for styling

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '', type1: 'alumni' });
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/aut/Login', formData);
//       console.log('Response from Backend:', response.data);
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token); // Save token in localStorage
//         alert('Login successful!');
//         navigate('/Dashboard'); // Redirect to dashboard after login
//       } else {
//         alert('Login failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Invalid email or password');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Login</h2>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <select
//           name="type1"
//           value={formData.type1}
//           onChange={handleChange}
//           required
//         >
//           <option value="student">student</option>
//           <option value="alumni">alumni</option>
//           <option value="admin">admin</option>
//         </select>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import './LoginPage.css';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [type1, setType1] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/login', { email, password, type1 });
//     const userData = { fullName: response.data.fullName, type1: response.data.type1};
//       // Save user data to localStorage (omit sensitive info like password)
//       localStorage.setItem('user', JSON.stringify(userData));
//       alert('Login successful');
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Invalid email, password, or user type');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleLogin}>
//         <h2>Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <select
//           value={type1}
//           onChange={(e) => setType1(e.target.value)}
//           required
//         >
//           <option value="" disabled>Select User Type</option>
//           <option value="admin">admin</option>
//           <option value="alumni">alumni</option>
//           <option value="student">student</option>
//         </select>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type1, setType1] = useState('alumni');  // Default value for type1
  const [error, setError] = useState('');  // State for displaying error messages

  // Handle login logic
  const handleLogin = async (email, password, type1) => {
    try {
      console.log('Sending data:', { email, password, type1 });
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, type1 }),  // Send email, password, and type1
      });

      if (response.ok) {
        const data = await response.json();  // Parse JSON response
        console.log(data);  // Log the response data for debugging

        // Store user data in localStorage
        const user = {
          _id: data._id,
          fullName: data.fullName,
          email:data.email,
          type1: data.type1,
          profilePicture: data.profilePicture,
        };
        localStorage.setItem('user', JSON.stringify(user));
        console.log("Server response:", data);


        localStorage.setItem("userEmail", user.email);
        console.log("User email set:", localStorage.getItem("userEmail"));

        // Redirect to the dashboard after successful login
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();  // Get the error response
        setError(errorData.message);  // Set the error message to display
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');  // Set a generic error message
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, type1);  // Call the login function
  };

  return (
    <div className="loginpage-con">
      <h2>Login</h2>
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
        <div>
          <label>User Type:</label>
          <select 
            value={type1} 
            onChange={(e) => setType1(e.target.value)} 
            required
          >
            <option value="alumni">alumni</option>
            <option value="student">student</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message if any */}
    </div></div>
  );
};

export default Login;





