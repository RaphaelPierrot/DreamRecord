<?php
header('Access-Control-Allow-Origin: *');
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
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    // Connexion réussie
    echo json_encode(['status' => 'success', 'message' => 'Connexion réussie.', 'userId' => $user['id']]);

} else {
    // Échec de la connexion
    echo json_encode(['status' => 'error', 'message' => 'Email ou mot de passe incorrect.']);
}
?>
