import dns from "dns";
dns.setServers([
"8.8.8.8",
"1.1.1.1",
]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Authentication routes
app.use(
"/api/auth",
authRoutes
);

// Student routes
app.use(
"/api/students",
studentRoutes
);

// Course routes
app.use(
"/api/courses",
courseRoutes
);

app.get("/", (req, res) => {
res.status(200).json({
message:
"Student Portal API is running 🚀",
});
});

app.use((req, res) => {
res.status(404).json({
message: "API route not found",
path: req.originalUrl,
});
});

const PORT =
process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(
`Server running on port ${PORT} 🚀`
);
});