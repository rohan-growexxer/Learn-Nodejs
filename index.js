import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import hotelRoutes from './routes/hotel.js';
import roomRoutes from './routes/room.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Hotel Booking App Using NodeJs And MongoDB",
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ]
    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/users', authRoutes);
app.use('/api/v1/hotel', hotelRoutes);
app.use('/api/v1/room', roomRoutes);

app.use((err, req, res, next) => {
    const errorStatus = 500;
    const errorMessage = err.message || 'Something Went Wrong!!';
    return res.status(errorStatus).json({
        hasError: true,
        status: err.status || errorStatus,
        message: errorMessage
    });
});

app.listen(3000, () => {
    dbConnection();
    console.log(`Server Started on Port:3000!!`);
});