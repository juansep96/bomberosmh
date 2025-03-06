<?php

require_once('../PDO.php');

$datos=$_POST['datos'];
$datos=json_decode($datos);

$ActualizarUsuario=$conexion->prepare("UPDATE users SET idRole_user=:1,DNI_user=:2,username_user=:3,password_user=:4,name_user=:5,fnac_user=:6 WHERE id_user=:7");
$ActualizarUsuario->bindParam(':1',$datos[0]);
$ActualizarUsuario->bindParam(':2',$datos[1]);
$ActualizarUsuario->bindParam(':3',$datos[2]);
$ActualizarUsuario->bindParam(':4',$datos[3]);
$ActualizarUsuario->bindParam(':5',$datos[4]);
$ActualizarUsuario->bindParam(':6',$datos[5]);
$ActualizarUsuario->bindParam(':7',$datos[6]);
if($ActualizarUsuario->execute()){
  echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($ActualizarUsuario->errorInfo());
}


?>
