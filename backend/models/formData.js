import mongoose from 'mongoose';

// Define the schema
const FormDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    graduationYear: { type: String, required: true },
    type1: { type: String, enum: ['admin', 'student', 'alumni'], required: true },
    gender: { type: String, required: true },
    currentposition: { type: String, required: true },
    company: { type: String, required: true },
    about: { type: String, required: true },
  },
  { collection: 'formData' } // Explicit collection name
);

// Export the model correctly
const formData = mongoose.model('formData', FormDataSchema);
export default formData; // Ensure the export is default
