<?php

require_once "../PDO.php";

$conn=$conexion;
$fechaIni = $_GET['fecha'];


## Read value
$draw = $_POST['draw'];
$row = $_POST['start'];
$rowperpage = $_POST['length']; // Rows display per page
$columnIndex = $_POST['order'][0]['column']; // Column index
$columnName = $_POST['columns'][$columnIndex]['data']; // Column name
$columnSortOrder = $_POST['order'][0]['dir']; // asc or desc
$searchValue = $_POST['search']['value']; // Search value

$searchArray = array();

## Search
$searchQuery = " ";
if($searchValue != ''){
    $searchQuery = " AND (nombre_proveedor LIKE :name OR fecha_ingCompro LIKE :name) ";
    $searchArray = array(
        'name'=>"%$searchValue%"
   );
}

## Total number of records without filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM ingresoComprobantes WHERE estado_ingCompro=1 AND fecha_ingCompro ='$fechaIni'");
$stmt->execute();
$records = $stmt->fetch();
$totalRecords = $records['allcount'];

## Total number of records with filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM ingresoComprobantes WHERE 1 ".$searchQuery ."AND estado_ingCompro=1 AND fecha_ingCompro ='$fechaIni' ");
$stmt->execute($searchArray);
$records = $stmt->fetch();
$totalRecordwithFilter = $records['allcount'];

## Fetch records
$stmt = $conn->prepare("SELECT * FROM ingresoComprobantes LEFT JOIN users ON id_user=idUsuario_ingCompro LEFT JOIN proveedores ON id_proveedor=idProveedor_ingCompro WHERE 1 ".$searchQuery." AND estado_ingCompro=1 AND fecha_ingCompro ='$fechaIni' LIMIT :limit,:offset");

// Bind values
foreach($searchArray as $key=>$search){
   $stmt->bindValue(':'.$key, $search,PDO::PARAM_STR);
}

$stmt->bindValue(':limit', (int)$row, PDO::PARAM_INT);
$stmt->bindValue(':offset', (int)$rowperpage, PDO::PARAM_INT);
$stmt->execute();
$empRecords = $stmt->fetchAll();

$data = array();

foreach($empRecords as $row){
  $idComprobante=$row['id_ingCompro'];
  $fecha = date('d/m/Y',strtotime($row['fecha_ingCompro']));
  $acciones ='<div class="text-center" style="display:inline-flex"> <div class="export"><a href="javascript:;" onclick="AbrirComprobante('.$idComprobante.');" class="text-primary abrir" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="View detail" aria-label="Views"><i class="bi bi-eye-fill"></i></a>  </div> </div> </div>';
   $data[] = array(
      "id_comprobante"=>$idComprobante,
      "tipo_comprobante"=>$row['tCompro_ingCompro'],
      "nro_comprobante"=>$row['nro_ingCompro'],
      "fecha_comprobante"=>$fecha,
      "proveedor_comprobante"=>strtoupper($row['nombre_proveedor']),
      "nombre_usuario"=>strtoupper($row['name_user']),
      "acciones_comprobante"=>$acciones,
   );
}

## Response
$response = array(
   "draw" => intval($draw),
   "iTotalRecords" => $totalRecords,
   "iTotalDisplayRecords" => $totalRecordwithFilter,
   "aaData" => $data
);

echo json_encode($response);



?>