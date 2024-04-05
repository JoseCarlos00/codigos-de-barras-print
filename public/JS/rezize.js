export function toggleRedimensionarListener(elemento) {
  elemento.draggable = false;

  let isResizing = false;
  let startPosition = { x: 0, y: 0 };
  let startSize = { width: 0, height: 0 };

  elemento.addEventListener('mousedown', function (event) {
    if (elemento.classList.contains('selected')) {
      elemento.style.cursor = 'se-resize';

      isResizing = true;
      startPosition.x = event.clientX;
      startPosition.y = event.clientY;
      startSize.width = parseInt(document.defaultView.getComputedStyle(elemento).width, 10);
      startSize.height = parseInt(document.defaultView.getComputedStyle(elemento).height, 10);
    }
  });

  document.addEventListener('mousemove', function (event) {
    if (!isResizing) return;

    const width = startSize.width + (event.clientX - startPosition.x);
    const height = startSize.height + (event.clientY - startPosition.y);

    elemento.style.width = width + 'px';
    elemento.style.height = height + 'px';
  });

  document.addEventListener('mouseup', function () {
    isResizing = false;
    elemento.style.cursor = '';
    elemento.draggable = true;
  });
}

export function cambiarDimensiones(elemento) {
  console.log(elemento);
  if (!FormWidth) return;

  const anchoInput = FormWidth.ancho.value;
  const altoInput = FormWidth.alto.value;

  const unidadAnchoSelect = FormWidth.unidadAncho.value;
  const unidadAltoSelect = FormWidth.unidadAlto.value;

  if (elemento) {
    console.log(elemento.getBoundingClientRect());
    const rect = elemento.getBoundingClientRect();
    const ancho = rect.width;
    const alto = rect.height;
    console.log('Elemento: ancho', ancho, ' alto:', alto);
  }

  FormWidth.addEventListener('submit', function (event) {
    event.preventDefault();

    const ancho = parseInt(anchoInput);
    const alto = parseInt(altoInput);
    const unidadAncho = unidadAnchoSelect;
    const unidadAlto = unidadAltoSelect;

    console.log('ancho:', ancho, 'UM:', unidadAncho);
    console.log('alto:', alto, 'UM:', unidadAlto);

    // elemento.style.width = ancho + unidadAncho;
    // elemento.style.height = alto + unidadAlto;
  });
}

cambiarDimensiones();
