const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FormData = require('../models/formData'); // Alumni collection
const router = express.Router();

// ------------------ ALUMNI LOGIN ------------------
router.post('/login1', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the alumni by email and type1
    const alumni = await FormData.findOne({ email, type1: 'alumni' });
    if (!alumni) {
      return res.status(404).json({ message: 'You are not an alumni or not registered' });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: alumni._id, type1: 'alumni' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    // Send response with token and user info
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: alumni._id,
        name: alumni.name,
        email: alumni.email,
        type1: alumni.type1
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
