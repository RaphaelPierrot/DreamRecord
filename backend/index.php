<?php
$request = $_SERVER['REQUEST_URI'];

// Supprimer le préfixe '/backend' de l'URI
$request = str_replace('/backend', '', $request);

// Routage simple
switch ($request) {
    case '/auth/signup':
        require __DIR__ . '/auth/signup.php';
        break;
    case '/auth/login':
        require __DIR__ . '/auth/login.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['message' => 'Endpoint non trouvé.']);
        break;
}
?>
