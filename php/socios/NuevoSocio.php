<?php

require_once('../PDO.php');

$datos=$_POST['datos'];
$datos=json_decode($datos,true);

$InsertarSocio=$conexion->prepare("INSERT INTO socios (dni_socio,apellido_socio,nombre_socio,fNacimiento_socio,cuil_socio,mail_socio,domicilio_socio,telefono_socio,idCategoria_socio,tipoSocio_socio,fechaAlta_socio,idMedioPago_socio,cbu_socio) VALUES (:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12,:13)");
$InsertarSocio->bindParam(':1',$datos['dni']);
$InsertarSocio->bindParam(':2',$datos['apellido']);
$InsertarSocio->bindParam(':3',$datos['nombre']);
$InsertarSocio->bindParam(':4',$datos['fnac']);
$InsertarSocio->bindParam(':5',$datos['cuil']);
$InsertarSocio->bindParam(':6',$datos['mail']);
$InsertarSocio->bindParam(':7',$datos['direccion']);
$InsertarSocio->bindParam(':8',$datos['telefono']);
$InsertarSocio->bindParam(':9',$datos['idTipoSocio']);
$InsertarSocio->bindParam(':10',$datos['tipoPersona']);
$InsertarSocio->bindParam(':11',$datos['fechaAlta']);
$InsertarSocio->bindParam(':12',$datos['medioPago']);
$InsertarSocio->bindParam(':13',$datos['cbu']);
if($InsertarSocio->execute()){
  $idSocio = $conexion -> lastInsertId();
  echo $idSocio;
}else{
    echo "\nPDO::errorInfo():\n";
    print_r($InsertarSocio->errorInfo());
}

?>
