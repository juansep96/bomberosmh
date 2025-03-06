<?php

require_once "../PDO.php";

$fechaIni = $_POST['fecha']." 00:00:00";
$fechaFin = $_POST['fecha']." 23:59:59";

$ObtenerTotales = $conexion -> prepare("SELECT SUM(monto_egreso) as 'monto' FROM egresos WHERE (fechaHora_egreso BETWEEN :1 AND :2) AND estado_egreso=1");
$ObtenerTotales -> bindParam(':1',$fechaIni);
$ObtenerTotales -> bindParam(':2',$fechaFin);
$ObtenerTotales -> execute();

$result = $ObtenerTotales->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));


?>