<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Origin: https://dreamrecord.net');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
// login.php
require '../config.php';

// Récupérer les données POST
$data = json_decode(file_get_contents('php://input'), true);

$email = trim($data['email']);
$password = $data['password'];

// Récupérer l'utilisateur correspondant
$stmt = $pdo->prepare('SELECT id, password FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Connexion réussie
    echo json_encode(['status' => 'success', 'message' => 'Connexion réussie.', 'userId' => $user['id']]);

} 
else {
    echo json_encode(['status' => 'success', 'message' => 'Connexion échoué.']);

}
?>
