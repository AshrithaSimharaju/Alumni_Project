const express = require('express');
const Profiles = require('../models/Profiles');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password, type1 } = req.body;

  try {
    console.log('Received login request:', req.body);

    const user = await Profiles.findOne({ email, type1 });
    console.log(user); // Check if user exists by email and type1

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found or user type mismatch' });
    }

    console.log('User password:', user.password);  // DB password
    console.log('Entered password:', password); 

    // Compare password (plain text here, can replace with bcrypt later)
    if (user.password === password) {
      console.log('Login successful');

      const token = jwt.sign(
        { userId: user._id },
        '4adbe8d3cd57cf45369f49f01ed79690a9fda715d998e9f6ed642c6ba3af80a0',
        { expiresIn: '1h' }
      );

      return res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        type1: user.type1,
        profilePicture: user.profilePicture,
        token,  // Include JWT token
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

// Get user profile by ID
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profiles.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router;



