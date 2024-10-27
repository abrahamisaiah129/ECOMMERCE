const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email addresses
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
