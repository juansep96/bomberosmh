<?php

require_once "../PDO.php";

$fechaIni = $_POST['desde'];
$fechaFin = $_POST['hasta'];

$ObtenerTotales = $conexion -> prepare("SELECT SUM(ingresos_arqueo) as 'ingresos', SUM(efectivo_arqueo) as 'efectivo', SUM(cc_arqueo) as 'cc', SUM(transferencia_arqueo) as 'transferencia', SUM(cheque_arqueo) as 'cheque', SUM(egresos_arqueo) as 'egresos', SUM(neto_arqueo) as 'neto' FROM arqueos WHERE (fecha_arqueo BETWEEN :1 AND :2) AND estado_arqueo=1 ");
$ObtenerTotales -> bindParam(':1',$fechaIni);
$ObtenerTotales -> bindParam(':2',$fechaFin);
$ObtenerTotales -> execute();

$result = $ObtenerTotales->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));


?>