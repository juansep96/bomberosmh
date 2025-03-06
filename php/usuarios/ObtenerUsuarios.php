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
    $searchQuery = " AND (DNI_user LIKE :name  OR name_user LIKE :name or username_user LIKE :name) ";
    $searchArray = array(
        'name'=>"%$searchValue%"
   );
}

## Total number of records without filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM users WHERE active_user=1");
$stmt->execute();
$records = $stmt->fetch();
$totalRecords = $records['allcount'];

## Total number of records with filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM users WHERE 1 ".$searchQuery ."AND active_user=1");
$stmt->execute($searchArray);
$records = $stmt->fetch();
$totalRecordwithFilter = $records['allcount'];

## Fetch records
$stmt = $conn->prepare("SELECT * FROM users left join roles ON id_role=idRole_user WHERE 1 ".$searchQuery." AND active_user=1 ORDER BY ".$columnName." ".$columnSortOrder." LIMIT :limit,:offset");

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
  $idUsuario = $row['id_user'];
  $acciones = '<div class="d-flex align-items-center gap-3 fs-6"><a href="javascript:;" onclick="verUsuario('.$idUsuario.')" class="text-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="View detail" aria-label="Ver"><i class="bi bi-eye-fill"></i></a>';
   if($row['id_role']==1){
      $estado='<span class="badge bg-light-success text-success w-100">ADMINISTRADOR</span>';
   }else{
      $estado='<span class="badge bg-light-warning text-warning w-100">USUARIO</span>';
   }
  if($_SESSION['nombreRol']=='ADMIN'){
    $acciones = $acciones. '<a href="javascript:;" onclick="editarUsuario('.$idUsuario.')" class="text-warning" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Edit info" aria-label="Editar"><i class="bi bi-pencil-fill"></i></a>';
    $acciones = $acciones . '<a href="javascript:;" onclick="eliminarUsuario('.$idUsuario.')" class="text-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Delete" aria-label="Eliminar"><i class="bi bi-trash-fill"></i></a>';
  }
  
  $acciones = $acciones.'</div>';
   $data[] = array(
      "name_user"=>$row['name_user'],
      "DNI_user"=>$row['DNI_user'],
      "username_user"=>$row['username_user'],
      "fnac_user" => $row['fnac_user'],
      "name_role"=>$estado,
      "acciones_user"=>$acciones,
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