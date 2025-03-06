<?php

require_once "../PDO.php";

$conn=$conexion;


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
    $searchQuery = " AND (nombre_categoria LIKE :name ) ";
    $searchArray = array(
        'name'=>"%$searchValue%"
   );
}

## Total number of records without filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM categorias WHERE estado_categoria=1");
$stmt->execute();
$records = $stmt->fetch();
$totalRecords = $records['allcount'];

## Total number of records with filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM categorias WHERE 1 ".$searchQuery ."AND estado_categoria=1");
$stmt->execute($searchArray);
$records = $stmt->fetch();
$totalRecordwithFilter = $records['allcount'];

## Fetch records
$stmt = $conn->prepare("SELECT * FROM categorias WHERE 1 ".$searchQuery." AND estado_categoria=1 ORDER BY nombre_categoria ASC LIMIT :limit,:offset");

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
  $acciones = '<div class="d-flex align-items-center gap-3 fs-6">';
  $idCategoria  = $row['id_categoria'];
  if($_SESSION['nombreRol']=='ADMIN'){
    $acciones = $acciones. '<a href="javascript:;" onclick="editarCategoria('.$idCategoria.')" class="text-warning" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Edit info" aria-label="Editar"><i class="bi bi-pencil-fill"></i></a>';
    $acciones = $acciones . '<a href="javascript:;" onclick="eliminarCategoria('.$idCategoria.')" class="text-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Delete" aria-label="Eliminar"><i class="bi bi-trash-fill"></i></a>';
  }
  
  $acciones = $acciones.'</div>';

   $data[] = array(
      "nombre_categoria"=>strtoupper($row['nombre_categoria']),
      "monto_categoria"=>'$ '. $row['monto_categoria'],
      "acciones_categoria"=>$acciones,
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