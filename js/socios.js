var urlBase="./php/socios/";
var urlImpresionRecibo = "./php/facturas/verRecibo.php";


window.addEventListener('load', function() {
  $("#falta").val(moment().format('YYYY-MM-DD'));
  ObtenerCategoriasSocios();
  ObtenerMediosPagoSelect();
});

const ObtenerCategoriasSocios = async () => {
    $("#tipoSocio").empty();
    $.post(urlBase+"ObtenerCategoriasSelect.php")
    .then((data)=>{
      data=JSON.parse(data);
      data.forEach((e)=>{
          var opcion = "<option value='"+e.id_categoria+"'>"+e.nombre_categoria.toUpperCase()+" - $ "+parseFloat(e.monto_categoria).toFixed(2)+"</option>";
        $("#tipoSocio").append(opcion);
        $("#categoria_edit").append(opcion);
      })
    });
}

const ObtenerMediosPagoSelect = async () => {
    $("#medioPago_pagada").empty();
    $.post(urlBase+"ObtenerMediosPago.php")
    .then((data)=>{
      data=JSON.parse(data);
      data.forEach((e)=>{
          var opcion = "<option value='"+e.id_medio+"'>"+e.nombre_medio.toUpperCase()+"</option>";
        $("#medioPago_pagada").append(opcion);
        $("#medioPago").append(opcion);
        $("#medioPago_edit").append(opcion);

      })
    });
}


const validarTipo = async () => {
  tipo = $("#tipoSocio").val();
  if(tipo == "2"){
    $("#tPersona").prop('hidden',false);
  }else{
    $("#tPersona").prop('hidden',true);
  }
}

const validarMedioPago = async () => {
    medio = $("#medioPago").val();
    if(medio == "2"){
      $("#cbuVisor").prop('hidden',false);
    }else{
      $("#cbuVisor").prop('hidden',true);
    }
  }

function GuardarSocio(){
  nombre = $("#nombre").val();
  apellido = $("#apellido").val();
  dni = $("#dni").val();
  cuil = $("#cuil").val();
  telefono=  $("#telefono").val();
  mail = $("#mail").val();
  fnac = $("#fnac").val();
  direccion = $("#direccion").val();
  idTipoSocio = $("#tipoSocio").val();
  tipoPersona = $("#tipoPersona").val();
  fechaAlta = $("#falta").val();
  medioPago = $("#medioPago").val();
  cbu = $("#cbu").val();
  if(nombre && apellido && cuil && dni && fnac && medioPago && cbu){
    if ((medioPago==2 && cbu.length == 22) || medioPago != 2 ){
        let datos = {
            nombre,
            apellido,
            dni,
            cuil,
            telefono,
            mail,
            fnac,
            direccion,
            idTipoSocio,
            tipoPersona,
            fechaAlta,
            medioPago,
            cbu
          };
          datos = JSON.stringify(datos);
          $.post(urlBase+"NuevoSocio.php",{datos})
          .then((res)=>{
      
            if(res.length<15){
              $("#idSocioCargado").html(res);
              $("#socioCargado").modal('show');
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
            msg: 'EL CBU debe contener 22 digitos.',
          });
    }
    
  }else{
    Lobibox.notify('error', {
      pauseDelayOnHover: true,
      continueDelayOnInactiveTab: false,
      position: 'top right',
      icon: 'bx bx-message-error',
      msg: 'Faltan campos por completar.',
    });
  }
}

function CerrarModal(){
  $("#socioCargado").modal('hide');
  window.location.reload();
}

function CargarSocios(){
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

  $('#socios').DataTable({
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
          'url':urlBase+'ObtenerSocios.php'
      },
      'columns': [
        { data: 'id_socio' },
        { data: 'apellido_socio' },
        { data: 'nombre_socio' },
        { data: 'dni_socio' },
        { data: 'nombre_categoria' },
        { data: 'fNacimiento_socio' },
        { data: 'cuil_socio' },
        { data: 'mail_socio' },
        { data: 'domicilio_socio' },
        { data: 'telefono_socio' },
        { data: 'fechaAlta_socio' },
        { data: 'medioAlta_socio' },
        { data: 'idMedioPago_socio' },
        { data: 'cbu_socio' },
        { data: 'saldo_socio' },
        { data: 'acciones_socio'},
      ]
  });
    var dt = $('#clientes').DataTable();
    //hide the first column
    for(let i=0;i<0;i++){
        dt.column(i).visible(false);
    }

}

