<?php

require_once('../PDO.php');

$idArqueo = $_POST['idArqueo'];

$ObtenerArqueo = $conexion -> prepare("SELECT * FROM arqueos LEFT JOIN users ON id_user=idUsuario_arqueo  WHERE id_arqueo=:1 ");
$ObtenerArqueo -> bindParam(':1',$idArqueo);
$ObtenerArqueo -> execute();

$result = $ObtenerArqueo->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));

?>
