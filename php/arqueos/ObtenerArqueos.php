<?php

require_once "../PDO.php";

$conn=$conexion;
$fecha = $_GET['fecha'];
$fechaHasta = $_GET['fechaHasta'];


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
    $searchQuery = " AND (id_venta LIKE :name) ";
    $searchArray = array(
        'name'=>"%$searchValue%"
   );
}

## Total number of records without filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM arqueos WHERE estado_arqueo=1  AND (fecha_arqueo BETWEEN '$fecha' AND '$fechaHasta')");
$stmt->execute();
$records = $stmt->fetch();
$totalRecords = $records['allcount'];

## Total number of records with filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM arqueos WHERE 1 ".$searchQuery ."AND estado_arqueo=1  AND (fecha_arqueo BETWEEN '$fecha' AND '$fechaHasta') ");
$stmt->execute($searchArray);
$records = $stmt->fetch();
$totalRecordwithFilter = $records['allcount'];

## Fetch records
$stmt = $conn->prepare("SELECT * FROM arqueos LEFT JOIN users ON id_user=idUsuario_arqueo WHERE 1 ".$searchQuery." AND estado_arqueo=1  AND (fecha_arqueo BETWEEN '$fecha' AND '$fechaHasta') ORDER BY ".$columnName." ".$columnSortOrder." LIMIT :limit,:offset");

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
  $fecha = date('d/m/Y',strtotime($row['fecha_arqueo']));
  $idArqueo = $row['id_arqueo'];
  $acciones = '<div class="d-flex align-items-center gap-3 fs-6"><a href="javascript:;" onclick="VerArqueo('.$idArqueo.')" class="text-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Ver Arqueo" aria-label="Ver"><i class="bi bi-eye-fill"></i></a>';
  if($_SESSION['nombreRol']=='ADMIN'){
    $acciones = $acciones . '<a href="javascript:;" onclick="EliminarArqueo('.$idArqueo.')" class="text-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Eliminar Arqueo" aria-label="Eliminar"><i class="bi bi-trash-fill"></i></a>';
  }
  $acciones=$acciones ."</div>";
   $data[] = array(
      "fecha_arqueo"=>$fecha,
      "name_user"=>strtoupper($row['name_user']),
      "ingresos_arqueo"=>"$ ".$row['ingresos_arqueo'],
      "egresos_arqueo"=>"$ ".$row['egresos_arqueo'],
      "neto_arqueo"=>"$ ".$row['neto_arqueo'],
      "cambio_arqueo"=>"$ ".$row['cambio_arqueo'],
      "acciones_arqueo"=>$acciones,
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
