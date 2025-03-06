<?php

require_once "./PDO.php";

/*
$ObtenerVentas = $conexion -> query("SELECT * from ventas WHERE fechaHora_venta BETWEEN '2023-07-08 00:00:00' AND '2023-07-17 00:00:00' AND estado_venta=1");

foreach($ObtenerVentas as $Venta){
    $saldoCC = floatval($Venta['cc_venta']);
    if($saldoCC>0){
        $idVenta = $Venta['id_venta'];
        $fechaHora = $Venta['fechaHora_venta'];
        $cero = 0.00;
        $total = $Venta['total_venta'];
        $idCliente = $Venta['idCliente_venta'];
        $detalle = "SALDO GENERADO EN VENTA N° ".$idVenta;
        $tipoMovimiento = 1;
        $mediopago_cc = -1;
        $InsertarMovimiento = $conexion -> prepare ("INSERT INTO cc (fechaHora_cc,total_cc,idVenta_cc,idCliente_cc,detalle_cc,tipoMovimiento_cc,medioPago_cc) VALUES(:1,:2,:3,:4,:5,:6,:7)");
        $InsertarMovimiento -> bindParam(':1',$fechaHora);
        $InsertarMovimiento -> bindParam(':2',$total);
        $InsertarMovimiento -> bindParam(':3',$idVenta);
        $InsertarMovimiento -> bindParam(':4',$idCliente);
        $InsertarMovimiento -> bindParam(':5',$detalle);
        $InsertarMovimiento -> bindParam(':6',$tipoMovimiento);
        $InsertarMovimiento -> bindParam(':7',$mediopago_cc);
        if(!$InsertarMovimiento->execute()){
            echo "ERROR: ".$idVenta;
        }
    }

}*/


$ObtenerVentas = $conexion -> query("SELECT * from ingresoComprobantes WHERE fecha_ingCompro BETWEEN '2023-07-08' AND '2023-07-17' AND estado_ingCompro=1");

foreach($ObtenerVentas as $Venta){
    var_dump($Venta);
    $saldoCC = floatval($Venta['cc_ingCompro']);
    if($saldoCC>0){
        $idIngreso = $Venta['id_ingCompro'];
        $fechaHora = $Venta['fecha_ingCompro']." 00:00:00";
        $total = $Venta['cc_ingCompro'];
        $idProveedor = $Venta['idProveedor_ingCompro'];
        $detalle = "SALDO GENERADO EN EL COMPROBANTE N° ".$idIngreso;
        $tipoMovimiento = 1;
        $mediopago_cc = -1;
        $InsertarMovimiento = $conexion -> prepare ("INSERT INTO ccProveedores (fechaHora_cc,total_cc,idIngreso_cc,idProveedor_cc,detalle_cc,tipoMovimiento_cc,medioPago_cc) VALUES(:1,:2,:3,:4,:5,:6,:7)");
        $InsertarMovimiento -> bindParam(':1',$fechaHora);
        $InsertarMovimiento -> bindParam(':2',$total);
        $InsertarMovimiento -> bindParam(':3',$idIngreso);
        $InsertarMovimiento -> bindParam(':4',$idProveedor);
        $InsertarMovimiento -> bindParam(':5',$detalle);
        $InsertarMovimiento -> bindParam(':6',$tipoMovimiento);
        $InsertarMovimiento -> bindParam(':7',$mediopago_cc);
        if(!$InsertarMovimiento->execute()){
            echo "\nPDO::errorInfo():\n";
            print_r($InsertarMovimiento->errorInfo());
        }
    }

}

?>