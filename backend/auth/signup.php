<?php
// header('Access-Control-Allow-Origin: https://dreamrecord.net');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
require '../config.php';
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$secret_key = $_ENV['SECRET_KEY'];
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
