import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  slots: [String]
});

export default mongoose.model('Doctor', doctorSchema);
