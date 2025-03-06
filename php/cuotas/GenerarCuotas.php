<?php

require_once "../PDO.php";

$ObtenerSocios = $conexion -> prepare("SELECT * from socios LEFT JOIN categorias ON idCategoria_socio = id_categoria WHERE estado_socio=1");
$ObtenerSocios -> execute();
$mesActual = date('m-Y');
foreach($ObtenerSocios as $Socio){
    //Tenemos que consultar si tenemos la cuota de este mes ya generada
    $idSocio = $Socio['id_socio'];
    $ObtenerCuotaMesActual = $conexion -> prepare("SELECT * from cuotas WHERE mes_cuota=:1 AND idSocio_cuota=:2");
    $ObtenerCuotaMesActual -> bindParam(':1',$mesActual);
    $ObtenerCuotaMesActual -> bindParam(':2',$idSocio);
    $ObtenerCuotaMesActual -> execute();
    if($ObtenerCuotaMesActual -> RowCount() == 0){ //No existe dicha cuota, la generamos. 
        $InsertarCuota = $conexion -> prepare("INSERT INTO cuotas (idCategoria_cuota,idSocio_cuota,monto_cuota,mes_cuota,idMetodoPago_cuota) values (:1,:2,:3,:4,:5)");
        $InsertarCuota -> bindParam(':1',$Socio['idCategoria_socio']);
        $InsertarCuota -> bindParam(':2',$idSocio);
        $InsertarCuota -> bindParam(':3',$Socio['monto_categoria']);
        $InsertarCuota -> bindParam(':4',$mesActual);
        $InsertarCuota -> bindParam(':5',$Socio['idMedioPago_socio']);
        if($InsertarCuota -> execute()){
            echo "Cuota generada... Socio: " . $Socio['id_socio'];
        }else{
            echo "\nPDO::errorInfo():\n";
            print_r($InsertarCuota->errorInfo());
        }
    }
}



?>