function VerSocio(idSocio){
  $.post(urlBase+"ObtenerSocio.php",{idSocio})
    .then((res)=>{
      res=JSON.parse(res);
      res.forEach((e)=>{
        $("#idSocio").val(e.id_socio);
        $("#nombre").val(e.nombre_socio.toUpperCase());
        $("#apellido").val(e.apellido_socio.toUpperCase());
        $("#dni").val(e.dni_socio);
        $("#cuil").val(e.cuil_socio);
        $("#domicilio").val(e.domicilio_socio.toUpperCase());
        $("#telefono").val(e.telefono_socio);
        $("#mail").val(e.mail_socio);
        $("#fnac").val(e.fNacimiento_socio);
        $("#categoria").val(e.nombre_categoria);
        $("#tipoSocio").val(e.tipoSocio_socio.toUpperCase());
        $("#falta").val(e.fechaAlta_socio);
        $("#medioPago_ver").val(e.nombre_medio.toUpperCase());
        e.cbu_socio !='-1' ? $("#cbu_ver").val(e.cbu_socio) : $("#cbu_ver").val('-');

        ObtenerCuotas(e.id_socio);
      });
    });
}

function ObtenerCuotas(idSocio){
    let nombre = "SOCIO: Nº" + $("#idSocio").val();
  if ( $.fn.DataTable.isDataTable('#cuotas') ) {
    $('#cuotas').DataTable().destroy();
  }
  $('#cuotas').DataTable({
    "lengthMenu": [ 10, 25, 50, 75, 100 , 1000 ],
    'responsive': false,
    'processing': true,
    'serverSide': true,
    'searching' : false,
    'serverMethod': 'post',
    dom: 'Blfrtip',
    buttons: [{
      extend: "pdf",
      filename: function() {
        return "Cuenta Corriente - " + nombre.toUpperCase()      
      },      
      title: function() {
        return "Cuenta Corriente - " + nombre.toUpperCase()   
      }
    },
    {
      extend: "excel",
      filename: function() {
        return "Cuenta Corriente - " + nombre.toUpperCase()      
      },      
      title: function() {
        return "Cuenta Corriente - " + nombre.toUpperCase()   
      }
    },
    {
      extend: "print",
      filename: function() {
        return "Cuenta Corriente - " + nombre.toUpperCase()      
      },      
      title: function() {
        return "Cuenta Corriente - " + nombre.toUpperCase()   
      }
    },
  ],
    'ajax': {
        'url':urlBase+'ObtenerCuotas.php?idSocio='+idSocio
    },
    'columns': [
      { data: 'mes_cuota' },
      { data: 'monto_cuota' },
      { data: 'nombre_categoria' },
      { data: 'fechaPago_cuota' },
      { data: 'estado_cuota' },
      { data: 'nombre_metodo' },
      { data: 'acciones_cuota' },
    ]
  });
  $("#modalVerSocio").modal('show');
  $('.nav-item a[href="#primary-pills-datosPersonales"]').tab('show');
}

function CerrarVerSocio(){
  $("#modalVerSocio").modal('hide');
}

const MarcarComoPagada = async (idCuota) => {
    $("#idCuota_pagada").val(idCuota);
    $("#medioPago_pagada").val(1);
    $("#fechaPago_pagada").val(moment().format('YYYY-MM-DD'));
    $("#modalMarcarPagada").modal('show');
}

const RegistrarPago = async () => {
    idCuota = $("#idCuota_pagada").val();
    idMedioPago = $("#medioPago_pagada").val();
    fechaPago = $("#fechaPago_pagada").val();
    let datos = {
        idCuota,
        idMedioPago,
        fechaPago
    }
    datos = JSON.stringify(datos);
    $.post(urlBase+"MarcarCuotaPagada.php",{datos})
    .then((res)=>{
        if(res=='OK'){
            //Aca tenemos que enviar a facturar
            $.post('./AFIP/facturar.php',{idCuota})
            .then((result)=> {
                if(result != "ERROR"){
                    $("#modalMarcarPagada").modal('hide');
                    table =   $("#cuotas").DataTable();
                    info = table.page.info();
                    page = info.page;
                    table.ajax.reload();
                    table.page( page ).draw( false );
                    table =   $("#socios").DataTable();
                    info = table.page.info();
                    page = info.page;
                    table.ajax.reload();
                    table.page( page ).draw( false );
                    Lobibox.notify('success', {
                        pauseDelayOnHover: true,
                        continueDelayOnInactiveTab: false,
                        position: 'top right',
                        icon: 'bx bx-check-circle',
                        msg: 'Cuota registrada.',
                      });
                }else{
                    Lobibox.notify('warning', {
                        pauseDelayOnHover: true,
                        continueDelayOnInactiveTab: false,
                        position: 'top right',
                        icon: 'bx bx-message-error',
                        msg: 'Error al facturar ante AFIP. La cuota se marco como pagada pero debe facturar manualmente ante AFIP.',
                      });
                }
            })
            
        }else{
            Lobibox.notify('error', {
                pauseDelayOnHover: true,
                continueDelayOnInactiveTab: false,
                position: 'top right',
                icon: 'bx bx-message-error',
                msg: 'Error al registrar cuota. Contacte a Soporte. Compruebe que los campos esten completos',
              });
        }
    });

}

