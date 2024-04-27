import { Stack, DataHistory } from './class.js';

const undoStack = new Stack();
const redoStack = new Stack();
// const historyStack = new ListaDoblementeEnlazada();
const historyStack = new DataHistory();

let currentElement = null;

// Función para guardar la posición actual
export function savePosition(position) {
  const { xInicial, yInicial, xActual, yActual, elemento } = position;

  currentElement = elemento;

  undoStack.push({ xInicial, yInicial, xActual, yActual });
  // redoStack.push({ xActual, yActual });

  historyStack.addData({ xInicial, yInicial, xActual, yActual });
  // historyStack.print();
  console.log(
    'History:',
    historyStack.getHistory().length,
    historyStack.getHistory(),
    'Actual:',
    historyStack.getCurrentData()
  );
}

// Función para aplicar una acción
function applyAction(action) {
  const { x, y } = action;

  if (currentElement) {
    currentElement.style.transform = `translate(${x}px, ${y}px)`;
    console.log('[applyAction] currentElement: x:', x, ' y:', y);
  }
}

// Función para deshacer la última acción
function undo() {
  const redoSize = redoStack.size();
  const undoSize = undoStack.size();

  if (undoSize > 0) {
    console.log('Undo:', undoStack.peek(), undoStack.print());
    const { xInicial: x, yInicial: y } = undoStack.pop();

    console.log('Redu:', redoStack.peek(), redoStack.print());

    // if (redoSize - undoSize == 2) {
    //   redoStack.pop();
    // }

    applyAction({ x, y });

    // console.log('Deshacer Value:', historyStack.deshacer());
  }
  console.log('back:', historyStack.back());

  console.log(
    'History:',
    historyStack.getHistory().length,
    historyStack.getHistory(),
    'Actual:',
    historyStack.getCurrentData()
  );
}

// Función para rehacer la última acción deshecha
function redo() {
  const redoSize = redoStack.size();
  const undoSize = undoStack.size();

  // console.log('Reacer Value:', historyStack.rehacer());
  /**
   * Mientras sean del mismo size no hacer nada
   */

  if (redoSize > 0 && redoSize > undoSize) {
    console.log('size:', redoSize);
    const { xActual: x, yActual: y } = redoStack.pop();
    undoStack.push({ xInicial: x, yInicial: y });
    applyAction({ x, y });
  }

  const reduForward = historyStack.forward();

  if (reduForward) {
    const { xInicial: x, yInicial: y } = reduForward;

    console.log('forward:', reduForward);

    console.log(
      'History:',
      historyStack.getHistory().length,
      historyStack.getHistory(),
      'Actual:',
      historyStack.getCurrentData()
    );

    applyAction({ x, y });
  }
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
