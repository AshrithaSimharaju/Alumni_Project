const mongoose=require('mongoose');
// Define the schema
const FormDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    graduationYear: { type: String, required: true },
    type1: { type: String, enum: ['admin', 'student', 'alumni'], required: true },
    gender: { type: String, required: true }
  },
  { collection: 'formData' } // Explicit collection name
);

// Export the model correctly
const formData = mongoose.model('formData', FormDataSchema);
module.exports=formData; // Ensure the export is default
