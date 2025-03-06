<?php

require_once('../PDO.php');

$datos=$_POST['datos'];
$datos=json_decode($datos);

$NuevoUsuario=$conexion->prepare("INSERT INTO users (idRole_user,DNI_user,username_user,password_user,name_user,fnac_user) VALUES (:1,:2,:3,:4,:5,:6)");
$NuevoUsuario->bindParam(':1',$datos[5]);
$NuevoUsuario->bindParam(':2',$datos[1]);
$NuevoUsuario->bindParam(':3',$datos[3]);
$NuevoUsuario->bindParam(':4',$datos[4]);
$NuevoUsuario->bindParam(':5',$datos[0]);
$NuevoUsuario->bindParam(':6',$datos[2]);
if($NuevoUsuario->execute()){
  echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($NuevoUsuario->errorInfo());
}


?>
