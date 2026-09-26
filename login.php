<?php
header("Content-Type: application/json");

$username = $_POST["username"];
$password = $_POST["password"];

// Simple demo login
if ($username === "Michael" && $password === "test123") {
    echo json_encode([
        "loggedIn" => true,
        "username" => $username
    ]);
} else {
    echo json_encode([
        "loggedIn" => false
    ]);
}
?>