<?php
include 'connection.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data (JSON)
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data && isset($data['stu_id'])) {
    
$stu_id = $data['stu_id'];


    $sql = "SELECT 
    Semester, 
    SUM(Total_Point) AS Total_Points_Sum, 
    SUM(Credit) AS Total_Credits
FROM 
    result
WHERE 
    stu_id = ? -- Replace with the desired student ID
GROUP BY 
    Semester;
";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $stu_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $payments = [];
    if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $payments[] = $row;
    }

    // Return data as JSON
    header('Content-Type: application/json');
    echo json_encode($payments);
}else{
    // Send error response if no rows are found
    header('Content-Type: application/json', true, 404);
    echo json_encode(["error" => "Data not found"]);
}
} else {
    header('Content-Type: application/json', true, 404);
    echo json_encode(["error" => "stu_id not provided"]);
}
}else{
    header('Content-Type: application/json');

    // header('Content-Type: application/json', true, 404);
    echo json_encode(["error" => "Not POST method..!"]);
}

$conn->close();
?>
