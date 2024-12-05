<?php
// refresh_token.php
// header('Access-Control-Allow-Origin: https://dreamrecord.net');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require '../config.php';
require '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Récupérer le refresh_token du client
$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!isset($data['refresh_token'])) {
    echo json_encode(['status' => 'error', 'message' => 'Refresh token manquant.']);
    exit();
}

$refresh_token = $data['refresh_token'];

try {
    $decoded = JWT::decode($refresh_token, new Key($secret_key, 'HS256'));
    $user_id = $decoded->data->userId;

    // Vérifier si le refresh_token existe dans la base de données
    $stmt = $pdo->prepare('SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ?');
    $stmt->execute([$user_id, $refresh_token]);
    $token_in_db = $stmt->fetch();

    if (!$token_in_db) {
        echo json_encode(['status' => 'error', 'message' => 'Refresh token invalide.']);
        exit();
    }

    // Générer un nouveau access_token
    $access_token_payload = [
        'iss' => 'https://api.dreamrecord.net',
        'aud' => 'https://dreamrecord.net',
        'iat' => time(),
        'exp' => time() + (60 * 15), // 15 minutes
        'data' => [
            'userId' => $user_id,
        ]
    ];

    $access_token = JWT::encode($access_token_payload, $secret_key, 'HS256');

    echo json_encode([
        'status' => 'success',
        'access_token' => $access_token
    ]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Refresh token invalide.']);
    exit();
}
?>