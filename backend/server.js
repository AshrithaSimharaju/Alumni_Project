// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Routes
const userRoutes = require('./routes/aut'); // Signup/Login route
const eventRoutes = require('./routes/events');
const postsRouter = require('./routes/posts');
const profileRoutes = require('./routes/profile');
const loginRoutes = require('./routes/login');
const contactRoutes = require('./routes/contact');
const adminRoutes=require('./routes/adminRoutes.js');
const login1Router = require('./routes/login1');
const contactAdminRoutes = require('./routes/contactRoutes.js');
// MongoDB connection
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/profile-pics', express.static(path.join(__dirname, 'public/profile-pics')));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/posts', postsRouter);
app.use('/api', profileRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', loginRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', login1Router); 
app.use('/api', contactAdminRoutes); 
// so POST /api/login1 works
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
