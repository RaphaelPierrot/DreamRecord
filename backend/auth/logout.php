<?php
header('Content-Type: application/json');
require '../config.php'; // Assure que $pdo est disponible

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['refresh_token'])) {
    echo json_encode(['status' => 'error', 'message' => 'Refresh token manquant.']);
    exit();
}

$refresh_token = $data['refresh_token'];

// Révoquer le token de rafraîchissement dans la base de données
$stmt = $pdo->prepare('UPDATE refresh_tokens SET revoked = TRUE WHERE token = ?');
$stmt->execute([$refresh_token]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['status' => 'success', 'message' => 'Déconnexion réussie.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Refresh token introuvable ou déjà révoqué.']);
}
?>