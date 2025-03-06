var urlBase="./php/usuarios/";

$(document).ready(function() {
  cargarUsuarios();
});


function cargarUsuarios(){
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
              "last": "Ãšltimo",
              "next": "Siguiente",
              "previous": "Anterior"
          },
          "processing": "Procesando...",
          "search": "Buscar:",
          "searchPlaceholder": "",
          "zeroRecords": "No se encontraron resultados",
          "emptyTable": "NingÃºn dato disponible en esta tabla",
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
              "csv": "CSV",
              "excel": "Excel",
              "pdf": "PDF",
              "print": "Imprimir",
              "colvis": "Visibilidad columnas",
              "collection": "ColecciÃ³n",
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

  $('#usuarios').DataTable({
      'responsive': false,
      'processing': true,
      'serverSide': true,
      'serverMethod': 'post',
      dom: 'Blfrtip',
        buttons: [
            'excel', 'pdf', 'print'
        ],
      'ajax': {
          'url':urlBase+'ObtenerUsuarios'
      },
      'columns': [
        { data: 'name_user' },
        { data: 'DNI_user' },
        { data: 'username_user' },
        { data: 'fnac_user' },    
        { data: 'name_role' },
        { data: 'acciones_user'},
      ]
  });
}


function nuevoUsuario(){
    nombre = $("#nombre").val();
    dni = $("#dni").val();
    fnac = $("#fnac").val();
    usuario = $("#username").val();
    contrasena = $("#password").val();
    contrasena2 = $("#password2").val();
    rol=$("#permisos").val();
    if(contrasena === contrasena2){
        if(nombre && usuario && contrasena){
            let datos = [
              nombre,
              dni,
              fnac,
              usuario,
              contrasena,
              rol,
            ];
            datos = JSON.stringify(datos);
            $.post(urlBase+"NuevoUsuario",{datos})
            .then((res)=>{
              if(res=="OK"){
                $("#usuarioCreado").modal('show');
                $("#modalNuevoUsuario").modal('hide');

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
              msg: 'Faltan campos por completar.',
            });
          }
    }else{
        Lobibox.notify('error', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-message-error',
            msg: 'Las contraseñas no coinciden.',
          });
    }
}



function verUsuario(idUsuario){
    $.post(urlBase+"ObtenerUsuario",{idUsuario})
      .then((res)=>{
        res=JSON.parse(res);
        res.forEach((e)=>{
          $("#nombre_ver").val(e.name_user.toUpperCase());
          $("#dni_ver").val(e.DNI_user);
          $("#username_ver").val(e.username_user);
          $("#fnac_ver").val(e.fnac_user);
          $("#permisos_ver").val(e.id_role);
        });
        $("#modalVerUsuario").modal('show');
      });
}


function eliminarUsuario(idUsuario){
    Lobibox.confirm({
      msg: "Seguro  que desea eliminar este usuario?",
      callback: function ($this, type, ev) {
        if(type=="yes"){
          $.post(urlBase+"EliminarUsuario",{idUsuario})
          .then(()=>{
            Lobibox.notify('success', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-check-circle',
            msg: 'Usuario eliminado con Ã©xito.',
          });
          table =   $("#usuarios").DataTable();
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

function editarUsuario(idUsuario){
    $.post(urlBase+"ObtenerUsuario",{idUsuario})
      .then((res)=>{
        res=JSON.parse(res);
        res.forEach((e)=>{
          $("#idUsuario_edit").val(e.id_user);
          $("#nombre_edit").val(e.name_user.toUpperCase());
          $("#dni_edit").val(e.DNI_user);
          $("#username_edit").val(e.username_user);
          $("#password_edit").val(e.password_user);
          $("#password2_edit").val(e.password_user);
          $("#fnac_edit").val(e.fnac_user);
          $("#permisos_edit").val(e.id_role);
        });
        $("#modalEditarUsuario").modal('show');
      });
}


function actualizarUsuario(){
    idUsuario = $("#idUsuario_edit").val();
    nombre = $("#nombre_edit").val();
    dni = $("#dni_edit").val();
    fnac = $("#fnac_edit").val();
    username = $("#username_edit").val();
    password = $("#password_edit").val();
    password2 = $("#password2_edit").val();
    role = $("#permisos_edit").val();
    if(password===password2){
        if(nombre && username && password){
            let datos = [
              role,
              dni,
              username,
              password,
              nombre,
              fnac,
              idUsuario,
            ];
            datos = JSON.stringify(datos);
            $.post(urlBase+"ActualizarUsuario",{datos})
            .then((res)=>{
              if(res=="OK"){
                $("#modalEditarUsuario").modal('hide');
                $("#usuarioActualizado").modal('show');
                table =   $("#usuarios").DataTable();
                let info = table.page.info();
                let page = info.page;
                table.ajax.reload();
                table.page( page ).draw( false );
              }else{
                Lobibox.notify('warning', {
                  pauseDelayOnHover: true,
                  continueDelayOnInactiveTab: false,
                  position: 'top right',
                  icon: 'bx bx-message-error',
                  msg: 'Error al Actualizar. Contacte a SOFTWEARE.',
                });
              }
            });
          }else{
            Lobibox.notify('error', {
              pauseDelayOnHover: true,
              continueDelayOnInactiveTab: false,
              position: 'top right',
              icon: 'bx bx-message-error',
              msg: 'Faltan campos por completar.',
            });
          }
    }else{
        Lobibox.notify('error', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-message-error',
            msg: 'Las contraseñas no coinciden.',
          });
    }
}
  