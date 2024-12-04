<?php
header('Access-Control-Allow-Origin: https://dreamrecord.net');
// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
require '../config.php';
require '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "04ebb9d31172a954ec9db6dbf498a4ec83d3ea180cbf48cbe12e822f92cbf7d6"; 

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data === null) {
    echo json_encode(['status' => 'error', 'message' => 'Données JSON invalides ou manquantes.']);
    exit();
}

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Email et mot de passe requis.']);
    exit();
}

$email = trim($data['email']);
$password = $data['password'];

$stmt = $pdo->prepare('SELECT id, password FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Générer le token JWT
    $payload = [
        'iss' => 'https://api.dreamrecord.net', // émetteur du token
        'aud' => 'https://dreamrecord.net',      // audience du token
        'iat' => time(),                         // temps d'émission
        'exp' => time() + (60 * 60),             // expiration (1 heure)
        'data' => [
            'userId' => $user['id'],
            'email' => $email
        ]
    ];

    $jwt = JWT::encode($payload, $secret_key, 'HS256');

    echo json_encode([
        'status' => 'success',
        'message' => 'Connexion réussie.',
        'token' => $jwt
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Email ou mot de passe incorrect.'
    ]);
}
?>
