<?php
/**
 * Database Setup - Create Tables
 * MindCare Application
 */

require_once 'database.php';

// Create users table
$sql_users = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci";

if ($conn->query($sql_users) === TRUE) {
    echo "✓ Users table created successfully";
} else {
    echo "Error creating users table: " . $conn->error;
}

$conn->close();
?>
