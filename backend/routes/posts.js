const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const Profiles = require('../models/Profiles');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// POST route to create a new post
router.post('/', upload.single('file'), async (req, res) => {
  const { description, authorId } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const post = new Post({
      description,
      fileUrl,
      authorId,
    });

    const savedPost = await post.save();
    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// GET route to fetch all posts with populated author details
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('authorId', 'fullName profilePicture');
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: err.message });
  }
});
// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
