<?php

require_once "../PDO.php";

$ObtenerUltimoArqueo = $conexion -> prepare("SELECT * from arqueos WHERE estado_arqueo=1 ORDER BY fecha_arqueo DESC LIMIT 1");
$ObtenerUltimoArqueo -> execute();

if($ObtenerUltimoArqueo->RowCount()>0){
  foreach($ObtenerUltimoArqueo as $Arq){
    echo $Arq['cambio_arqueo'];
  }
}else{
  echo "0";
}
?>
