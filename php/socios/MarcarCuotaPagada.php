<?php

require_once('../PDO.php');

$datos = json_decode($_POST['datos'],true);
$estadoCuota = "PAGADA";

$MarcarCuota = $conexion -> prepare("UPDATE cuotas SET fechaPago_cuota=:1,estadoPago_cuota=:2,idMetodoPago_cuota=:3 WHERE id_cuota=:4");
$MarcarCuota -> bindParam(':1',$datos['fechaPago']);
$MarcarCuota -> bindParam(':2',$estadoCuota);
$MarcarCuota -> bindParam(':3',$datos['idMedioPago']);
$MarcarCuota -> bindParam(':4',$datos['idCuota']);
$MarcarCuota -> execute();

if($MarcarCuota->execute()){
    echo "OK";
  }else{
      echo "\nPDO::errorInfo():\n";
      print_r($MarcarCuota->errorInfo());
  }

?>
