// import mongoose from 'mongoose';

// const profileSchema = new mongoose.Schema({
//   // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to the User collection
//   fullName: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   type1: { type: String, required: true },
//   location: { type: String },
//   skills: { type: [String] }, // Array of skills
//   currentPosition: { type: String },
//   company: { type: String },
//   about: { type: String, default: '' },
//   profilePicture: { type: String, default:  '/profile-pics/image1.jpg' }, // Default profile picture
// });

// const Profiles = mongoose.model('Profiles', profileSchema);

// export default Profiles;


import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to the User collection
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type1: { type: String, required: true },
  location: { type: String },
  skills: { type: [String] }, // Array of skills
  currentPosition: { type: String },
  company: { type: String },
  about: { type: String, default: '' },
  profilePicture: { type: String, default:  '/profile-pics/image1.jpg' }, // Default profile picture
});

const Profiles = mongoose.model('Profiles', profileSchema);

export default Profiles;