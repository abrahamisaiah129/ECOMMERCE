import express from "express";
import connectDb from "./config/dbConfig.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
const app =express();
const PORT =5555;
dotenv.config()
connectDb()
app.listen(PORT,()=>{
    console.log(`server is running  at  port : ${PORT}!!!`);
});
