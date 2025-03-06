<?php

require_once('../PDO.php');

$idUsuario = $_POST['idUsuario'];

$ObtenerUsuario = $conexion -> prepare("SELECT * FROM users LEFT JOIN roles ON id_role=idRole_user WHERE id_user=:1 ");
$ObtenerUsuario -> bindParam(':1',$idUsuario);
$ObtenerUsuario -> execute();

$result = $ObtenerUsuario->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));

?>
