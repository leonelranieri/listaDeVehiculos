const getAños = function () {
  let years = [];
  const añoActual = new Date().getFullYear();
  for (let y = 2005; y <= añoActual; y++) {
    years.push(y);
  }
  return years
}

function validarLogin() {
  const nombre = document.getElementById("nombre").value;
  const pwd = document.getElementById("pwd").value;

  if (nombre === "admin" && pwd === "secreta") {
    localStorage.setItem("sesionActiva", "true");  // Almacenar un indicador de sesión en el almacenamiento local 
    window.location.href = "registro.html";
  } else {
    alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
  }
}


function cerrarSesion() {
  localStorage.removeItem("sesionActiva"); // Eliminar el indicador de sesión del almac local
  window.location.href = "index.html";
}


