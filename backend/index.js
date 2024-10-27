import express from "express";
import connectDb from "./config/dbConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"; 

// Load environment variables
dotenv.config();

// Initialize the app and set up middlewares
const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // Enable CORS for frontend
app.options("*", cors()); // Pre-flight requests support
app.use(express.json()); // Middleware for parsing JSON requests

// Connect to the database
connectDb(); 

// Define API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/otp", otpRoutes); 

// Start the server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}!!!`);
});
