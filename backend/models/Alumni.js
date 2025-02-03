// backend/models/Alumni.js
import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  field: { type: String, required: true },
});

// Create a model for the Alumni schema
const Alumni = mongoose.model('Alumni', alumniSchema);

// Export the Alumni model as default
export default Alumni;

