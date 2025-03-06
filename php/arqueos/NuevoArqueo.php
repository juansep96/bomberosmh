<?php

require_once('../PDO.php');

$datos=$_POST['datos'];
$datos=json_decode($datos);

$idUsuario = $_SESSION['idUser'];

$NuevoArqueo=$conexion->prepare("INSERT INTO arqueos (fecha_arqueo,idUsuario_arqueo,ingresos_arqueo,efectivo_arqueo,cc_arqueo,transferencia_arqueo,cheque_arqueo,egresos_arqueo,neto_arqueo,cambio_arqueo,obs_arqueo) VALUES (:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11)");
$NuevoArqueo->bindParam(':1',$datos[0]);
$NuevoArqueo->bindParam(':2',$idUsuario);
$NuevoArqueo->bindParam(':3',$datos[1]);
$NuevoArqueo->bindParam(':4',$datos[2]);
$NuevoArqueo->bindParam(':5',$datos[3]);
$NuevoArqueo->bindParam(':6',$datos[4]);
$NuevoArqueo->bindParam(':7',$datos[5]);
$NuevoArqueo->bindParam(':8',$datos[6]);
$NuevoArqueo->bindParam(':9',$datos[7]);
$NuevoArqueo->bindParam(':10',$datos[8]);
$NuevoArqueo->bindParam(':11',$datos[9]);
if($NuevoArqueo->execute()){
  echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($NuevoArqueo->errorInfo());
}


?>
