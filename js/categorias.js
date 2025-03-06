var urlBase="./php/categorias/";

window.addEventListener('load', function() {
    obtenerCategorias();
  });

const obtenerCategorias = async () => {
    $.extend( true, $.fn.dataTable.defaults, {
        "language": {
            "decimal": ",",
            "thousands": ".",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoPostFix": "",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "loadingRecords": "Cargando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "processing": "Procesando...",
            "search": "Buscar:",
            "searchPlaceholder": "",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningún dato disponible en esta tabla",
            "aria": {
                "sortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            //only works for built-in buttons, not for custom buttons
            "buttons": {
                "create": "Nuevo",
                "edit": "Cambiar",
                "remove": "Borrar",
                "copy": "Copiar",
                "csv": "fichero CSV",
                "excel": "Excel",
                "pdf": "PDF",
                "print": "Imprimir",
                "colvis": "Visibilidad columnas",
                "collection": "Colección",
                "upload": "Seleccione fichero...."
            },
            "select": {
                "rows": {
                    _: '%d filas seleccionadas',
                    0: 'clic fila para seleccionar',
                    1: 'una fila seleccionada'
                }
            }
        }
    } );
  
    $('#categorias').DataTable({
        'responsive': false,
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ordering' : 'false',
        dom: 'Blfrtip',
          buttons: [
              'excel', 'pdf', 'print'
          ],
          "lengthMenu": [ 10, 25, 50, 75, 100,500,1000 ],
        'ajax': {
            'url':urlBase+'ObtenerCategorias.php'
        },
        'columns': [
          { data: 'nombre_categoria' },
          { data: 'monto_categoria' },
          { data: 'acciones_categoria' },
        ]
    });
}

const nuevaCategoria = async () => {
    let categoria = $("#nuevaCategoria").val();
    let valor = $("#montoNuevacategoria").val();
    if(categoria && valor){
        $("#modalNuevaCategoria").modal('hide');
        categoria = categoria.toUpperCase();
        valor = parseFloat(valor).toFixed(2);
        $.post(urlBase+"NuevaCategoria.php",{categoria,valor})
        .then((res)=>{
          if(res.length<15){
            $("#modalCategoriaNueva").modal('hide');
            table =   $("#categorias").DataTable();
            info = table.page.info();
            page = info.page;
            table.ajax.reload();
            Lobibox.notify('success', {
                pauseDelayOnHover: true,
                continueDelayOnInactiveTab: false,
                position: 'top right',
                icon: 'bx bx-check-circle',
                msg: 'Categoria creada.',
              });
          }else{
            Lobibox.notify('warning', {
              pauseDelayOnHover: true,
              continueDelayOnInactiveTab: false,
              position: 'top right',
              icon: 'bx bx-message-error',
              msg: 'Error al Crear. Contacte a SOFTWEARE.',
            });
          }
        });
    }else{
        Lobibox.notify('error', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-message-error',
            msg: 'Debe completar una categoria y monto de cuota.',
          });
    }
}

const editarCategoria = async (idCategoria) => {
    $.post(urlBase+"ObtenerCategoria.php",{idCategoria})
    .then((res)=> {
        res = JSON.parse(res);
        res.forEach(e =>{
        $("#idCategoria_edit").val(e.id_categoria);
        $("#nuevaCategoria_edit").val(e.nombre_categoria.toUpperCase());
        $("#valorNuevaCategoria_edit").val(parseFloat(e.monto_categoria).toFixed(2));
      });
      $("#modalEditarCategoria").modal('show');
    })
}


const actualizarCategoria = async () => {
    let idCategoria = $("#idCategoria_edit").val();
    let categoria = $("#nuevaCategoria_edit").val();
    let valor = $("#valorNuevaCategoria_edit").val();
    if(categoria && valor){
        $("#modalEditarCategoria").modal('hide');
        categoria = categoria.toUpperCase();
        valor = parseFloat(valor).toFixed(2);
        $.post(urlBase+"ActualizarCategoria.php",{categoria,valor,idCategoria})
        .then((res)=>{
          if(res.length<15){
            $("#categoriaActualizada").modal('show');
            table =   $("#categorias").DataTable();
            info = table.page.info();
            page = info.page;
            table.ajax.reload();
            Lobibox.notify('success', {
                pauseDelayOnHover: true,
                continueDelayOnInactiveTab: false,
                position: 'top right',
                icon: 'bx bx-check-circle',
                msg: 'Categoria actualizada.',
              });
          }else{
            Lobibox.notify('warning', {
              pauseDelayOnHover: true,
              continueDelayOnInactiveTab: false,
              position: 'top right',
              icon: 'bx bx-message-error',
              msg: 'Error al actualizar. Contacte a SOFTWEARE.',
            });
          }
        });
    }else{
        Lobibox.notify('error', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-message-error',
            msg: 'Debe completar una categoria y valor de cuota.',
          });
    }
}

const eliminarCategoria = async (idCategoria) => {
    Lobibox.confirm({
        msg: "Seguro  que desea eliminar esta categoria de socio?",
        callback: function ($this, type, ev) {
          if(type=="yes"){
            $.post(urlBase+"EliminarCategoria.php",{idCategoria})
            .then(()=>{
              Lobibox.notify('success', {
              pauseDelayOnHover: true,
              continueDelayOnInactiveTab: false,
              position: 'top right',
              icon: 'bx bx-check-circle',
              msg: 'Categoria eliminada con éxito.',
            });
            table =   $("#categorias").DataTable();
            let info = table.page.info();
            let page = info.page;
            table.ajax.reload();
            table.page( page ).draw( false );
            });
          }else{
            Lobibox.notify('warning', {
              pauseDelayOnHover: true,
              continueDelayOnInactiveTab: false,
              position: 'top right',
              icon: 'bx bx-message-error',
              msg: 'Acción cancelada.',
            });
          }
      }
      });
}