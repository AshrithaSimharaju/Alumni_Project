// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';


// const Navbar = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     alert('Logged out successfully!');
//   };

//   return (
//     <nav>
//         <Link to="/About">About</Link>
//       <Link to="/Login">Login</Link>
//       <Link to="/Signup">Signup</Link>
//       {/* <Link to="/events">Events</Link>
//       <Link to="/Login" onClick={handleLogout}>Logout</Link> */}
//     </nav>
//   );
// };

// export default Navbar;
 import React from 'react';
import { useNavigate } from 'react-router-dom';

 const Navbar = () => {
   const navigate = useNavigate();

   const navigation = () => {
     navigate('/signup');
   }

   return (
     <>
       {/* <div>Navbar</div>
       <button onClick={navigation}>NEW Signup</button> */}
     </>
   );
 }

 export default Navbar;
