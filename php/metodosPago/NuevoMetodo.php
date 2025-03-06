<?php

require_once('../PDO.php');

$nombre = $_POST['nombre'];

$InsertarMetodo = $conexion -> prepare ("INSERT INTO mediosDePago (nombre_medio) values (:1)");
$InsertarMetodo -> bindParam(':1',$nombre);
if($InsertarMetodo -> execute()){
    echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($InsertarMetodo->errorInfo());
}


?>