import { DataHistory } from './Classes/DataHistory.js';

const historyStack = new DataHistory();

let currentElement = null;

// Función para guardar la posición actual
export function savePosition(position) {
  const { xInicial, yInicial, xActual, yActual, elemento, position: pos } = position;

  currentElement = elemento;

  if (historyStack.getHistory().length === 0) {
    historyStack.addData({ xActual: xInicial, yActual: yInicial, pos });
    let poss = Number(pos);
    ++poss;
    historyStack.addData({ xActual, yActual, poss });
  } else {
    historyStack.addData({ xActual, yActual, pos });
  }

  // console.log(
  //   `History: index[${historyStack.getCurrentIndex()}] length`,
  //   historyStack.getHistory().length,
  //   historyStack.getHistory(),
  //   'Actual:',
  //   historyStack.getCurrentData()
  // );
}

// Función para aplicar una acción
function applyAction(action) {
  const { x, y } = action;

  if (currentElement && x && y) {
    currentElement.style.transform = `translate(${x}px, ${y}px)`;
  }
}

// Función para deshacer la última acción
function undo() {
  const undoBack = historyStack.back();

  if (undoBack) {
    const { xActual: x, yActual: y } = undoBack;
    applyAction({ x, y });
  }
}

// Función para rehacer la última acción deshecha
function redo() {
  const reduForward = historyStack.forward();
  // console.log('forward:', reduForward);

  if (reduForward) {
    const { xActual: x, yActual: y } = reduForward;
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
