import product from '../models/productModel.js';
import express from 'express';
import cors from 'cors';
// external library for critical seraches and added together wiht an autocompkete feature
// get all products by user search
import Fuse  from 'fuse.js';  // Add Fuse.js for fuzzy search

const inRouter = express.Router();
// a router to post a products
inRouter.post('/product', cors({ origin: 'http://localhost:5173' }), async (req, res) => {
  try {
   let{ email,category, name, description, images, price, sellerId } = req.body; // Get email from params
     category = category.toLowerCase()
   // Validate inputs
    if (!category || !images || !name || !description ||!price) {
      return res.status(400).json({ message: 'all fields are required!!!' });
    }
    if (!email) {
  return res.status(400).json({message:'not a user ,login to post your products!!!'})
}
    
    const newProduct = {
      'email': email, 
      'category': category,
      'images': images,
      'name': name,
      'description': description,
      'price': price,
      'sellerId':sellerId
    }
    const createProduct = await product.create(newProduct); // Store OTP in the database

    if (!createProduct) {
      return res.status(404).json({ message: 'Error occured while sending product' });
    }

    return res.status(200).json({ message: 'Product added successfully!' });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ success: false, message: 'Error occurred during creating product', error: error.message });
  }
}); 
// get all products by category
inRouter.post('/products', cors({ origin: 'http://localhost:5173' }), async (req, res) => {
  try {
    let { category } = req.body; // Get category
    category=category.toLowerCase();
    // Validate input
    if (!category) {
      return res.status(400).json({ message: 'category is required' });
    }

    // Find products by category
    const foundProducts = await product.find({ category });

    if (foundProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    // Return found products
    return res.status(200).json({ 
      message: 'See search results!', 
      products: foundProducts 
    });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Error occurred during product search', 
      error: error.message 
    });
  }
});
// get all products by userId for user
inRouter.post('/products/user', cors({ origin: 'http://localhost:5173' }), async (req, res) => {
  try {
    const { userId, email } = req.body; // Get the seller ID and email from the request

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'No user ID provided!' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Not logged in!' });
    }
    
    // Find products by sellerId
    const userProducts = await product.find({ sellerId: userId });
// seller id and userid connect the two collections with its unique data objects id`s
    if (!userProducts || userProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for this user!' });
    }

    // Return the product details
    return res.status(200).json({ 
      message: `Products found successfully! (${userProducts.length} items)`, 
      products: userProducts 
    });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Error occurred while retrieving products', 
      error: error.message 
    });
  }
});
// for search bar: critical search and 3rd party library used called fuzzy and a little algorithm for autocomplete
inRouter.post('/products/search', cors({ origin: 'http://localhost:5173' }), async (req, res) => {
  try {
    let { input } = req.body;
    input = input.toLowerCase();

    // Validate input
    if (!input) {
      return res.status(400).json({ message: 'Input is required!' });
    }

    // Step 1: Fetch products that might match for autocomplete suggestions
    const suggestedProducts = await product.find({ name: { $regex: input, $options: 'i' } });
    
    if (suggestedProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for this input' });
    }
    // step one is on its own so  also step two just the same api call but different all triggered at once
    // Step 2: Use Fuse.js for fuzzy search on the suggested products
    const fuse = new Fuse(suggestedProducts, {
      keys: ['name', 'description'],   // Fields to perform fuzzy search on
      threshold: 0.3,                  // Adjust sensitivity (0 = exact match, 1 = very fuzzy)
    });

    // Perform the fuzzy search
    const fuzzyResults = fuse.search(input);
    
    // Extract matched products from Fuse.js results
    const foundProducts = fuzzyResults.map(result => result.item);

    // Check if Fuse.js found any products
    if (foundProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for this search' });
    }

    // Step 3: Return found products and autocomplete suggestions
    return res.status(200).json({ 
      message: 'Search results found!',
      products: foundProducts,
      suggestions: suggestedProducts.map(prod => prod.name)  // Send back product names for autocomplete
    });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Error occurred during product search', 
      error: error.message 
    });
  }
});
//  now to get single a product
export default inRouter;


// get a product by search - this is intensive as the user is deciding the input here
inRouter.post('/productffff', cors({ origin: 'http://localhost:5173' }), async (req, res) => {
  try {
    const { email ,category,name,description,images,price, sellerId } = req.body; // Get email and new password
   // Validate inputs
    if (!email  ||!category || !images || !name || !description ||!price) {
      return res.status(400).json({ message: 'all fields are required' });
    }


    const newProduct = {
      'email': email, 
      'category': category,
      'images': images,
      'name': name,
      'description': description,
      'price': price,
      'sellerId':sellerId
    }
    const createProduct = await product.create(newProduct); // Store OTP in the database

    if (!createProduct) {
      return res.status(404).json({ message: 'Error occured while sending product' });
    }

    return res.status(200).json({ message: 'Product added successfully!' });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ success: false, message: 'Error occurred during creating product', error: error.message });
  }
}); 



  

// # USER SEARCH FOR PRODUCTS
// # USER SEARCH FOR USERS
// # USER CHAT
// # USER COMMENT
// # USER RATINGS
// # CODE OPTIMIZATION