const mysql = require("mysql2");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Create connection using environment variables (set in Render dashboard)
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    connectTimeout: 10000
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        console.error("Check your DB_HOST, DB_USER, DB_PASS, DB_NAME env vars in Render dashboard.");
        return;
    }
    console.log("Connected to MySQL database successfully");
});

module.exports = db;