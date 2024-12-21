<?php
// Include database connection
include 'connection.php'; // Assuming db_connection.php contains the database connection logic


    // Query to find the user based on the username (password will be validated later)
   // SQL query to fetch data
$sql = "SELECT * FROM student";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
   header('Content-Type: application/json');
echo json_encode($data); 
}else {
    // Send error response if no rows are found
    header('Content-Type: application/json', true, 404);
    echo json_encode(['error' => 'No data found']);
}
$conn->close();
?>