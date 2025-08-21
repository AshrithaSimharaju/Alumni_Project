const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  job_id: { type: String, required: true, unique: true },
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  qualification: { type: String },
  work_experience: { type: String },
  joining_date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
