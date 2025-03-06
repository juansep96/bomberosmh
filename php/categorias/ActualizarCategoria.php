<?php

require_once('../PDO.php');

$categoria = $_POST['categoria'];
$valor = $_POST['valor'];
$idCategoria = $_POST['idCategoria'];

$ActualizarCategoria = $conexion -> prepare ("UPDATE categorias SET nombre_categoria=:1,monto_categoria=:2 WHERE id_categoria=:3");
$ActualizarCategoria -> bindParam(':1',$categoria);
$ActualizarCategoria -> bindParam(':2',$valor);
$ActualizarCategoria -> bindParam(':3',$idCategoria);
if($ActualizarCategoria -> execute()){
    echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($ActualizarCategoria->errorInfo());
}


?>