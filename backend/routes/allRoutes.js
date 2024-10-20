import Product from './productModel';
import Rating from './ratingModel';
import Comment from './commentModel';
import Chat from './chatModel';
import express from 'express';

const router = express.Router();

// 1. POST &  GET Request for products
router.post('/products', async (req, res) => {
    const { username, email, profileImage, createdAt, updatedAt } = req.body;
      try{
            if (!username || !email || !profileImage || !createdAt || !updatedAt) {
      return res.status(400).send('Please provide all required fields: username, email, profileImage, createdAt, updatedAt');
    }
else{
    // Create a new user with the provided data
    const newUser = {
      username,
      email,
      profileImage,
      createdAt,
      updatedAt
    };

    const user = await User.create(newUser);

    return res.status(200).send({ message: 'Signup successful!', user });
  }}
   catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
   }
});







  router.get('/users', async (req, res) => {
    try {
      const user = new User(req.body);
    //   for all this create withe our imported schema and send the routerropraite data to the backend
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: 'Error creating user', error: err });
    }
  });
  




  
  // 2. POST Request for Products
  router.post('/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: 'Error creating product', error: err });
    }
  });
  
  // 3. POST Request for Ratings
  router.post('/ratings', async (req, res) => {
    try {
      const rating = new Rating(req.body);
      await rating.save();
      res.status(201).json(rating);
    } catch (err) {
      res.status(400).json({ message: 'Error creating rating', error: err });
    }
  });
  
  // 4. POST Request for Comments
  router.post('/comments', async (req, res) => {
    try {
      const comment = new Comment(req.body);
      await comment.save();
      res.status(201).json(comment);
    } catch (err) {
      res.status(400).json({ message: 'Error creating comment', error: err });
    }
  });
  
  // 5. POST Request for Chats
  router.post('/chats', async (req, res) => {
    try {
      const chat = new Chat(req.body);
      await chat.save();
      res.status(201).json(chat);
    } catch (err) {
      res.status(400).json({ message: 'Error creating chat', error: err });
    }
  });
  