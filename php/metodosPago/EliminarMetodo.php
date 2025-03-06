<?php

require_once('../PDO.php');

$idMetodo = $_POST['idMedio'];

$EliminarMetodo = $conexion -> prepare ("UPDATE mediosDePago SET estado_medio=0 WHERE id_medio=:1");
$EliminarMetodo -> bindParam(':1',$idMetodo);
if($EliminarMetodo -> execute()){
    echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($EliminarMetodo->errorInfo());
}


?>