<?php

require_once "../PDO.php";

$datos = json_decode($_POST['datos'],true);

date_default_timezone_set("America/Argentina/Buenos_Aires");
setlocale(LC_ALL,"es_ES");
$cuando = date("Y-m-d H:i:s");

$InsertarEncabezado = $conexion -> prepare("INSERT INTO ingresoComprobantes (fecha_ingCompro,nro_ingCompro,idProveedor_ingCompro,tCompro_ingCompro,idUsuario_ingCompro,total_ingCompro,efectivo_ingCompro,cc_ingCompro,transferencia_ingCompro,cheque_ingCompro) values (:1,:2,:3,:4,:5,:6,:7,:8,:9,:10)");
$InsertarEncabezado -> bindParam(':1',$datos['fecha']);
$InsertarEncabezado -> bindParam(':2',$datos['nro']);
$InsertarEncabezado -> bindParam(':3',$datos['proveedor']);
$InsertarEncabezado -> bindParam(':4',$datos['tCompro']);
$InsertarEncabezado -> bindParam(':5',$_SESSION['idUser']);
$InsertarEncabezado -> bindParam(':6',$datos['total']);
$InsertarEncabezado -> bindParam(':7',$datos['efectivo']);
$InsertarEncabezado -> bindParam(':8',$datos['cc']);
$InsertarEncabezado -> bindParam(':9',$datos['transferencia']);
$InsertarEncabezado -> bindParam(':10',$datos['cheque']);
if($InsertarEncabezado->execute()){
    $idComprobante = $conexion->lastInsertId();
    foreach($datos['productos'] as $producto){
      $cantidad = $producto['cantidad'];
      $idProducto = $producto['id'];
      $InsertarDetalle = $conexion -> prepare("INSERT INTO ingresoDetalle (idComprobante_ingDetalle,idProducto_ingDetalle,cantidad_ingDetalle,unidad_ingDetalle) VALUES (:1,:2,:3,:4)");
      $InsertarDetalle -> bindParam(':1',$idComprobante);
      $InsertarDetalle -> bindParam(':2',$producto['id']);
      $InsertarDetalle -> bindParam(':3',$producto['cantidad']);
      $InsertarDetalle -> bindParam(':4',$producto['unidad']);
      $InsertarDetalle -> execute();
      /*
      //Aumentar stock segun lo ingresado
      if($producto['unidad']=="unidad"){
        $AumentarStock = $conexion -> query ("UPDATE productos SET stock_producto=stock_producto+'$cantidad' WHERE id_producto='$idProducto'");
      }else{
        $AumentarStock = $conexion -> query ("UPDATE productos SET peso_producto=peso_producto+'$cantidad' WHERE id_producto='$idProducto'");
      }*/
      //Aumentar Stock siempre al peso
      $AumentarStock = $conexion -> query ("UPDATE productos SET stock_producto=stock_producto+'$cantidad' WHERE id_producto='$idProducto'");
    }

    //Hay que insertar un nuevo movimiento en la Cuenta Corriente?
    if(floatval($datos['cc'])>0){ //Se inserta un nuevo registro en la CC del Cliente.
      $InsertarCC = $conexion -> prepare("INSERT INTO ccProveedores (fechaHora_cc,total_cc,idIngreso_cc,detalle_cc,tipoMovimiento_cc,idProveedor_cc) VALUES (:1,:2,:3,:4,:5,:6)");
      $InsertarCC -> bindParam(':1',$cuando);
      $InsertarCC -> bindParam(':2',$datos['cc']);
      $InsertarCC -> bindParam(':3',$idComprobante);
      $detalle = "SALDO GENERADO EN EL COMPROBANTE N° ".$idComprobante;
      $uno=1;
      $InsertarCC -> bindParam(':4',$detalle);
      $InsertarCC -> bindParam(':5',$uno);
      $InsertarCC -> bindParam(':6',$datos['proveedor']);
      if(!$InsertarCC -> execute()){
        echo "\nPDO::errorInfo():\n";
        print_r($InsertarCC->errorInfo());
      }
  }
    echo $idComprobante;
}else{
  echo "\nPDO::errorInfo():\n";
    print_r($InsertarEncabezado->errorInfo());
}


?>
