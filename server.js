import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();


// Connect MongoDB
connectDB();


// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend API is running",
    });
});


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);


// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});