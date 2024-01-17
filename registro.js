function validaciones(marcaModelo, year, km, peso, dolar) {
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

  return true;
}

function obtenerValores() {
  let marcaModelo = document.getElementById("marcaModelo").value;
  let year = document.getElementById("year").value;
  let km = document.getElementById("km").value;
  let peso = document.getElementById("peso").value;
  let dolar = document.getElementById("dolar").value;

  return [marcaModelo, year, km, peso, dolar];
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
    let [marcaModelo, year, km, peso, dolar] = obtenerValores();  
    
    let vehiculos = [];

    let datosValidos = validaciones(marcaModelo, year, km, peso, dolar);
    
    if(datosValidos) {
      const storedVehiculosJSON = localStorage.getItem('vehiculosData');
  
      if (storedVehiculosJSON) {
        // Convertir la cadena JSON a un array
        vehiculos = JSON.parse(storedVehiculosJSON);
      }
  
      // Verificar si el vehículo ya fue almacenado
      const vehiculoExistente = vehiculos.find((v) => v.marMod === marcaModelo && v.año === year && v.km === km);
  
      if (vehiculoExistente) {
        alert("El vehículo ya fue almacenado");
        return false;
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

      guardarEnArchivo(vehiculosJSON);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const sesionActiva = localStorage.getItem("sesionActiva");

    if (!sesionActiva) {   // Si no hay indicador de sesión, redirigir a la pág de inicio
        window.location.href = "index.html"
    }
})