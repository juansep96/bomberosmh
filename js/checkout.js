$(document).ready(function(){
    $.post("./php/DestruirSesion.php")
    .then(()=>{
        setTimeout(()=>{
            window.location.replace("index.html");
        },2000)
    })   
});