function EditarSocio(idSocio){
  $.post(urlBase+"ObtenerSocio.php",{idSocio})
    .then((res)=>{
      res=JSON.parse(res);
      res.forEach((e)=>{
        $("#idSocio_edit").val(e.id_socio);
        $("#nombre_edit").val(e.nombre_socio.toUpperCase());
        $("#apellido_edit").val(e.apellido_socio.toUpperCase());
        $("#dni_edit").val(e.dni_socio);
        $("#cuil_edit").val(e.cuil_socio);
        $("#domicilio_edit").val(e.domicilio_socio.toUpperCase());
        $("#telefono_edit").val(e.telefono_socio);
        $("#mail_edit").val(e.mail_socio);
        $("#fnac_edit").val(e.fNacimiento_socio);
        $("#categoria_edit").val(e.idCategoria_socio);
        $("#tipoSocio_edit").val(e.tipoSocio_socio.toUpperCase());
        $("#falta_edit").val(e.fechaAlta_socio);
        $("#medioPago_edit").val(e.id_medio);
        e.cbu_socio !='-1' ? $("#cbu_edit").val(e.cbu_socio) : $("#cbu_edit").val(-1);
        verificarTipoPago();
      });
      $("#modalEditarSocio").modal('show');
    });
}

function CerrarEditarSocio(){
  $("#modalEditarSocio").modal('hide');
}


function ActualizarSocio(){
    idSocio = $("#idSocio_edit").val();
    nombre = $("#nombre_edit").val();
    apellido = $("#apellido_edit").val();
    dni = $("#dni_edit").val();
    cuil = $("#cuil_edit").val();
    telefono=  $("#telefono_edit").val();
    mail = $("#mail_edit").val();
    fnac = $("#fnac_edit").val();
    direccion = $("#domicilio_edit").val();
    idCategoria = $("#categoria_edit").val();
    idTipoSocio = $("#tipoSocio_edit").val();
    fechaAlta = $("#falta_edit").val();
    medioPago = $("#medioPago_edit").val();
    cbu = $("#cbu_edit").val();
    if(nombre && apellido && cuil && dni && fnac && medioPago && cbu){
        if ((medioPago==2 && cbu.length == 22) || medioPago != 2 ){
            let datos = {
                nombre,
                apellido,
                dni,
                cuil,
                telefono,
                mail,
                fnac,
                direccion,
                idCategoria,
                idTipoSocio,
                fechaAlta,
                idSocio,
                medioPago,
                cbu
              };
              datos = JSON.stringify(datos);
              $.post(urlBase+"ActualizarSocio.php",{datos})
              .then((res)=>{
                if(res=='OK'){
                  $("#socioActualizado").modal('show');
                }else{
                  Lobibox.notify('warning', {
                    pauseDelayOnHover: true,
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    icon: 'bx bx-message-error',
                    msg: 'Error al Actualizar. Contacte a Siporte.',
                  });
                }
              });
        }else{
            Lobibox.notify('error', {
                pauseDelayOnHover: true,
                continueDelayOnInactiveTab: false,
                position: 'top right',
                icon: 'bx bx-message-error',
                msg: 'EL CBU debe contener 22 digitos.',
              });
        }      
    }else{
      Lobibox.notify('error', {
        pauseDelayOnHover: true,
        continueDelayOnInactiveTab: false,
        position: 'top right',
        icon: 'bx bx-message-error',
        msg: 'Faltan campos por completar.',
      });
    }
}
  

function EliminarSocio(idSocio){
  Lobibox.confirm({
    msg: "Seguro  que desea eliminar este Socio?",
    callback: function ($this, type, ev) {
      if(type=="yes"){
        $.post(urlBase+"EliminarSocio.php",{idSocio})
        .then(()=>{
          Lobibox.notify('success', {
          pauseDelayOnHover: true,
          continueDelayOnInactiveTab: false,
          position: 'top right',
          icon: 'bx bx-check-circle',
          msg: 'Socio eliminado con éxito.',
        });
        table =   $("#socios").DataTable();
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

function CerrarModalActualizado(){
  $("#socioActualizado").modal('hide');
  table =   $("#socios").DataTable();
  info = table.page.info();
  page = info.page;
  table.ajax.reload();
  table.page( page ).draw( false );
  $("#modalEditarSocio").modal('hide');
}

const verificarTipoPago = async () => {
    medio = $("#medioPago_edit").val();
    if(medio == 2){
      $(".verCBU_edit").prop('hidden',false);
    }else{
      $(".verCBU_edit").prop('hidden',true);
    }
  }


  const ImprimirRecibo = async (idFactura) => {
        window.open(urlImpresionRecibo+'?idFactura='+idFactura, '_blank');
  }