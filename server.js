import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import Doctor from './models/Doctor.js';
import Appointment from './models/Appointment.js';

const app = express();
const port = process.env.PORT || 3000;

// Fix for __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/healthcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Get all doctors
app.get('/api/doctors', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// Book an appointment
app.post('/api/appointments', async (req, res) => {
  const { name, doctor, slot } = req.body;

  // Check if slot is already taken
  const exists = await Appointment.findOne({ doctor, slot });
  if (exists) {
    return res.status(400).json({ message: 'Slot already booked' });
  }

  const appointment = new Appointment({ name, doctor, slot });
  await appointment.save();
  res.json({ message: 'Appointment booked successfully' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
