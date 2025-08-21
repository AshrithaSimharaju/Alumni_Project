const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },           // sender email
  email_id: { type: String },        // optional field
  message: { type: String, required: true },
  about: { type: String },           // optional
  toAdmin: { type: String, required: true }, // job_id of the admin
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
