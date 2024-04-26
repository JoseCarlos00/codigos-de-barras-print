let xPosition = 0;
let yPosition = 0;

let undoStack = []; // Pila para almacenar las acciones deshacer
let redoStack = []; // Pila para almacenar las acciones rehacer

let handleDrop = () => {};

// Función para guardar la posición actual
function savePosition(x, y) {
  xPosition = x;
  yPosition = y;
}

// Función para deshacer la última acción
function undo() {
  if (undoStack.length > 0) {
    const lastAction = undoStack.pop();
    redoStack.push(lastAction);
    applyAction(lastAction.undo);
  }
}

// Función para rehacer la última acción deshecha
function redo() {
  if (redoStack.length > 0) {
    const lastUndoAction = redoStack.pop();
    undoStack.push(lastUndoAction);
    applyAction(lastUndoAction.redo);
  }
}

// Función para aplicar una acción
function applyAction(action) {
  // Aquí puedes aplicar la acción
  action();
}

function handleDropWithOffset(e, elemento, areaDeImpresion) {
  if (!elemento) return;

  elemento.style.opacity = '0.4';
  elemento.classList.add('dragging');
  setEventDragEnd(elemento);

  const dataSetId = elemento.dataset['id'];

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', dataSetId);

  const offsetX = e.offsetX;
  const offsetY = e.offsetY;

  // Función para manejar el evento drop
  handleDrop = event => {
    event.preventDefault();
    let x = event.clientX - areaDeImpresion.getBoundingClientRect().left - offsetX;
    let y = event.clientY - areaDeImpresion.getBoundingClientRect().top - offsetY;

    // Guardar la posición actual
    savePosition(x, y);

    // Verificar si el elemento está fuera del área de impresión
    const areaRect = areaDeImpresion.getBoundingClientRect();
    const elementoRect = elemento.getBoundingClientRect();

    let collisionSide = '';

    if (x < 0) {
      collisionSide = 'left';
      x = 0;
    } else if (x + elementoRect.width > areaRect.width) {
      collisionSide = 'right';
      x = areaRect.width - elementoRect.width;
    }

    if (y < 0) {
      collisionSide = 'top';
      y = 0;
    } else if (y + elementoRect.height > areaRect.height) {
      collisionSide = 'bottom';
      y = areaRect.height - elementoRect.height;
    }
    // Cambiar el borde específico dependiendo de la colisión
    switch (collisionSide) {
      case 'left':
        areaDeImpresion.style.borderLeft = '3px solid red';
        break;
      case 'right':
        areaDeImpresion.style.borderRight = '3px solid red';
        break;
      case 'top':
        areaDeImpresion.style.borderTop = '3px solid red';
        break;
      case 'bottom':
        areaDeImpresion.style.borderBottom = '3px solid red';
        break;
      default:
        areaDeImpresion.style.border = ''; // Restaurar el borde predeterminado
    }

    elemento.style.transform = `translate(${x}px, ${y}px)`;
  };

  // Agregar evento 'drop' para manejar la caída de elementos en esta área
  areaDeImpresion.addEventListener('drop', handleDrop);
}

// Escuchar el evento de teclado para Ctrl + Z (deshacer)
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'z') {
    undo();
  }
});

// Escuchar el evento de teclado para Ctrl + Y (rehacer)
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'y') {
    redo();
  }
});
