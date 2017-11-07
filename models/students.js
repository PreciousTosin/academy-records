import mongoose from 'mongoose';

// SETUP SCHEMA
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  DOB: String,
  phone: String,
  email: String,
  address: String,
  course: String,
  grade: Number,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
