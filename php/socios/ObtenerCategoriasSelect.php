<?php

require_once('../PDO.php');


$ObtenerCategorias = $conexion -> query("SELECT * FROM categorias ORDER BY id_categoria ASC ");

$result = $ObtenerCategorias->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));

?>
