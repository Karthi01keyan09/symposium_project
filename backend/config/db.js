const mysql = require("mysql2");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const dbName = process.env.DB_NAME || process.env.MYSQLDATABASE || "symposium_db";

// Create connection using environment variables, without specifying the database initially
const db = mysql.createConnection({
    host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
    user: process.env.DB_USER || process.env.MYSQLUSER || "root",
    password: process.env.DB_PASS || process.env.MYSQLPASSWORD || "",
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
    connectTimeout: 10000
});

// Connect to MySQL server
db.connect((err) => {
    if (err) {
        console.error("MySQL Server connection failed:", err.message);
        console.log("Please ensure MySQL is running on your computer and the credentials in .env are correct.");
        return;
    }
    console.log("Connected to MySQL server successfully");

    // Auto-create database if it doesn't exist
    db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
        if (err) {
            console.error("Failed to create database:", err.message);
            return;
        }

        // Switch to the database
        db.changeUser({ database: dbName }, (err) => {
            if (err) {
                console.error("Failed to switch database:", err.message);
                return;
            }
            console.log(`Using database: ${dbName}`);

            // Auto-create registrations table
            const createRegistrations = `
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
            db.query(createRegistrations, (err) => {
                if (err) console.error("Failed to create registrations table:", err.message);
                else console.log("Registrations table ready");
            });

            // Auto-create admins table with a default admin account
            const createAdmins = `
                CREATE TABLE IF NOT EXISTS admins (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                )
            `;
            db.query(createAdmins, (err) => {
                if (err) {
                    console.error("Failed to create admins table:", err.message);
                } else {
                    console.log("Admins table ready");
                    // Insert default admin if table is empty
                    db.query("SELECT COUNT(*) AS cnt FROM admins", (err, result) => {
                        if (!err && result[0].cnt === 0) {
                            db.query(
                                "INSERT INTO admins (username, password) VALUES (?, ?)",
                                ["admin", "admin123"],
                                (err) => {
                                    if (!err) console.log("Default admin created: admin / admin123");
                                }
                            );
                        }
                    });
                }
            });
        });
    });
});

module.exports = db;