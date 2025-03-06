var urlBase="./php/metodosPago/";

window.addEventListener('load', function() {
    obtenerMediosDePago();
  });

const obtenerMediosDePago = async () => {
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
  
    $('#metodos').DataTable({
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
            'url':urlBase+'ObtenerMetodos.php'
        },
        'columns': [
          { data: 'nombre_medio' },
          { data: 'acciones_medio' },
        ]
    });
}

const nuevoMetodoPago = async () => {
    let nombre = $("#nuevoMetodo").val();
    $("#modalNuevoMetodo").modal('hide');
    if(nombre){
        nombre = nombre.toUpperCase();
        $.post(urlBase+"NuevoMetodo.php",{nombre})
        .then((res)=>{
          if(res.length<15){
            $("#modalSocioNuevo").modal('hide');
            table =   $("#metodos").DataTable();
            info = table.page.info();
            page = info.page;
            table.ajax.reload();
            Lobibox.notify('success', {
                pauseDelayOnHover: true,
                continueDelayOnInactiveTab: false,
                position: 'top right',
                icon: 'bx bx-check-circle',
                msg: 'Metodo creado.',
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
            msg: 'Debe completar un nombre.',
          });
    }
}

const editarMedio = async (idMedio) => {
    $.post(urlBase+"ObtenerMedio.php",{idMedio})
    .then((res)=> {
        res = JSON.parse(res);
        res.forEach(e =>{
        $("#idMedio_edit").val(e.id_medio);
        $("#nuevoMetodo_edit").val(e.nombre_medio.toUpperCase());
      });
      $("#modalEditarMetodo").modal('show');
    })
}


const actualizarMetodoPago = async () => {
    let idMedio = $("#idMedio_edit").val();
    let nombre = $("#nuevoMetodo_edit").val();
    if(nombre){
        $("#modalEditarMetodo").modal('hide');
        nombre = nombre.toUpperCase();
        $.post(urlBase+"ActualizarMetodo.php",{nombre,idMedio})
        .then((res)=>{
          if(res.length<15){
            $("#metodoActualizado").modal('show');
            table =   $("#metodos").DataTable();
            info = table.page.info();
            page = info.page;
            table.ajax.reload();
            Lobibox.notify('success', {
                pauseDelayOnHover: true,
                continueDelayOnInactiveTab: false,
                position: 'top right',
                icon: 'bx bx-check-circle',
                msg: 'Metodo actualizado.',
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
            msg: 'Debe completar un nombre.',
          });
    }
}

const eliminarMedio = async (idMedio) => {
    Lobibox.confirm({
        msg: "Seguro  que desea eliminar este metodo de pago?",
        callback: function ($this, type, ev) {
          if(type=="yes"){
            $.post(urlBase+"EliminarMetodo.php",{idMedio})
            .then(()=>{
              Lobibox.notify('success', {
              pauseDelayOnHover: true,
              continueDelayOnInactiveTab: false,
              position: 'top right',
              icon: 'bx bx-check-circle',
              msg: 'Metodo eliminado con éxito.',
            });
            table =   $("#metodos").DataTable();
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