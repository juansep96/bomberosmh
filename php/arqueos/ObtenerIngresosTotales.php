<?php

require_once "../PDO.php";

$fechaIni = $_POST['fecha']." 00:00:00";
$fechaFin = $_POST['fecha']." 23:59:59";

$ObtenerTotales = $conexion -> prepare("SELECT SUM(total_venta) as 'bruto', SUM(efectivo_venta) as 'efectivo', SUM(cc_venta) as 'cc', SUM(transferencia_venta) as 'transferencia', SUM(cheque_venta) as 'cheque' FROM ventas WHERE (fechaHora_venta BETWEEN :1 AND :2) AND estado_venta=1 ");
$ObtenerTotales -> bindParam(':1',$fechaIni);
$ObtenerTotales -> bindParam(':2',$fechaFin);
$ObtenerTotales -> execute();

$result = $ObtenerTotales->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));


?>