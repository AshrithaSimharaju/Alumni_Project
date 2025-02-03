// import express from 'express';
// import formData from '../models/formData.js';
// const router = express.Router();

// router.post('/Signup', async (req, res) => {
//   const { name, email, password, graduationYear, field } = req.body;

//   try {
//     // Directly store the password in plaintext (not recommended)
//     const newFormData = new formData({
//       name,
//       email,
//       password,  // Store password as plain text
//       graduationYear,
//       field,
//     });

//     await newFormData.save();
//     res.status(201).json({ message: 'Signup successful!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error during signup' });
//   }
// });

// router.post('/Login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await formData.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid' });
//     }

//     // Direct plaintext comparison (not recommended)
//     if (password !== user.password) {
//       return res.status(400).json({ message: 'Invalid' });
//     }

//     // Generate a dummy token (you should replace this with a real token like JWT)
//     const token = 'dummy-token';  // Placeholder token

//     res.json({ message: 'Login successful!', token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.post('/Login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await FormData.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare the entered password with the stored password (plaintext comparison)
//     if (password !== user.password) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Generate a dummy token (you should replace this with a real token like JWT)
//     const token = 'dummy-token';  // Placeholder token

//     res.json({ message: 'Login successful!', token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// export default router;
// module.exports = router;
 // Use module.exports

 // routes/aut.js
import express from 'express';
import formData from '../models/formData.js';
import cors from 'cors'; // Import cors to handle cross-origin requests

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors());
const router = express.Router();

// Signup Route
router.post('/Signup', async (req, res) => {
  const { name, email, password, graduationYear, type1, gender, currentposition, company, about } = req.body;

  try {
    // Directly store the password in plaintext (not recommended for production)
    const newFormData = new formData({
      name,
      email,
      password,
      graduationYear,
      type1,
      gender,
      currentposition,
      company,
      about,
    });

    await newFormData.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error during signup' });
  }
});


router.post('/Login', async (req, res) => {
  const { email, password ,type1} = req.body;

  try {
    const user = await formData.findOne({ email,type1 });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = 'dummy-token';  // Placeholder for token generation
    res.json({ message: 'Login successful!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// router.get('/Gallery', (req, res) => {
//   res.json({ message: 'Gallery content' });
// });

// router.get('/Events', (req, res) => {
//   res.json({ message: 'Upcoming events will be displayed here.' });
// });

// router.get('/Profile', (req, res) => {
//   res.json({ message: 'User profile information.' });
// });

// router.get('/Contact', (req, res) => {
//   res.json({ message: 'Contact form and information.' });
// });

export default router;


