const dns = require("dns");
dns.setServers([
"8.8.8.8",
"1.1.1.1"
]);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
res.status(200).json({
message: "Notes Management API is running"
});
});
app.use("/api/notes", noteRoutes);
const PORT = process.env.PORT || 5000;
const startServer = async () => {
try {
// Connect MongoDB
await connectDB();
// Start Express server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
console.log(
`Notes API: http://localhost:${PORT}/api/notes`
);
});
} catch (error) {
console.error(
"Failed to start server:",
error.message
);
process.exit(1);
}
};
// Start application
startServer();