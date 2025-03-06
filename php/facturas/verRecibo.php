<?php


require_once '../PDO.php';

include_once ('./neopdf/visor.php');

ob_start();

$idFactura = $_GET['idFactura'];
$qr="no";
$items = [];
$ivas=[];

$ObtenerDatos = $conexion -> prepare("SELECT * FROM facturas LEFT JOIN cuotas ON id_factura = idFactura_cuota LEFT JOIN socios ON idSocio_cuota = id_socio LEFT JOIN categorias ON idCategoria_socio = id_categoria WHERE id_factura=:1");
$ObtenerDatos -> bindParam(':1',$idFactura);
$ObtenerDatos -> execute();

foreach($ObtenerDatos as $row){
    $cae = $row['CAE_factura'];
    $codigoItem = $row['id_socio'];
    $detalleitem = "CUOTA SOCIAL - ".strtoupper($row['nombre_categoria']) . " - MES " .$row['mes_cuota'];
    $importeItem = $row['monto_cuota'];
    $idSocio = $row['id_socio'];
    $compobante_numero = $row['numero_factura'];
    $comprobante_pventa = $row['PDV_factura'];
    $cae = $row['CAE_factura'];
    $letraFactura = "C";
    $fechaVencimientoCAE = $row['fechaVencimiento_factura'];
    $tipoResponsable = "CONSUMIDOR FINAL";
    $cliente_razon = strtoupper($row['apellido_socio']) . ' ' . strtoupper($row['nombre_socio']);
    $cliente_dir = $row['domicilio_socio'];
    $fecha = $row['fechaPago_cuota'];
    $fecha = str_replace("-","",$fecha);
    $codigoTipoComprobante = "15";
    $tipoComprobante = "RECIBO C";
    $codigotipodocumento = 86;
    $tipoDocumento = "CUIL";
    $numeroDocumento = $row['cuil_socio'];
    $condicionVenta = "CONTADO";
    $total_factura_iva=floatval($importeItem);
    $total_factura = floatval($importeItem);
    $total_iva=0.00;
    $qr="no";
}

$item = Array
(
    "codigo" => $codigoItem,
    "scanner" => $codigoItem,
    "detalle" => $detalleitem,
    "codigoUnidadMedida" => 7,
    "UnidadMedida" => 'Unidad',
    "codigoCondicionIVA" => 2,
    "Alic" => 3,
    "cantidad" => 1,
    "porcBonif" => 0.000,
    "impBonif" => 0.000,
    "precio" => $importeItem,
    "importeIVA" => 0.000,
    "calc_total" => $importeItem,
);

//var_dump($item);


array_push($items,$item);


$config = [
    "TRADE_SOCIAL_REASON"=> "SOC. DE BOMBEROS VOLUNTARIOS DE MTE. HSO.",
    "TRADE_CUIT"=> "30681197156",
    "TRADE_ADDRESS"=> "1RO DE ABRIL Nº 362 - MTE. HSO.",
    "TRADE_TAX_CONDITION"=> "IVA EXENTO",
    "TRADE_INIT_ACTIVITY"=> "20040601",
    "TRADE_IIBB"=>"30681197156",
    "VOUCHER_OBSERVATION"=>"",
];

$voucher = Array
(
    "idVoucher" => $idVenta,
    "numeroComprobante" => $compobante_numero,
    "numeroPuntoVenta" => $comprobante_pventa,
    "cae" => $cae,
    "letra" => $letraFactura,
    "fechaVencimientoCAE" => $fechaVencimientoCAE,
    "tipoResponsable" => $tipoResponsable,
    "nombreCliente" =>  $cliente_razon,
    "domicilioCliente" => $cliente_dir,
    "fechaComprobante" => $fecha,
    "codigoTipoComprobante" => $codigoTipoComprobante,
    "TipoComprobante" => $tipoComprobante,
    "codigoConcepto" => 1, // 1 productos -2 servicios
    "codigoMoneda" => "PES",
    "cotizacionMoneda" => 1.000,
    "fechaDesde" => $fecha,//20190303,
    "fechaHasta" => $fecha,//20190303,
    "fechaVtoPago" => $fecha,//20190303,
    "codigoTipoDocumento" => $codigotipodocumento,
    "TipoDocumento" => $tipoDocumento,
    "numeroDocumento" => $numeroDocumento,
    "importeTotal" => $total_factura_iva,//121.000,
    "importeOtrosTributos" => 0.000,
    "importeGravado" => $total_factura,//100.000,
    "importeNoGravado" => 0.000,
    "importeExento" => 0.000,
    "importeIVA" => $total_iva,//21.000,
    "codigoPais" => 200,
    "idiomaComprobante" => 1,
    "NroRemito" => 0,
    "CondicionVenta" => $condicionVenta,
    "items" => $items,
    "subtotivas" => $ivas,
    "Tributos" => Array(),
   "CbtesAsoc" => Array(),
    "qr" => $qr,
);


$logo_path = './neopdf/logo.png';

$pdf = new PDFVoucher($voucher, $config);
$pdf->emitirPDF($logo_path);

$datetmp = date('Y-m-d', strtotime($fecha));

$pdf->Output($datetmp.'-'.$cliente_razon."-".$letraFactura.$compobante_numero.".pdf");

?>