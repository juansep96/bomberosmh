<?php

require_once('../PDO.php');

$idCategoria = $_POST['idCategoria'];

$ObtenerCategoria = $conexion -> prepare ("SELECT * from categorias WHERE id_categoria=:1");
$ObtenerCategoria -> bindParam(':1',$idCategoria);
if($ObtenerCategoria -> execute()){
    $result = $ObtenerCategoria->fetchAll(\PDO::FETCH_ASSOC);
    print_r (json_encode($result));
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($ObtenerCategoria->errorInfo());
}


?>