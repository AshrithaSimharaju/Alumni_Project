const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  id_no: String,
  email: String,
  branch: String,
  graduation_year: String
});

module.exports = mongoose.model('Student', studentSchema);
