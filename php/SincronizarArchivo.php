<?php
    require_once "PDO.php";
	  include 'Excel.php';
	  $xlsx = new SimpleXLSX( 'Calculador.xlsx' );
    $conexion->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //Aca vamos a tenr que comprobar si existe. Si existe, solo reemplazamos los datos electorales.

    foreach ($xlsx->rows() as $datos)	{
        $codigo=$datos[1];
        $equivalente = $datos[3];
        $ActualizarProducto = $conexion -> prepare("UPDATE productos SET peso_producto=:1 WHERE codigo_producto=:2");
        $ActualizarProducto -> bindParam(':1',$equivalente);
        $ActualizarProducto -> bindParam(':2',$codigo);
        if($ActualizarProducto -> execute()){
            echo "<br> Actualizado: ".$codigo;
        }else{
            echo "<br> Sin Actualizar: ".$codigo;
        }

      }
?>
