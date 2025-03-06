<?php

require_once('../PDO.php');

$categoria = $_POST['categoria'];
$valor = $_POST['valor'];

$InsertarCategoria = $conexion -> prepare ("INSERT INTO categorias (nombre_categoria,monto_categoria) values (:1,:2)");
$InsertarCategoria -> bindParam(':1',$categoria);
$InsertarCategoria -> bindParam(':2',$valor);
if($InsertarCategoria -> execute()){
    echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($InsertarCategoria->errorInfo());
}


?>