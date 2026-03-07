CREATE DATABASE symposium_db;

USE symposium_db;

CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    college VARCHAR(150),
    event VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);