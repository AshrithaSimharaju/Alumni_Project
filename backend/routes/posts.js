
// import express from 'express';
// import multer from 'multer';
// import Post from '../models/Post.js';  // Import the Post model
// // import path from 'path';

// const router = express.Router();

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // File name format
//   },
// });

// const upload = multer({ storage });

// // POST route to create a new post (with file upload)
// router.post('/', upload.single('file'), async (req, res) => {
//   const { description } = req.body;
//   const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

//   console.log('File uploaded:', req.file); // Log file upload info
//   console.log('Description:', description); // Log description

//   try {
//     // Create a new post object
//     const post = new Post({
//       description,
//       fileUrl,
//     });

//     // Save the post to the database
//     const savedPost = await post.save();
//     console.log('Post saved:', savedPost); // Log successful save

//     res.status(201).json({ message: 'Post created successfully', post: savedPost });
//   } catch (error) {
//     console.error('Error saving post:', error); // Log error
//     res.status(500).json({ error: 'Failed to create post' });
//   }
// });

// // GET route to fetch all posts
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (err) {
//     console.error('Error fetching posts:', err);
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;






import express from 'express';
import multer from 'multer';
import Post from '../models/Post.js';  // Import the Post model
import Profiles from '../models/Profiles.js';  // Import the Profile model

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // File name format
  },
});

const upload = multer({ storage });

// POST route to create a new post (with file upload)
router.post('/', upload.single('file'), async (req, res) => {
  const { description } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('File uploaded:', req.file); // Log file upload info
  console.log('Description:', description); // Log description

  try {
    // Create a new post object
    const post = new Post({
      description,
      fileUrl,
      authorId: req.body.authorId,  // You need to pass the authorId (from the frontend)
    });

    // Save the post to the database
    const savedPost = await post.save();
    console.log('Post saved:', savedPost); // Log successful save

    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (error) {
    console.error('Error saving post:', error); // Log error
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// GET route to fetch all posts with populated author details
router.get('/', async (req, res) => {
  try {
    // Fetch posts and populate the authorId field with fullName and profilePicture from the Profile collection
    const posts = await Post.find().populate('authorId', 'fullName profilePicture');
    console.log('Posts with populated authorId:', posts); 
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
