
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/aut.js';
import eventRoutes from './routes/events.js'; 
import postsRouter from './routes/posts.js'; 
import path from 'path';
import profileRoutes from './routes/profile.js';
import loginRoutes from './routes/login.js';
import contactRoutes from './routes/contact.js';

import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.json());
app.use(express.json());  // Built-in middleware
app.use(cors());  // Enable CORS to allow requests from different origins
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 app.use('/public', express.static(path.join(__dirname, 'public')));
 app.use('/profile-pics', express.static(path.join(__dirname, 'public/profile-pics')));
 app.use('/api/aut', userRoutes); 
 app.use('/api/events', eventRoutes); 
 app.use('/api/posts', postsRouter); // Use authentication routes
 app.use('/api', profileRoutes);
 app.use('/api', loginRoutes); 
 app.use("/api/contact", contactRoutes);
 app.use(bodyParser.json({ limit: '10mb' })); // You can set this value according to your needs
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//  app.use('/api', profileRoutes);

mongoose.connect('mongodb://localhost:27017/alumni', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
