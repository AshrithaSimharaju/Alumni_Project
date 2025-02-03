// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   profilePicture: { type: String, required: true }
// }, { collection: 'users' }); // Explicit collection name

// // Export the model
// const User = mongoose.model('User', userSchema);
// export default User; // Ensure the export is default

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  graduationYear: { type: String, required: true },
  userType: { type: String, required: true }, // e.g., Admin, User, etc.
  gender: { type: String, required: true },  // Male, Female, Other
  currentPosition: { type: String, required: true },
  company: { type: String, required: true },
  about: { type: String, default: '' },  // About section
});

const User = mongoose.model('User', userSchema);
export default User;
