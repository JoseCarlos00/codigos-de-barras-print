// Variables para almacenar la posición inicial del mouse y el tamaño inicial del elemento
let inicialX, inicialAncho;

let elementoARedimensionar = null;
let anchoInicial = null;

// Función para redimensionar el elemento hacia la derecha
function redimensionarDerecha(e) {
  if (elementoARedimensionar) {
    const delta = e.clientX - inicialX;
    elementoARedimensionar.style.width = anchoInicial + delta + 'px';
  }
}

// Función para agregar o quitar el event listener de redimensionar según si el elemento está seleccionado
export function toggleRedimensionarListener(elemento) {
  elementoARedimensionar = elemento;

  if (elementoARedimensionar) {
    if (elementoARedimensionar.classList.contains('selected')) {
      // Obtener el ancho inicial del elemento
      if (!anchoInicial) {
        anchoInicial = parseFloat(window.getComputedStyle(elementoARedimensionar).width);
      }
      document.addEventListener('mousemove', redimensionarDerecha);
      // Agregar evento de mousedown al borde derecho del elemento para iniciar la redimensión
      elementoARedimensionar.addEventListener('mousedown', mousedown);
    } else {
      document.removeEventListener('mousemove', redimensionarDerecha);
      elementoARedimensionar.removeEventListener('mousedown', mousedown);
    }
  }
}

function mousedown(e) {
  e.preventDefault();
  inicialX = e.clientX;
  toggleRedimensionarListener();
}
