<?php

require_once('../PDO.php');

$idSocio = $_POST['idSocio'];

$ObtenerSocio = $conexion -> prepare("SELECT * FROM socios LEFT JOIN categorias ON idCategoria_socio=id_categoria left join mediosDePago ON idMedioPago_socio = id_medio WHERE id_socio=:1 ");
$ObtenerSocio -> bindParam(':1',$idSocio);
$ObtenerSocio -> execute();

$result = $ObtenerSocio->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));

?>
