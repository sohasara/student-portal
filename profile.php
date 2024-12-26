<?php
include 'connection.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data (JSON)
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data && isset($data['stu_id'])) {
    
$stu_id = $data['stu_id'];


    $sql = "SELECT 
    p.id AS profile_id,
    p.fathers_name,
    p.mothers_name,
    p.fathers_pro,
    p.mothers_pro,
    p.dob,
    p.religion,
    p.gender,
    p.nationality,
    p.contact,
    s.stu_id AS stu_id,
    s.full_name AS stu_name,
    s.program,
    s.batch,
    SUM(r.Credit) AS total_credits
FROM 
    profile p
JOIN 
    student s ON p.stu_id = s.stu_id
JOIN 
    result r ON p.stu_id = r.stu_id
WHERE 
    p.stu_id = ?;
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
    header('Content-Type: application/json');
    echo json_encode(["profile_id" => 0, "fathers_name" => "", "mothers_name" => "", "fathers_pro" => "", "mothers_pro" => "", "dob" => "", "religion" => "", "gender" => "", "nationality" => "", "contact" => 0, "stu_id" => 0, "stu_name" => "", "program" => "", "batch" => 0]
);}
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
