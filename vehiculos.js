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

  function enviarEmail() {
    // Obtener los datos de vehículos desde localStorage
    var vehiculos = JSON.parse(localStorage.getItem('vehiculosData')) || [];

    // Verificar si hay datos en el localStorage
    if (vehiculos.length === 0) {
        alert("No hay datos para enviar por correo.");
        return;
    }

    // Formatear los datos para hacerlos más comprensibles en el correo
    var datosFormateados = vehiculos.map(function (vehiculo) {
        return "Marca y modelo: " + vehiculo.marMod + "\nAño: " + vehiculo.año
            + "\nKM: " + vehiculo.km + "\nPrecio en pesos: " + vehiculo.pesos
            + "\nPrecio en dólares: " + vehiculo.dolares + "\n---\n";
    }).join("\n");

    // Enviar los datos por correo electrónico (puedes utilizar un servicio de envío de correo)
    // En este ejemplo, se usa el servicio 'mailto' del navegador
    window.location.href = 'mailto:leonelranieri0501@hotmail.com?subject=Datos de la tabla&body=' 
        + encodeURIComponent(datosFormateados);
}

document.addEventListener("DOMContentLoaded", function () {
    const sesionActiva = localStorage.getItem("sesionActiva");

    if (!sesionActiva) {   // Si no hay indicador de sesión, redirigir a la pág de inicio
        window.location.href = "index.html"
    }
})

document.addEventListener("DOMContentLoaded", function () {
    // Este código se ejecutará después de que la página esté completamente cargada

    // Obtener los datos de vehículos desde localStorage
    var vehiculos = JSON.parse(localStorage.getItem('vehiculosData')) || [];

    // Obtener el elemento de la tabla donde se insertarán las filas
    var tablaVehiculos = document.getElementById("tablaVehiculos");

    // Iterar sobre los vehículos y agregar filas a la tabla
    vehiculos.forEach(function (vehiculo) {
        console.log(vehiculo)
        var fila = "<tr>" +
            "<td>" + vehiculo['marMod'] + "</td>" +
            "<td>" + vehiculo['año'] + "</td>" +
            "<td>" + vehiculo['km'] + "</td>" +
            "<td>" + vehiculo['pesos'] + "</td>" +
            "<td>" + vehiculo['dolares'] + "</td>" +
            "<td><button class='boton' type='button' id='eliminar'" +
            "onclick='eliminarFila(this)'>Eliminar</button></td>" + // Agrega un botón eliminar
            "</tr>";

        // Agregar la fila a la tabla
        tablaVehiculos.innerHTML += fila;
    });
});