<?php

require_once('../PDO.php');

$nombre = $_POST['nombre'];
$idMetodo = $_POST['idMedio'];

$ActualizarMetodo = $conexion -> prepare ("UPDATE mediosDePago SET nombre_medio=:1 WHERE id_medio=:2");
$ActualizarMetodo -> bindParam(':1',$nombre);
$ActualizarMetodo -> bindParam(':2',$idMetodo);
if($ActualizarMetodo -> execute()){
    echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($ActualizarMetodo->errorInfo());
}


?>