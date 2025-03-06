<?php

require_once('../PDO.php');

$ObtenerMedios = $conexion -> query("SELECT * FROM mediosDePago WHERE estado_medio=1 ORDER BY id_medio ASC ");

$result = $ObtenerMedios->fetchAll(\PDO::FETCH_ASSOC);
print_r (json_encode($result));

?>
