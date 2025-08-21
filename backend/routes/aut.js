const express = require('express');
const bcrypt = require('bcrypt');
const formData = require('../models/formData');

const router = express.Router();

// Signup Route
router.post('/Signup', async (req, res) => {
  try {
    const { name, email, password, graduationYear, type1, gender } = req.body;

    // Email validation for RGUKT batch email format
    const emailRegex = /^b\d{2,3}\d{2,3}@rgukt\.ac\.in$/i;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format. Must be RGUKT batch email like b19xxxx@rgukt.ac.in',
      });
    }

    // Check if email already exists
    const existingUser = await formData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new formData({
      name,
      email,
      password: hashedPassword,
      graduationYear,
      type1,
      gender
    });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route

router.post('/login', async (req, res) => {
  try {
    const { email, password, type1 } = req.body;

    const user = await formData.findOne({ email, type1 });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful!',
      user: {
        _id: user._id,
        fullName: user.fullName, // make sure it matches your frontend
        email: user.email,
        type1: user.type1,
        graduationYear: user.graduationYear,
        gender: user.gender,
        currentposition: user.currentposition,
        company: user.company,
        about: user.about,
        profilePicture: user.profilePicture || '/uploads/default.jpg',
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

