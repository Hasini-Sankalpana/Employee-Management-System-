// models/Employee.js (Ensure the schema includes new fields)
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  employeeNumber: { type: String, required: true, unique: true },
  salary: { type: Number, required: true },
  skills: [{ type: String }],
  dateJoined: { type: Date, required: true },
  contractType: { type: String, enum: ['Permanent', 'Temporary', 'Freelance'], required: true },
});

export default mongoose.model('Employee', employeeSchema);

