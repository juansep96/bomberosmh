var urlBase = "./php/transacciones/";

function GuardarEgreso(){
    monto = $("#monto").val();
    obs = $("#obs").val();
    if( monto && obs){
        var datos = [
          monto,
          obs
        ]
        datos = JSON.stringify(datos);
        $.post(urlBase+"RegistrarEgreso.php",{datos})
          .then((res)=>{
            if(res=="OK"){
                $("#egresoCargado").modal('show');
            }else{
                Lobibox.notify('warning', {
                    pauseDelayOnHover: true,
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    icon: 'bx bx-message-error',
                    msg: 'Error al Registrar. Contacte a SOFTWEARE.',
                  });
            }
          })
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
    $("#egresoCargado").modal('hide');
    $("#tipo").val(0);
    $("#monto").val("");
    $("#obs").val("");
}