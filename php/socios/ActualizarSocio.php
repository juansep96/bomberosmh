<?php

require_once('../PDO.php');

$datos=$_POST['datos'];
$datos=json_decode($datos,true);

$ActualizarSocio=$conexion->prepare("UPDATE socios SET dni_socio=:1,nombre_socio=:2,apellido_socio=:3,fNacimiento_socio=:4,cuil_socio=:5,mail_socio=:6,domicilio_socio=:7,telefono_socio=:8,idCategoria_socio=:9,tipoSocio_socio=:10,fechaAlta_socio=:11,idMedioPago_socio=:13,cbu_socio=:14 WHERE id_socio=:12");
$ActualizarSocio->bindParam(':1',$datos['dni']);
$ActualizarSocio->bindParam(':2',$datos['nombre']);
$ActualizarSocio->bindParam(':3',$datos['apellido']);
$ActualizarSocio->bindParam(':4',$datos['fnac']);
$ActualizarSocio->bindParam(':5',$datos['cuil']);
$ActualizarSocio->bindParam(':6',$datos['mail']);
$ActualizarSocio->bindParam(':7',$datos['direccion']);
$ActualizarSocio->bindParam(':8',$datos['telefono']);
$ActualizarSocio->bindParam(':9',$datos['idCategoria']);
$ActualizarSocio->bindParam(':10',$datos['idTipoSocio']);
$ActualizarSocio->bindParam(':11',$datos['fechaAlta']);
$ActualizarSocio->bindParam(':12',$datos['idSocio']);
$ActualizarSocio->bindParam(':13',$datos['medioPago']);
$ActualizarSocio->bindParam(':14',$datos['cbu']);

if($ActualizarSocio->execute()){
  echo "OK";
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($ActualizarSocio->errorInfo());
}


?>
