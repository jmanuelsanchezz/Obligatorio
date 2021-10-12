//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e){
//document.getElementById("nombNav").innerHTML = "Bienvenido, " + localStorage.getItem("user") + "!";
//});

//Guarda el usuario iniciado en localStorage

function saveLocalStorage() {
  var usuario = document.getElementById("user").value;
  localStorage.setItem("user", usuario);
}

//localStorage.usuario = JSON.stringify(registroUsuario)
