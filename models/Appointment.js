import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: String,
  doctor: String,
  slot: String
});

export default mongoose.model('Appointment', appointmentSchema);
