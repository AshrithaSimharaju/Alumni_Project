import Profiles from '../models/Profiles.js';

// Get profile by userId
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profiles.findOne({ authorId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
