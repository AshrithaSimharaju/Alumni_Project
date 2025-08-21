// models/Contact_admin.js
const mongoose = require('mongoose');

const contactAdminSchema = new mongoose.Schema({
  sender_email: { type: String, required: true },
  email_admin: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Contact_admin', contactAdminSchema);
