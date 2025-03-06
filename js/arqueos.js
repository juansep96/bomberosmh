var urlBase="./php/arqueos/";

$(document).ready(function() {

  var fecha = moment().format("YYYY-MM-DD");
  $("#fecha").val(fecha);
  $("#desde").val(fecha);
  $("#hasta").val(fecha);

  $.extend(true, $.fn.dataTable.defaults, {
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
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
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
  });
});

function CargarMontos(){
    document.getElementById('totales').reset();
    fecha=$("#fecha").val();
    $.post(urlBase+"ObtenerPagosRealizados.php",{fecha})
    .then((response)=>{
        response = JSON.parse(response);
        response.forEach((e)=>{
            let medioPago = e.medioPago_cc;
            let monto = parseFloat(e.total)*-1;
            monto = monto.toFixed(2);
            if(medioPago=='EFECTIVO'){
                $("#pago_efectivo").val(monto);
            }
            if(medioPago=='TRANSFERENCIA'){
                $("#pago_transferencia").val(monto);
            }
            if(medioPago=='CHEQUE'){
                $("#pago_cheque").val(monto);
            }
            bruto = parseFloat(bruto) + parseFloat(monto);
        })
  })
  $.post(urlBase+"ObtenerIngresosTotales.php",{fecha})
    .then((ingresos)=>{
        ingresos=JSON.parse(ingresos);
        ingresos=ingresos[0];
        $.post(urlBase+"ObtenerEgresosTotales.php",{fecha})
        .then((egresos)=>{
            egresos=JSON.parse(egresos);
            egresosTotales=egresos[0]['monto'];
            egresosTotales=parseFloat(egresosTotales);
            $.post(urlBase+"ObtenerCambioAnterior.php")
                .then((cambioAnterior)=>{
                    $.post(urlBase+"ObtenerPagosRecibidos.php",{fecha})
                        .then((data)=>{
                            bruto=ingresos.bruto;
                            if(!bruto){
                                bruto = 0;
                            }
                            cc = ingresos.cc;
                            if(!cc){
                                cc = 0;
                            }
                            efectivo = ingresos.efectivo;
                            if(!efectivo){
                                efectivo = 0;
                            }
                            transferencia = ingresos.transferencia;
                            if(!transferencia){
                                transferencia = 0;
                            }
                            cheque = ingresos.cheque;
                            if(!cheque){
                                cheque = 0;
                            }
                            cambioAnterior=parseFloat(cambioAnterior);
                            bruto=parseFloat(bruto);
                            cc = parseFloat(cc);        
                            efectivo = parseFloat(efectivo);
                            efectivo = efectivo+cambioAnterior;        
                            transferencia = parseFloat(transferencia);        
                            cheque = parseFloat(cheque);        
                            data= JSON.parse(data);
                            data.forEach((e)=>{
                                let medioPago = e.medioPago_cc;
                                let monto = parseFloat(e.total)*-1;
                                monto = monto.toFixed(2);
                                if(medioPago=='EFECTIVO'){
                                    $("#efectivo_2").val(monto);
                                }
                                if(medioPago=='TRANSFERENCIA'){
                                    $("#transferencia_2").val(monto);
                                }
                                if(medioPago=='CHEQUE'){
                                    $("#cheque_2").val(monto);
                                }
                                bruto = parseFloat(bruto) + parseFloat(monto);
                            })

                            neto = bruto-egresosTotales;
                            bruto=bruto.toFixed(2);
                            cc = cc.toFixed(2);
                            cheque = cheque.toFixed(2);
                            neto = neto.toFixed(2);
                            efectivo = efectivo.toFixed(2);
                            transferencia = transferencia.toFixed(2);
                            cambioAnterior=cambioAnterior.toFixed(2);
                            egresosTotales=egresosTotales.toFixed(2);

                            $("#ingresos").val(bruto);
                            $("#cc").val(cc);
                            $("#efectivo").val(efectivo);
                            $("#transferencia").val(transferencia);
                            $("#cheque").val(cheque);
                            $("#neto").val(neto);
                            $("#egresos").val(egresosTotales);
                        })
                })
        })
    })
}

