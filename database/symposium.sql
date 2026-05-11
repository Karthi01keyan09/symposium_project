CREATE DATABASE symposium_db;

USE symposium_db;

CREATE TABLE registrations (
    register_number VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    college VARCHAR(150),
    event VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);