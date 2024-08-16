import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./api/config/database.js";
import userRoute from "./api/routes/userRoute.js";
import messageRoute from "./api/routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./api/socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
    origin: 'https://mernchat-app-beryl.vercel.app',
    credentials: true, // Allow credentials (cookies, headers, etc.)
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'X-Requested-With, Content-Type, Accept, Authorization'
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());
app.use(cors(corsOptions)); 

// Handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);

// Start server
server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
});
