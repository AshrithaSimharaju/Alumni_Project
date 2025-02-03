// import express from 'express';
// import Profile from '../models/Profiles.js';

// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password, type1 } = req.body;
  
//     try {
//       console.log(`Login attempt: email=${email}, type1=${type1}`);
      
//       // Find user by email and type1
//       const user = await Profile.findOne({ email, type1 });
//       console.log('User found:', user);
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found or user type mismatch' });
//       }
  
//       // Log the passwords being compared
//       console.log(`Password provided: ${password}`);
//       console.log(`Password in database: ${user.password}`);
  
//       if (user.password !== password) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
  
//       // Return user data
//       res.json({
//         email: user.email,
//         fullName: user.fullName,
//         profilePicture: user.profilePicture,
//         type1: user.type1,
//       });
//     } catch (error) {
//       console.error('Login error:', error.message);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
//   export default router;
  




// import express from 'express';
// import Profile from '../models/Profiles.js';

// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password, type1 } = req.body;
  
//     try {
//       console.log(`Login attempt: email=${email}, type1=${type1}`);
      
//       // Find user by email and type1
//       const user = await Profile.findOne({ email, type1 });
//       console.log('User found:', user);
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found or user type mismatch' });
//       }
  
//       // Log the passwords being compared
//       console.log(`Password provided: ${password}`);
//       console.log(`Password in database: ${user.password}`);
  
//       if (user.password !== password) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
  
//       // Return user data
//       res.json({
//         email: user.email,
//         fullName: user.fullName,
//         profilePicture: user.profilePicture,
//         type1: user.type1,
//       });
//     } catch (error) {
//       console.error('Login error:', error.message);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
//   export default router;
  
// Example in your backend (login.js or similar)

import express from 'express';
import Profiles from '../models/Profiles.js';
import jwt from 'jsonwebtoken'; // Import jwt

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password, type1 } = req.body;

  try {
    console.log('Received login request:', req.body);

    console.log('Login attempt:', email, password); // Log login attempt

    const user = await Profiles.findOne({ email, type1 }); 
    console.log(user);// Check if user exists by email and type1
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found or user type mismatch' });
    }
    console.log('User password:', user.password);  // Log the password from the database
    console.log('Entered password:', password); 
    // Check password
    if (user.password === password) {  // Plain text password comparison (consider bcrypt later)
      console.log('Login successful');
      const token = jwt.sign({ userId: user._id }, '4adbe8d3cd57cf45369f49f01ed79690a9fda715d998e9f6ed642c6ba3af80a0', { expiresIn: '1h' });  // Generate JWT token

      return res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        type1: user.type1,
        profilePicture: user.profilePicture,
        token,  // Optionally include the token in the response
      });
    } else {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Profiles.findById(id);  // Fetch the user profile from MongoDB
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);  // Send the user profile as JSON
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});
export default router;






