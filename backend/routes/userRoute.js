const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get user profile by token
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user exists from auth middleware
    const user = await User.findById(userId).select('name profilePicture');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
