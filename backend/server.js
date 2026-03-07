const express = require("express");
const path = require("path");
const cors = require("cors");

const db = require("./config/db");
const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Open CORS: admin panel can be opened from localhost OR any deployed URL
// and it always calls the Render backend (cross-origin), so we must allow all origins
app.use(cors({
    origin: "*",                                      // allow any origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", registrationRoutes);
app.use("/admin", adminRoutes);

// Serve frontend files
app.use(express.static(path.resolve(__dirname, "../frontend")));

// Default route
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});