function GuardarArqueo(){
    fecha = $("#fecha").val();
    ingresos = $("#ingresos").val();
    efectivo = $("#efectivo").val();
    cc=$("#cc").val();
    transferencia = $("#transferencia").val();
    cheque = $("#cheque").val();
    egresos = $("#egresos").val();
    neto = $("#neto").val();
    cambio = $("#cambio").val();
    obs = $("#obs").val();
    if(fecha && ingresos && efectivo && cc && transferencia && egresos && cheque && neto && cambio){
       ingresos = parseInt(ingresos);
       ingresos = ingresos.toFixed(2);
       efectivo = parseInt(efectivo);
       efectivo = efectivo.toFixed(2);
       cc = parseInt(cc);
       cc = cc.toFixed(2);
       transferencia = parseInt(transferencia);
       transferencia = transferencia.toFixed(2);
       cheque = parseInt(cheque);
       cheque = cheque.toFixed(2);
       egresos = parseInt(egresos);
       egresos = egresos.toFixed(2);
       neto = parseInt(neto);
       neto = neto.toFixed(2);
       cambio = parseInt(cambio);
       cambio = cambio.toFixed(2);
        var datos = [
           fecha,
           ingresos,
           efectivo,
           cc,
           transferencia,
           cheque,
           egresos,
           neto,
           cambio,
           obs
       ]
       datos = JSON.stringify(datos);
        Lobibox.confirm({
            msg: "Seguro  que desea cargar este Arqueo?",
            callback: function ($this, type, ev) {
              if(type=="yes"){
                $.post(urlBase+"NuevoArqueo.php",{datos})
                .then((res)=>{
                    if(res=="OK"){
                        Lobibox.notify('success', {
                            pauseDelayOnHover: true,
                            continueDelayOnInactiveTab: false,
                            position: 'top right',
                            icon: 'bx bx-check-circle',
                            msg: 'Agregado!',
                          });
                        $("#arqueoCargado").modal('show');
                    }else{
                        Lobibox.notify('warning', {
                            pauseDelayOnHover: true,
                            continueDelayOnInactiveTab: false,
                            position: 'top right',
                            icon: 'bx bx-message-warning',
                            msg: 'Error al Crear. Contacte a SOFTWEARE',
                          });
                    }
                })
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
    $("#arqueoCargado").modal('hide');
    window.location.reload();
}

function CargarArqueos(){
    fecha = $("#desde").val();
    fechaHasta=$("#hasta").val();
    $("#arqueos").DataTable().destroy();
    $('#arqueos').DataTable({
      responsive: true,
      'processing': true,
      'serverSide': true,
      'serverMethod': 'post',
      'searching':false,
      'ajax': {
        'url': urlBase+"ObtenerArqueos.php?fecha="+fecha+"&fechaHasta="+fechaHasta,
      },
      'columns': [{
          data: 'fecha_arqueo'
        },
        {
          data: 'name_user'
        },
        {
          data: 'ingresos_arqueo'
        },
        {
          data: 'egresos_arqueo'
        },
        {
          data: 'neto_arqueo'
        },
        {
          data: 'cambio_arqueo'
        },
        {
          data: 'acciones_arqueo', className: "mostrarColumna"
        }
      ]
    });
    ObtenerTotalesPeriodo();
}

function VerArqueo(idArqueo){
    $.post(urlBase+"ObtenerArqueo.php",{idArqueo})
    .then((res)=>{
      res=JSON.parse(res);
      res.forEach((e)=>{
        $("#fecha").val(e.fecha_arqueo);
        $("#usuario").val(e.name_user);
        $("#ingresos").val(" $ "+e.ingresos_arqueo);
        $("#efectivo").val(" $ "+e.efectivo_arqueo);
        $("#cc").val(" $ "+e.cc_arqueo);
        $("#transferencia").val(" $ "+e.transferencia_arqueo);
        $("#cheque").val(" $ "+e.cheque_arqueo);
        $("#egresos").val(" $ "+e.egresos_arqueo);
        $("#neto").val(" $ "+e.neto_arqueo);
        $("#cambio").val(" $ "+e.cambio_arqueo);
        $("#obs").val(e.obs_arqueo);
        });
      $("#modalVerArqueo").modal('show');
    });
}

function CerrarVerArqueo(){
    $("#modalVerArqueo").modal('hide');
}

function EliminarArqueo(idArqueo){
    Lobibox.confirm({
        msg: "Seguro  que desea eliminar este Arqueo?",
        callback: function ($this, type, ev) {
          if(type=="yes"){
            $.post(urlBase+"EliminarArqueo.php",{idArqueo})
            .then(()=>{
              Lobibox.notify('success', {
              pauseDelayOnHover: true,
              continueDelayOnInactiveTab: false,
              position: 'top right',
              icon: 'bx bx-check-circle',
              msg: 'Arqueo eliminado con éxito.',
            });
            table =   $("#arqueos").DataTable();
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


function ObtenerTotalesPeriodo(){
  desde=$("#desde").val();
  hasta=$("#hasta").val();
  $.post(urlBase+"ObtenerArqueosPorPeriodo.php",{desde,hasta})
    .then((data)=>{
      data=JSON.parse(data);
      data.forEach((e)=>{
        ingresos=e.ingresos;
        if(!ingresos){
            ingresos = 0;
        }
        ingresos=parseInt(ingresos);
        ingresos=ingresos.toFixed(2);

        cc = e.cc;
        if(!cc){
            cc = 0;
        }
        cc=parseInt(cc);
        cc=cc.toFixed(2);

        efectivo = e.efectivo;
        if(!efectivo){
            efectivo = 0;
        }
        efectivo=parseInt(efectivo);
        efectivo=efectivo.toFixed(2);

        transferencia = e.transferencia;
        if(!transferencia){
            transferencia = 0;
        }
        transferencia=parseInt(transferencia);
        transferencia=transferencia.toFixed(2);

        cheque = e.cheque;
        if(!cheque){
            cheque = 0;
        }
        cheque=parseInt(cheque);
        cheque=cheque.toFixed(2);

        egresos = e.egresos;
        if(!egresos){
          egresos=0;
        }
        egresos=parseInt(egresos);
        egresos=egresos.toFixed(2);

        
        $("#ingresos").val("$ "+ingresos);
        $("#efectivo").val("$ "+efectivo);
        $("#cc").val("$ "+cc);
        $("#transferencia").val("$ "+transferencia);
        $("#cheque").val("$ "+cheque);
        $("#egresos").val("$ "+egresos);
      })
    })
}