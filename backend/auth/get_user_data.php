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
$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    echo json_encode(['status' => 'error', 'message' => 'Token non fourni.']);
    exit();
}

$authHeader = $headers['Authorization'];
list($type, $token) = explode(" ", $authHeader, 2);

if ($type !== 'Bearer' || empty($token)) {
    echo json_encode(['status' => 'error', 'message' => 'Format de token invalide.']);
    exit();
}

try {
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
    $user_id = $decoded->data->userId;
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Token invalide : ' . $e->getMessage()]);
    exit();
}

// Récupérer les informations de l'utilisateur
$stmt = $pdo->prepare('SELECT id, username, email, profile_image, daily_advice FROM users WHERE id = ?');
$stmt->execute([$user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(['status' => 'error', 'message' => 'Utilisateur non trouvé.']);
    exit();
}

// Récupérer les rêves de l'utilisateur
$stmt = $pdo->prepare('SELECT * FROM dreams WHERE user_id = ?');
$stmt->execute([$user_id]);
$dreams = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Récupérer les notifications de l'utilisateur
$stmt = $pdo->prepare('SELECT * FROM notifications WHERE user_id = ?');
$stmt->execute([$user_id]);
$notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Récupérer les analyses de l'utilisateur
$stmt = $pdo->prepare('SELECT * FROM analyses WHERE user_id = ?');
$stmt->execute([$user_id]);
$analyses = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Récupérer les conseils de l'utilisateur
$stmt = $pdo->prepare('SELECT * FROM advices WHERE user_id = ?');
$stmt->execute([$user_id]);
$advices = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Ajouter les données au tableau utilisateur
$user['dreams'] = $dreams;
$user['notifications'] = $notifications;
$user['analyses'] = $analyses;
$user['advices'] = $advices;

// Réponse JSON
echo json_encode(['status' => 'success', 'data' => $user]);
?>
