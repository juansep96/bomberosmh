<?php

require_once "../PDO.php";

$conn=$conexion;

$idSocio = $_GET['idSocio'];

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
    $searchQuery = " AND (id_cuota like :name) ";
    $searchArray = array(
        'name'=>"%$searchValue%"
   );
}

## Total number of records without filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM cuotas WHERE estado_cuota=1 AND idSocio_cuota='$idSocio'");
$stmt->execute();
$records = $stmt->fetch();
$totalRecords = $records['allcount'];

## Total number of records with filtering
$stmt = $conn->prepare("SELECT COUNT(*) AS allcount FROM cuotas WHERE 1 ".$searchQuery ."AND estado_cuota=1  AND idSocio_cuota='$idSocio' ");
$stmt->execute($searchArray);
$records = $stmt->fetch();
$totalRecordwithFilter = $records['allcount'];

## Fetch records
$stmt = $conn->prepare("SELECT * FROM cuotas left join mediosDePago ON idMetodoPago_cuota=id_medio left join categorias ON idCategoria_cuota=id_categoria WHERE 1 ".$searchQuery." AND idSocio_cuota='$idSocio' ORDER BY mes_cuota ASC LIMIT :limit,:offset");

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
    $idCuota = $row['id_cuota'];
    if($row['estadoPago_cuota'] == "IMPAGO"){
        $estado='<span class="badge bg-light-danger text-danger w-100">IMPAGO</span>';
    }else{
        $estado='<span class="badge bg-light-success text-success w-100">PAGADA</span>';
    }  
    $acciones = $acciones.'</div>';
    if($row['fechaPago_cuota']){
        $originalDate = $row['fechaPago_cuota'];
        $newDate = date("d/m/Y", strtotime($originalDate));
    }else{
        $newDate ="-";
    }
    $acciones = '';
    if($row['estadoPago_cuota'] == 'IMPAGO'){
        $acciones = $acciones. '<a href="javascript:;" onclick="MarcarComoPagada('.$idCuota.')" class="text-info" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Edit info" aria-label="Editar"><i class="bx bx-badge-check"></i></a>';
    }
    if($row['idFactura_cuota'] != '0'){
        $idFactura = $row['idFactura_cuota'];
        $acciones = $acciones. '<a href="javascript:;" onclick="ImprimirRecibo('.$idFactura.')" class="text-info" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Edit info" aria-label="Editar"><i class="bx bx-printer"></i></a>';
    }


   $data[] = array(
      "mes_cuota"=>$row['mes_cuota'],
      "monto_cuota"=>'$ ' . number_format(floatval($row['monto_cuota']),2,',',''),
      "nombre_categoria"=>$row['nombre_categoria'],
      "fechaPago_cuota"=>$newDate,
      "estado_cuota"=>$estado,
      "nombre_metodo"=>strtoupper($row['nombre_medio']),
      "acciones_cuota"=>$acciones,
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