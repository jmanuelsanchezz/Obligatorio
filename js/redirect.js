//Redirecciona al login en caso de no haber sesion abierta

document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.getItem("user") === null) {
    window.location = "index.html";
  } else {
    document.getElementById("nombNav").innerHTML = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ${localStorage.getItem("user")}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="cart.html">Mi carrito</a>
      <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
      <a class="dropdown-item" href="index.html" onClick=deleteUser() >Salir</a>
    </div>
  </div>`;
  }
});

function deleteUser() {
  localStorage.clear();
}
