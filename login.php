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

$email    = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Email dan password wajib diisi"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

if (!$user || !password_verify($password, $user["password"])) {
    echo json_encode(["success" => false, "message" => "Email atau password salah"]);
    exit;
}

unset($user["password"]);

echo json_encode([
    "success" => true,
    "message" => "Login berhasil",
    "user" => $user
]);
?>
