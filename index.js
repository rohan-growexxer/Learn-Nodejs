import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

//Database Connection
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MOGNO_DB_URL);
        console.log("Connected Databse");
    } catch (error) {
        throw error;
    }
}
//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/users', authRoutes);

app.use((err, req, res, next) => {
    const errorStatus = 500;
    const errorMessage = err.message || 'Something Went Wrong!!';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
});

app.listen(3000, () => {
    dbConnection();
    console.log(`Server Started on Port:3000!!`);
});