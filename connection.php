<?php
// Database credentials
$servername = "localhost"; // Replace with your database host (e.g., '127.0.0.1' or 'localhost')
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "student_portal"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// echo "Connected successfull with ". $dbname ." Database.";
?>
