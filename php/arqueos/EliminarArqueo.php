<?php

require_once('../PDO.php');

$idArqueo = $_POST['idArqueo'];

$EliminarArqueo = $conexion -> prepare("UPDATE arqueos SET estado_arqueo=0 WHERE id_arqueo=:1 ");
$EliminarArqueo -> bindParam(':1',$idArqueo);
$EliminarArqueo -> execute();

$result = $EliminarArqueo->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));

?>
