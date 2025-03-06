<?php

require_once "../PDO.php";

$fechaIni = $_POST['fecha']." 00:00:00";
$fechaFin = $_POST['fecha']." 23:59:59";

$ObtenerPagosRecibidos = $conexion -> prepare("SELECT SUM(total_cc) as 'total', medioPago_cc FROM cc WHERE (fechaHora_cc BETWEEN :1 AND :2) AND estado_cc=1 AND idVenta_cc=0 AND tipoMovimiento_cc=2 GROUP BY medioPago_cc");
$ObtenerPagosRecibidos -> bindParam(':1',$fechaIni);
$ObtenerPagosRecibidos -> bindParam(':2',$fechaFin);
$ObtenerPagosRecibidos -> execute();

$result = $ObtenerPagosRecibidos->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));


?>