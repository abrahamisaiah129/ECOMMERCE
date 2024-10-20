import express from "express";
import connectDb from "./config/dbConfig.js";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import inRoutes from './routes/inRoutes.js';
const app =express();
// app.use(cors);


app.use(cors({ origin: 'http://localhost:5173' }));
app.options('*', cors());



// const PORT = 5555;

const PORT =process.env.PORT || 5555;
dotenv.config();
connectDb(); 
app.listen(PORT,()=>{
    console.log(`server is running  at  port : ${PORT}!!!`);
});




// below is tehe cors policy for moving allowing data collection from another application on different server
// allow all origins wiuht default of cors(*)
// app.use(cors({
//     origin: 'http://localhost:5173'  // Replace with your frontend URL
// }));


app.use(express.json());
// for all prefix es of books handle them with this middleware
app.use('/auth',authRoutes);
// for login and sign up
app.use('/welcome',inRoutes);
// for other queries














