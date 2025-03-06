<?php

require_once('../PDO.php');

$idCategoria = $_POST['idCategoria'];

$EliminarCategoria = $conexion -> prepare ("UPDATE categorias SET estado_categoria=0 WHERE id_categoria=:1");
$EliminarCategoria -> bindParam(':1',$idCategoria);
if($EliminarCategoria -> execute()){
    echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($EliminarCategoria->errorInfo());
}


?>