<?php

$type = $_GET['type'];
$json = [];
if ($type == 1) {
    $f = fopen('categories.csv', 'r');
    while (($data = fgetcsv($f)) !== false) {
        $t = [
            "id" => $data[0],
            "type" => $data[1],
            "name" => $data[2],
        ];
        array_push($json, $t);
    }
} else {
    $f = fopen('bill.csv', 'r');
    while (($data = fgetcsv($f)) !== false) {
        $t = [
            "type" => $data[0],
            "time" => is_numeric($data[1]) ? date("Y-m", $data[1] / 1000) : 0,
            "category" => $data[2],
            "amount" => $data[3],
        ];
        array_push($json, $t);
    }
}




array_shift($json);
echo json_encode($json, JSON_UNESCAPED_UNICODE);
