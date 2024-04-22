let isResizing = false;
let elemento = null;
let elementEvent = null;

export function toggleRedimensionarListener(elementoParams) {
  if (!elementoParams) return;
  if (!elemento) return;

  elemento.addEventListener('mousedown', function (event) {
    /** Inicia Movimiento */
    if (elemento.classList.contains('selected')) {
      isResizing = true;
      actualizarValores();
    }
  });

  document.addEventListener('mousemove', function (event) {
    if (isResizing) {
      /** Moviendo */
      actualizarValores();
    }
  });

  document.addEventListener('mouseup', function () {
    /** Terminar Movimiento */
    isResizing = false;

    actualizarValores();
  });
}

function actualizarValores(UM = 'px') {
  if (!elemento) return;

  const rect = elemento.getBoundingClientRect();
  const ancho = rect.width;
  const alto = rect.height;

  FormWidth.ancho.value = ancho;
  FormWidth.alto.value = alto;
  FormWidth.unidadAncho.value = UM;
  FormWidth.unidadAlto.value = UM;
}

export function cambiarDimensiones(elementoParams) {
  if (!FormWidth || !elementoParams) return;

  elementEvent = elementoParams;
  actualizarValores();
}

function formWidthSubmitEvent(event) {
  event.preventDefault();
  getValuesForm();
}

function getValuesForm() {
  const anchoInput = FormWidth.ancho.value;
  const altoInput = FormWidth.alto.value;

  const unidadAnchoSelect = FormWidth.unidadAncho.value;
  const unidadAltoSelect = FormWidth.unidadAlto.value;

  const ancho = parseInt(anchoInput);
  const alto = parseInt(altoInput);
  const unidadAncho = unidadAnchoSelect;
  const unidadAlto = unidadAltoSelect;

  setValuesForm(ancho, alto, unidadAncho, unidadAlto);
}

function setValuesForm(ancho, alto, unidadAncho, unidadAlto) {
  if (elementEvent && ancho && alto && unidadAncho && unidadAlto) {
    elementEvent.style.width = ancho + unidadAncho;
    elementEvent.style.height = alto + unidadAlto;
  }
}

window.addEventListener('load', () => {
  if (FormWidth) {
    const anchoInput = FormWidth.ancho;
    const altoInput = FormWidth.alto;

    anchoInput.addEventListener('focus', seleccionarContenido);
    altoInput.addEventListener('focus', seleccionarContenido);

    FormWidth.addEventListener('submit', formWidthSubmitEvent);
  }

  function seleccionarContenido(e) {
    const input = e.target;

    if (input) {
      input.select();
    }
  }
});

export function resetElement() {
  isResizing = false;
  elemento = null;
  elementEvent = null;

  if (FormWidth) {
    FormWidth.reset();
  }
}
