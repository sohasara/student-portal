<?php
include 'connection.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data (JSON)
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data && isset($data['stu_id'])) {
    
$stu_id = $data['stu_id'];


    $sql = "SELECT payment.id,payment.p_bill,payment.p_paid,payment.p_dis,payment.total_fee,payment.total_bill,payment.total_paid,payment.discount,installment.first,installment.second,installment.third FROM payment JOIN installment ON payment.semester = installment.semester WHERE payment.stu_id =? ORDER BY 
    payment.semester DESC  -- Assuming semester indicates the order, most recent first
LIMIT 1;";
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
    echo json_encode(["id" => 0,"total_fee" => 0,"total_bill" => 0,"total_paid" => 0,"discount" => 0,"first" => 0,"second" => 0,"third" => 0]);
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
