<?php

require_once('../PDO.php');

$idSocio = $_POST['idSocio'];

$EliminarSocio = $conexion -> prepare("UPDATE socios SET estado_socio=0 WHERE id_socio=:1 ");
$EliminarSocio -> bindParam(':1',$idSocio);
$EliminarSocio -> execute();

$result = $EliminarSocio->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));

?>
