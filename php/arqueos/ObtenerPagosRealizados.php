<?php

require_once "../PDO.php";

$fechaIni = $_POST['fecha']." 00:00:00";
$fechaFin = $_POST['fecha']." 23:59:59";

$ObtenerPagosRealizados = $conexion -> prepare("SELECT SUM(total_cc) as total, medioPago_cc FROM ccProveedores WHERE (fechaHora_cc BETWEEN :1 AND :2) AND estado_cc=1 AND  tipoMovimiento_cc=2 GROUP BY medioPago_cc");
$ObtenerPagosRealizados -> bindParam(':1',$fechaIni);
$ObtenerPagosRealizados -> bindParam(':2',$fechaFin);
$ObtenerPagosRealizados -> execute();

$result = $ObtenerPagosRealizados->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));


?>