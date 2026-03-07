const mysql = require("mysql2");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Create connection using Railway environment variables
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to Railway MySQL successfully");
});

module.exports = db;