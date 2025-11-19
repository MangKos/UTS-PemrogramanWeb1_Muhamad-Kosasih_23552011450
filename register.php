<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$fullname = trim($data["fullname"] ?? "");
$email    = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if (!$fullname || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "Semua field wajib diisi"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Email tidak valid"]);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(["success" => false, "message" => "Password minimal 6 karakter"]);
    exit;
}

// Cek email
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
if ($stmt->get_result()->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email sudah terdaftar"]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$stmt = $conn->prepare("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $fullname, $email, $hashed);

if ($stmt->execute()) {
    $user_id = $stmt->insert_id;
    echo json_encode([
        "success" => true,
        "message" => "Registrasi berhasil",
        "user" => [
            "id" => $user_id,
            "fullname" => $fullname,
            "email" => $email,
            "created_at" => date('Y-m-d H:i:s')
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal registrasi"]);
}
?>

