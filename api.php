<?php

define('WP_API_URL', 'http://juanmi.lan/wp-json/wp/v2/posts/');
define('WP_AUTH_HEADER', 'Basic anVhbm1pOkJuZXIgalMxMSA3b2dxIFhXZGwgdHNESCA5YnlW');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['title']) || !isset($data['content'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Título y contenido son obligatorios']);
    exit;
}

$postData = [
    'title'   => $data['title'],
    'content' => $data['content']
];

$curl = curl_init(WP_API_URL);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: ' . WP_AUTH_HEADER
]);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($httpCode === 201) {
    echo json_encode(['success' => 'Entrada publicada correctamente']);
} else {
    http_response_code($httpCode);
    echo $response;
}
