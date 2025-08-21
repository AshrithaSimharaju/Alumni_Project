const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const Profiles = require('../models/Profiles');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ========================= CREATE PROFILE =========================
router.post('/profile', upload.single('profilePicture'), async (req, res) => {
  try {
    const { fullName, email, password, type1, location, skills, currentPosition, company, about } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : '/default-profile.png';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newProfile = new Profiles({
      fullName,
      email,
      password: hashedPassword,
      type1,
      location,
      skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
      currentPosition,
      company,
      about,
      profilePicture,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create profile' });
  }
});

// ========================= LOGIN =========================
router.post('/login', async (req, res) => {
  try {
    const { email, password, type1 } = req.body;

    const user = await Profiles.findOne({ email, type1 });
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
        fullName: user.fullName,
        email: user.email,
        type1: user.type1,
        location: user.location,
        skills: user.skills,
        currentPosition: user.currentPosition,
        company: user.company,
        about: user.about,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========================= FETCH ALL OR SEARCH PROFILES =========================
router.get('/profile', async (req, res) => {
  const { search } = req.query;
  try {
    let profiles;
    if (search) {
      profiles = await Profiles.find({ fullName: { $regex: search, $options: 'i' } });
    } else {
      profiles = await Profiles.find();
    }
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========================= FETCH SINGLE PROFILE =========================
router.get('/profile/:id', async (req, res) => {
  try {
    const profile = await Profiles.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========================= UPDATE PROFILE =========================
router.put('/profile/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const profile = await Profiles.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const { fullName, email, password, about, type1, skills, currentPosition, company, location } = req.body;

    profile.fullName = fullName || profile.fullName;
    profile.email = email || profile.email;
    profile.about = about || profile.about;
    profile.type1 = type1 || profile.type1;
    profile.skills = skills ? skills.split(',').map(skill => skill.trim()) : profile.skills;
    profile.currentPosition = currentPosition || profile.currentPosition;
    profile.company = company || profile.company;
    profile.location = location || profile.location;

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      profile.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      profile.profilePicture = `/uploads/${req.file.filename}`;
    }

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
