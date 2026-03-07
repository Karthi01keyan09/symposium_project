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

// Connect to database and create tables if they don't exist
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        console.error("Check your DB_HOST, DB_USER, DB_PASS, DB_NAME env vars in Render dashboard.");
        return;
    }
    console.log("Connected to MySQL database successfully");

    // Auto-create registrations table if it doesn't exist
    const createTable = `
        CREATE TABLE IF NOT EXISTS registrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            college VARCHAR(255) NOT NULL,
            event VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.query(createTable, (err) => {
        if (err) {
            console.error("Failed to create registrations table:", err.message);
        } else {
            console.log("Registrations table ready");
        }
    });
});

module.exports = db;