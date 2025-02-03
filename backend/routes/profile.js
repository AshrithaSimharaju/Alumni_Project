import express from 'express';
import multer from 'multer';
import path from 'path';
import Profiles from '../models/Profiles.js';
import { getProfileById } from '../controllers/profileController.js';

// Initialize the router
const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Route to create a profile
router.post('/profile', upload.single('profilePicture'), async (req, res) => {
  try {
    const { fullName,email,password,type1,  location, skills, currentPosition, company, about } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : '/default-profile.png';

    const newProfile = new Profiles({
      fullName,
      email,
      password,
      type1,
      location,
      skills: skills.split(',').map(skill => skill.trim()),
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


// router.get('/search', async (req, res) => {
//   const { fullName } = req.query;
//   try {
//     const profiles = await Profiles.find({ 
//       fullName: { $regex: fullName, $options: 'i' } // Case-insensitive search
//     });
//     res.json(profiles);
//   } catch (error) {
//     console.error('Error searching profiles:', error);
//     res.status(500).json({ message: 'Error searching profiles' });
//   }
// });


// export default router;

router.get('/profile', async (req, res) => {
  const { search } = req.query;

  try {
    let profiles;
    if (search) {
      profiles = await Profiles.find({
        fullName: { $regex: search, $options: 'i' }, // Case-insensitive match
      });
    } else {
      profiles = await Profiles.find();
    }
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error' });
  }

});


router.put('/api/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProfile = await Profiles.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validations
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    console.log(updatedProfile);

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
});


export default router;

