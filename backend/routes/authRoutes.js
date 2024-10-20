// Import necessary modules
import express from 'express';
import User from '../models/userModel.js';
import Otp from '../models/otpModel.js';
import bcrypt from 'bcrypt'; 
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
dotenv.config();
const authRouter = express.Router();






// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');  // Set the folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));  // Set a unique filename
  }
});

// Filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Create multer instance
// const upload = multer({ storage, fileFilter });
// Configure multer with storage, file filter, and file size limit
const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 1024 * 1024 * 2 } // Limit file size to 2MB
});

// POST Request for creating a new User (Signup)
authRouter.post('/signup', upload.single('profileImage'), async (req, res) => {
  try {
    // Destructure the request body
    const { username, email, createdAt, updatedAt } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    // Check if all required fields are provided
    if (!username || !email || !req.file || !password || !createdAt || !updatedAt) {
      return res.status(400).send('Please provide all required fields: username, email, profileImage, password, createdAt, updatedAt');
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists', code: 'USERNAME_TAKEN' });

    }
    const existingUser2 = await User.findOne({ email});
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists', code: 'EMAIL_TAKEN' });

    }

    // Create a new user with the provided data
    const newUser = {
      username,
      email,
      profileImage: req.file.path,  // Store the path of the uploaded image
      password,
      createdAt,
      updatedAt
    };

    // Insert new user into the database
    const user = await User.create(newUser);
 const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send success response with the new user
    return res.status(200).send({ message: 'Signup successful!', token});

  } catch (err) {
    // Handle any errors that occur during the process
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

// above works





























  // 2. post Request to login a user
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'No such account found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong password.' });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// the above codes work
//
//   // 2. GET Request to fetch one user
//  authRouter.get('/users', async (req, res) => {
//     try {
//         // Check if all required fields are provided
//         const { username, email, profileImage, createdAt, updatedAt } = req.body;
        
//         if (!username || !email || !profileImage || !createdAt || !updatedAt) {
//           return res.status(400).send('Please provide all required fields: username, email, profileImage, createdAt, updatedAt');
//         }
//   else{
//         // Create a new user with the provided data
//         const newUser = {
//           username,
//           email,
//           profileImage,
//           createdAt,
//           updatedAt
//         };
  
//         const user = await User.find(newUser);
  
//         return res.status(200).send({ message: 'Signup successful!', user });
//       }
//       } catch (err) {
//         res.status(400).json({ message: 'Error creating user', error: err.message });
//       }
//     });
  
    
  
// authRouter.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if both email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     // Find the user by email
//     const existingUser = await User.findOne({ email });

//     // If no user is found, return an error
//     if (!existingUser) {
//       return res.status(404).json({ message: 'No such account found.' });
//     }

//     // Check if the password is correct by comparing it with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, existingUser.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Wrong password.' });
//     }

//     // If both email and password are valid, return success
//     return res.status(200).json({ message: 'Login successful.' });

//   } catch (err) {
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// });























// 2FA AUTHENTICATION BELOW FOR FORGOT PASSWORD



// sendstheotp// Sends the OTP
authRouter.post('/forgotpassword', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate request body
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Check if an OTP already exists for the provided email and if it has expired
    const existingOtp = await Otp.findOne({ email });

    if (existingOtp && existingOtp.expiresAt > Date.now()) {
      return res.status(400).json({ message: 'An OTP has already been sent. Please wait until it expires to request a new one.' });
    }

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    // Save or update the OTP in the database
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true }
    );

    // Send OTP to user's email
    // (Assuming you have some email service function, e.g., sendEmail())
    






    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
      }
    });

    // Mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'PASSWORD RESET OTP',
      text: `Hi its Your One And only Store ....you requested and email...Your OTP is ${otp}. It will expire in 10 minutes. Thanks for choosing us!`
    };

    // Send the email and handle the result with async/await
    const info = await transporter.sendMail(mailOptions);

    // If email is sent, store OTP in the database
    const newOtp = {
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // OTP expires in 10 minutes
    };

    const createOtp = await Otp.create(newOtp); // Store OTP in the database

    // Success response
    res.status(200).json({ message: 'OTP sent successfully! Check your email.'});
    
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: 'Error occurred during password recovery', error: error.message });
  }


    await sendEmail(email, otp); 

    // res.status(200).json({ message: 'OTP sent successfully!' });
  // } catch (error) {
  //   console.error('Error:', error.message);
  //   res.status(500).json({ message: 'Error occurred while sending OTP', error: error.message });
  // }
});






// // sendstheotp
// authRouter.post('/forgotpassword', async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: 'Email is required.' });
//     }

//     // OTP generation
//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`; // Generates a 4-digit OTP


//   // use the url to route carrying the email for verification
// });


authRouter.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log('Received email:', email);
    console.log('Received otp:', otp);

    // Validate request body
    if (!email || !otp) {
      console.log('Email or OTP is missing');
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    // Find the OTP record for the provided email
    const existingOtp = await Otp.findOne({ email });
    console.log('Found OTP record:', existingOtp);

    // Check if an OTP exists and has not expired
    if (!existingOtp) {
      console.log('No OTP found for this email');
      return res.status(404).json({ message: 'OTP not found. Please request a new one.' });
    }
    
    // Check if the OTP matches and hasn't expired
    if (existingOtp.otp !== otp) {
      console.log('OTP does not match');
      return res.status(400).json({ message: 'Invalid OTP.' });
    } else if (existingOtp.expiresAt < Date.now()) {
      console.log('OTP has expired');
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }
 
    console.log('OTP verified successfully');
    res.status(200).json({ message: 'OTP verified successfully!' });

    // Optionally, delete the OTP from the database if it's no longer needed
    const deleteResult = await Otp.deleteOne({ email });
    console.log('Deleted OTP record:', deleteResult);

  } catch (error) {
    console.error('Error during OTP verification:', error.message);
    res.status(500).json({ message: 'Error occurred during OTP verification', error: error.message });
  }
});



// updates password 
authRouter.post('/updatePassword', async (req, res) => {
  try { 
    const { email, password } = req.body; // Get email and new password

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Hash the new password before storing it
    const salt = await bcrypt.genSalt(10);  // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt);  // Await the hash function

    // Update the user's password
    const updatedUser = await User.updateOne(
      { email: email },  // Filter (search criteria)
      { $set: { 'password': hashedPassword } }  // Update operation with hashed password
    );

    if (updatedUser.nModified === 0) {
      return res.status(404).json({ message: 'No user found with this email' });
    }

    return res.status(200).json({ message: 'Password updated successfully!' });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ success: false, message: 'Error occurred during password update', error: error.message });
  }
});



    



    
  
export default authRouter;