// Historial de cambios
let history = [];
let historyIndex = -1;

// Función para agregar un cambio al historial
function addToHistory(change) {
  // Limpiar los cambios posteriores al punto actual en el historial
  history.splice(historyIndex + 1);
  history.push(change);
  historyIndex = history.length - 1;
}

// Función para deshacer el último cambio
function undo() {
  if (historyIndex >= 0) {
    const lastChange = history[historyIndex];
    // Realizar la reversión del cambio
    // (En este ejemplo, asumimos que la función revertChange(change) deshace el cambio especificado)
    revertChange(lastChange);
    historyIndex--;
  }
}

// Función para rehacer el último cambio deshecho
function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    const nextChange = history[historyIndex];
    // Aplicar nuevamente el cambio
    // (En este ejemplo, asumimos que la función applyChange(change) aplica nuevamente el cambio especificado)
    applyChange(nextChange);
  }
}

// Event listener para Ctrl + Z (deshacer)
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'z') {
    undo();
  }
});

// Event listener para Ctrl + Y (rehacer)
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'y') {
    redo();
  }
});
