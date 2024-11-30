<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// signup.php
require '../config.php';

// Récupérer les données POST
$data = json_decode(file_get_contents('php://input'), true);

$username = trim($data['username']);
$email = trim($data['email']);
$password = $data['password'];

// Vérifier si l'utilisateur existe déjà
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? OR username = ?');
$stmt->execute([$email, $username]);
$user = $stmt->fetch();

if ($user) {
    echo json_encode(['status' => 'error', 'message' => 'Email ou nom d\'utilisateur déjà utilisé.']);
    exit();
}

// Hacher le mot de passe
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insérer l'utilisateur dans la base de données
$stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
$stmt->execute([$username, $email, $hashed_password]);

echo json_encode(['status' => 'success', 'message' => 'Inscription réussie.']);
?>
