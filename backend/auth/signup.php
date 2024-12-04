<?php
header('Access-Control-Allow-Origin: https://dreamrecord.net');
// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
use Firebase\JWT\JWT;
// signup.php
require '../config.php';
require '../vendor/autoload.php';
// Récupérer les données POST
$data = json_decode(file_get_contents('php://input'), true);
$secret_key = "04ebb9d31172a954ec9db6dbf498a4ec83d3ea180cbf48cbe12e822f92cbf7d6"; 

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
$user_id = $pdo->lastInsertId();

// Générer le token JWT
$payload = [
    'iss' => 'https://api.dreamrecord.net',
    'aud' => 'https://dreamrecord.net',
    'iat' => time(),
    'exp' => time() + (60 * 60),
    'data' => [
        'userId' => $user_id,
        'email' => $email
    ]
];

$jwt = JWT::encode($payload, $secret_key, 'HS256');

echo json_encode([
    'status' => 'success',
    'message' => 'Inscription réussie.',
    'token' => $jwt
]);
?>
