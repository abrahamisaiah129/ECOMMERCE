// otpRoutes.js
import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto'; // For generating a random OTP
import { Otp } from '../models/otpModel.js'; // Your OTP schema model
 
const router = express.Router();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD // Your email password
  }
});

// Generate and send OTP
router.post('/send', async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

  // Save the OTP to the database (you may need to create this model)
  const otpEntry = new Otp({ email, otp });
  await otpEntry.save();

  // Send OTP via email
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error });
  }
});

// Verify OTP
router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;

  const otpEntry = await Otp.findOne({ email, otp });

  if (!otpEntry) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // If valid, delete the OTP entry or mark it as used
  await OTP.deleteOne({ email, otp });
  res.status(200).json({ message: 'OTP verified successfully!' });
});

export default router;
