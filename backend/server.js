const express = require("express");
const path = require("path");
const cors = require("cors");

const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", registrationRoutes);

// Serve frontend files - FIXED for Windows
app.use(express.static(path.resolve(__dirname, "../frontend")));

// Default route
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});