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
    $searchQuery = " AND (dni_socio LIKE :name  OR apellido_socio LIKE :name or nombre_socio LIKE :name or cuil_socio LIKE :name) ";
    $searchArray = array(
        'name'=>"%$searchValue%"
   );
}

## Total number of records without filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM socios WHERE estado_socio=1");
$stmt->execute();
$records = $stmt->fetch();
$totalRecords = $records['allcount'];

## Total number of records with filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM socios WHERE 1 ".$searchQuery ."AND estado_socio=1");
$stmt->execute($searchArray);
$records = $stmt->fetch();
$totalRecordwithFilter = $records['allcount'];

## Fetch records
$stmt = $conn->prepare("SELECT * FROM socios LEFT JOIN mediosDePago ON id_medio = idMedioPago_socio left join categorias ON idCategoria_socio=id_categoria WHERE 1 ".$searchQuery." AND estado_socio=1 ORDER BY apellido_socio,nombre_socio ASC LIMIT :limit,:offset");

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
  $Saldo=0.00;
  $idSocio = $row['id_socio'];
  $estado = "IMPAGO";
  $ObtenerCuotasImpagas=$conexion -> prepare("SELECT SUM(monto_cuota) as saldo FROM cuotas WHERE idSocio_cuota=:1 AND estadoPago_cuota=:2");
  $ObtenerCuotasImpagas -> bindParam(':1',$idSocio);
  $ObtenerCuotasImpagas -> bindParam(':2',$estado);
  $ObtenerCuotasImpagas -> execute();
  foreach($ObtenerCuotasImpagas as $Cuotas){
        $Saldo = floatval($Cuotas['saldo']);
  }
  $acciones = '<div class="d-flex align-items-center gap-3 fs-6"><a href="javascript:;" onclick="VerSocio('.$idSocio.')" class="text-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="View detail" aria-label="Ver"><i class="bi bi-eye-fill"></i></a>';
  if($Saldo<=0){
      $estado='<span class="badge bg-light-success text-success w-100"> $'.number_format($Saldo,2).'</span>';
   }else{
      $estado='<span class="badge bg-light-danger text-danger w-100"> $'.number_format($Saldo,2).'</span>';
   }

  if($_SESSION['nombreRol']=='ADMIN'){
    $acciones = $acciones. '<a href="javascript:;" onclick="EditarSocio('.$idSocio.')" class="text-warning" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Edit info" aria-label="Editar"><i class="bi bi-pencil-fill"></i></a>';
    $acciones = $acciones . '<a href="javascript:;" onclick="EliminarSocio('.$idSocio.')" class="text-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Delete" aria-label="Eliminar"><i class="bi bi-trash-fill"></i></a>';
  }
  
  $acciones = $acciones.'</div>';

   $data[] = array(
        "id_socio"=>$row['id_socio'],
        "apellido_socio"=>strtoupper($row['nombre_socio']),
        "nombre_socio"=>strtoupper($row['apellido_socio']),
        "dni_socio"=>$row['dni_socio'],
        "nombre_categoria"=>$row['nombre_categoria'],
        "fNacimiento_socio"=>date('d/m/Y',strtotime($row['fNacimiento_socio'])),
        "cuil_socio"=>$row['cuil_socio'],
        "mail_socio"=>$row['mail_socio'],
        "domicilio_socio"=>$row['domicilio_socio'],
        "telefono_socio"=>$row['telefono_socio'],
        "fechaAlta_socio"=>date('d/m/Y',strtotime($row['fechaAlta_socio'])),
        "medioAlta_socio"=>$row['medioAlta_socio'],
        "idMedioPago_socio"=>$row['nombre_medio'],
        "cbu_socio"=>$row['cbu_socio'],
        "saldo_socio"=>$estado,
        "acciones_socio"=>$acciones,
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