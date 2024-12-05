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
    $access_token_payload = [
    'iss' => 'https://api.dreamrecord.net',
    'aud' => 'https://dreamrecord.net',
    'iat' => time(),
    'exp' => time() + (60 * 15), // 15 minutes
    'data' => [
        'userId' => $user['id'],
        'email' => $email
    ]
    ];

    $refresh_token_payload = [
        'iat' => time(),
        'exp' => time() + (60 * 60 * 24 * 30), // 30 jours
        'data' => [
            'userId' => $user['id'],
        ]
    ];

    $access_token = JWT::encode($access_token_payload, $secret_key, 'HS256');
    $refresh_token = JWT::encode($refresh_token_payload, $secret_key, 'HS256');

    // Stocker le refresh_token dans la base de données
    $stmt = $pdo->prepare('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)');
    $stmt->execute([$user['id'], $refresh_token]);


    echo json_encode([
    'status' => 'success',
    'message' => 'Connexion réussie.',
    'access_token' => $access_token,
    'refresh_token' => $refresh_token
    ]);

} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Email ou mot de passe incorrect.'
    ]);
}
?>
