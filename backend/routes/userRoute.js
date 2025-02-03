import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get user profile by token
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming user is authenticated and their ID is stored in req.user
    const user = await User.findById(userId).select('name profilePicture');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
