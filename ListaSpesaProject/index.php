<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Leggi la lista della spesa dal file JSON
function getShoppingList() {
    $fileContents = file_get_contents('shoppingList.json');
    return json_decode($fileContents, true);
}

// Salva la lista della spesa nel file JSON
function saveShoppingList($shoppingList) {
    $jsonData = json_encode($shoppingList, JSON_PRETTY_PRINT);
    file_put_contents('shoppingList.json', $jsonData);
}

// Gestisci richieste GET e POST
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(getShoppingList());
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents('php://input'), true);
    saveShoppingList($postData);
    echo 'Lista della spesa aggiornata con successo';
}
?>
