// import mongoose from 'mongoose';

// const ContactSchema = new mongoose.Schema({
//   sender: {
//     type: String,
//     required: true,
//   },
//   receiver: {
//     type: String,
//     required: true,
//   },
//   subject: {
//     type: String,
//     required: true,
//     enum: ["general", "event", "donation"], // Restrict to valid subjects
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });
// const Contact = mongoose.model('Contact', ContactSchema);

// // Export the Contact model as default
// export default Contact;


import mongoose from 'mongoose';


const ContactSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Email of the sender
  receiver: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact;

