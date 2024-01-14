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

function limpiarCampos() {
  // Limpiar campos
  document.getElementById("marcaModelo").value = "";
  document.getElementById("year").value = "";
  document.getElementById("km").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("dolar").value = "";
}

function registrarVehiculo() {
  // Obtener los valores de los campos
  let marcaModelo = document.getElementById("marcaModelo").value;
  let year = document.getElementById("year").value;
  let km = document.getElementById("km").value;
  let peso = document.getElementById("peso").value;
  let dolar = document.getElementById("dolar").value;

  let vehiculos = [];

  // Validaciones
  if (marcaModelo == "" || marcaModelo == null) {
    alert("Por favor, ingrese la marca y el modelo del auto.");
    return false;
  }

  if (isNaN(year) || !getAños().includes(parseInt(year))) {
    alert("Por favor, ingrese un año válido.");
    return false;
  }

  if (isNaN(km) || km == "" || km == null) {
    alert("Por favor, ingrese un valor numérico para los kilómetros.");
    return false;
  }

  if (isNaN(peso) || peso == "" || peso == null) {
    alert("Por favor, ingrese un valor numérico para el peso.");
    return false;
  }

  if (isNaN(dolar) || dolar == "" || dolar == null) {
    alert("Por favor, ingrese un valor numérico para los dólares.");
    return false;
  }

  const storedVehiculosJSON = localStorage.getItem('vehiculosData');

  if (storedVehiculosJSON) {
    // Convertir la cadena JSON a un array
    vehiculos = JSON.parse(storedVehiculosJSON);
  }

  // Crear objeto auto
  const auto = {
    "marMod": marcaModelo,
    "año": year,
    "km": km,
    "pesos": peso,
    "dolares": dolar
  };

  // Agregar auto al array de vehículos
  vehiculos.push(auto);

  limpiarCampos();

  // Convertir el array 'vehiculos' a una cadena JSON
  const vehiculosJSON = JSON.stringify(vehiculos);

  // Almacenar la cadena JSON en localStorage con una clave específica
  localStorage.setItem('vehiculosData', vehiculosJSON);

  return true;
}

function cerrarSesion() {
  localStorage.removeItem("sesionActiva"); // Eliminar el indicador de sesión del almac local
  window.location.href = "index.html";
}

function eliminarFila(boton) {
  // Obtener la fila actual
  let fila = boton.parentNode.parentNode;

  // Obtener el índice de la fila
  let indice = fila.rowIndex;

  // Obtener los vehiculos del localStorage
  let vehiculosEnLocalStorage = JSON.parse(localStorage.getItem('vehiculosData')) || [];

  // Verificar si el índice es válido
  if (indice > 0 && indice <= vehiculosEnLocalStorage.length) {
    // Eliminar el vehiculo correspondiente del array en el localStorage
    vehiculosEnLocalStorage.splice(indice - 1, 1);

    // Eliminar la fila del DOM
    fila.parentNode.removeChild(fila);

    // Actualizar los datos en el localStorage
    localStorage.setItem('vehiculosData', JSON.stringify(vehiculosEnLocalStorage));
  } else {
    console.error('Índice de fila no válido:', indice);
  }
}


