<?php

require_once('../PDO.php');

$idMetodo = $_POST['idMedio'];

$ObtenerMedio = $conexion -> prepare ("SELECT * from mediosDePago WHERE id_medio=:1");
$ObtenerMedio -> bindParam(':1',$idMetodo);
if($ObtenerMedio -> execute()){
    $result = $ObtenerMedio->fetchAll(\PDO::FETCH_ASSOC);
    print_r (json_encode($result));
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($ObtenerMedio->errorInfo());
}


?>