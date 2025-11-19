<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "kesehatan_mental";  // NAMA DATABASE

$conn = new mysqli($host, $user, $pass);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Koneksi database gagal"]));
}

$conn->query("CREATE DATABASE IF NOT EXISTS $db");
$conn->select_db($db);
$conn->set_charset("utf8mb4");
?>
