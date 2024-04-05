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

    /** Actualizar valores */
    actualizarValores(width, height);
  });

  document.addEventListener('mouseup', function () {
    isResizing = false;
    elemento.style.cursor = '';
    elemento.draggable = true;
  });
}

function actualizarValores(width, height, UM = 'px') {
  console.log('Actualizar valores');
  FormWidth.ancho.value = width;
  FormWidth.alto.value = height;
  FormWidth.unidadAncho.value = UM;
  FormWidth.unidadAlto.value = UM;
}

export function cambiarDimensiones(elemento) {
  if (!FormWidth) return;

  if (elemento) {
    const rect = elemento.getBoundingClientRect();
    const ancho = rect.width;
    const alto = rect.height;
    console.log('Elemento: ancho', ancho, ' alto:', alto);
    actualizarValores(ancho, alto);
  }

  FormWidth.addEventListener('change', function (event) {
    console.log(event.target.value);
    const anchoInput = FormWidth.ancho.value;
    const altoInput = FormWidth.alto.value;

    const unidadAnchoSelect = FormWidth.unidadAncho.value;
    const unidadAltoSelect = FormWidth.unidadAlto.value;

    const ancho = parseInt(anchoInput);
    const alto = parseInt(altoInput);
    const unidadAncho = unidadAnchoSelect;
    const unidadAlto = unidadAltoSelect;

    if (elemento) {
      elemento.style.width = ancho + unidadAncho;
      elemento.style.height = alto + unidadAlto;
    }
  });

  FormWidth.addEventListener('submit', function (event) {
    event.preventDefault();
    const anchoInput = FormWidth.ancho.value;
    const altoInput = FormWidth.alto.value;

    const unidadAnchoSelect = FormWidth.unidadAncho.value;
    const unidadAltoSelect = FormWidth.unidadAlto.value;

    const ancho = parseInt(anchoInput);
    const alto = parseInt(altoInput);
    const unidadAncho = unidadAnchoSelect;
    const unidadAlto = unidadAltoSelect;

    console.log('ancho:', ancho, 'UM:', unidadAncho);
    console.log('alto:', alto, 'UM:', unidadAlto);

    if (elemento) {
      elemento.style.width = ancho + unidadAncho;
      elemento.style.height = alto + unidadAlto;
    }
  });
}

cambiarDimensiones();

window.addEventListener('load', () => {
  if (FormWidth) {
    const anchoInput = FormWidth.ancho;
    const altoInput = FormWidth.alto;

    anchoInput.addEventListener('click', seleccionarContenido);
    altoInput.addEventListener('click', seleccionarContenido);
  }

  function seleccionarContenido(e) {
    const input = e.target;

    if (input) {
      input.select();
    }
  }
});
