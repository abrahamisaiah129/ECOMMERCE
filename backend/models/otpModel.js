// models/otpModel.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: '10m', default: Date.now } // Automatically deletes after 10 minutes
});

const Otp = mongoose.model('Otp', otpSchema);
// export default Otp;
export { Otp };
 