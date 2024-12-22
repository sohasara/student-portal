<?php
include 'connection.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data (JSON)
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data && isset($data['stu_id'])) {
    
$stu_id = $data['stu_id'];


    $sql = "SELECT * FROM payment WHERE stu_id = ?";
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
    header('Content-Type: application/json');
    echo json_encode(["id" => 0,"total_fee" => 0,"total_bill" => 0,"total_paid" => 0,"discount" => 0,"stu_id" => 0]);
}
} else {
    header('Content-Type: application/json', true, 404);
    echo json_encode(["error" => "stu_id not provided"]);
}
}else{
    header('Content-Type: application/json');

    // header('Content-Type: application/json', true, 404);
    echo json_encode(["error" => "stu_id not provided..2"]);
}

$conn->close();
?>
