import { ValidateValue } from '../Classes/Validation.js';

let elementSelected = null;
const MODAL_ID = 'myModalChangeText';
const FORM_ID = 'FormChangeText';

function inicio() {
  const areaDeImpresion = document.getElementById('areaDeImpresion');

  // Verificar si se encontró el elemento
  if (!areaDeImpresion) {
    throw new Error('No se encontró el área de impresión <main>');
  }

  areaDeImpresion.addEventListener('dblclick', e => editarContenido({ element: e }));

  const form = document.getElementById(FORM_ID);

  if (form) {
    form.addEventListener('submit', handleEventSubmiForm);
    form.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleEventEnter(e);
    });
  }
}

const nodeHandlers = {
  FIGURE: ({ elemento }) => modifyFigureContent({ figureElement: elemento }),
  IMG: ({ elemento }) => modifyFigureContent({ figureElement: elemento.closest('figure') }),
  FIGCAPTION: ({ elemento }) => modifyFigureContent({ figureElement: elemento.closest('figure') }),
  DIV: ({ elemento }) => modifyTextContent(elemento),
  P: ({ elemento }) => modifyTextContent(elemento.closest('div.texto-plano')),
};

/**
 * TODO validar que el contenido nuevo sea diferente al actual
 */
export function editarContenido({ element }) {
  if (!element) {
    throw new Error('No se ha seleccionado un elemento');
  }

  let elementSelected = null;

  if (element instanceof Event) {
    elementSelected = element.target;
    // Si es un evento, obtenemos el elemento que disparó el evento
  } else if (element instanceof HTMLElement) {
    elementSelected = element;
    // Si es un elemento HTML, lo usamos directamente
  } else if (element.element) {
    elementSelected = element.element;
    // Si es un objeto con una propiedad `element`, la usamos
  } else {
    throw new Error('El objeto proporcionado no es válido');
    // Si no cumple con ninguna de las anteriores, lanzamos un error
  }

  const nodeName = elementSelected.nodeName;

  if (!nodeName) {
    console.error(`Error al obtener el nombre del nodo [${nodeName}]`);
    return;
  }

  if (nodeName === 'P' && elementSelected.classList.contains('plantilla-quantity')) {
    console.log('SI existe:', elementSelected);
    const qtyElement = elementSelected.querySelector('span.qty');

    if (!qtyElement) {
      console.error('No se encontro el elemento [.plantilla-quantity span.qty]');

      return;
    }

    const qty = qtyElement.textContent.trim();
    const qtyValue = parseInt(qty);

    modifyTextContentQuantity({ elemento: qtyElement, qtyValue });
  } else if (nodeHandlers[nodeName]) {
    nodeHandlers[nodeName]({ elemento: elementSelected });
  }
}

async function getDataValueFromFigure(figureElement) {
  const imgElement = figureElement.querySelector('img');
  if (imgElement) {
    const src = imgElement.src;
    if (src) {
      const url = new URL(src);
      return url.searchParams.get('data');
    } else {
      return null;
    }
  }
  return null;
}

async function modifyFigureContent({ figureElement }) {
  try {
    const modal = document.getElementById(MODAL_ID);
    const form = document.getElementById(FORM_ID);

    if (!figureElement) {
      throw new Error('No se encontró el elemento figure');
    }

    if (!modal || !form) {
      throw new Error('No se encontraron los elementos necesarios');
    }

    const dataValue = await getDataValueFromFigure(figureElement);

    if (dataValue) {
      form.changeData.value = dataValue;
    } else {
      alert('Ha ocurrido un error al obtener el valor actual de elemento');
    }

    focusInputTextarea({ modal, form });

    elementSelected = figureElement;
    form.dataset['type'] = 'figure';
  } catch (error) {
    console.error('Error: a ocurrio un error al intentar modificar el contenido actual', error);
    alert('Error: a ocurrio un error al intentar modificar el contenido actual');
  }
}

async function getDataValueFromElement(element) {
  const paragraphs = Array.from(element.querySelectorAll('p.texto'));

  if (!paragraphs.length) {
    console.error('No se encontraron elementos de texto');
    return '';
  }

  return paragraphs.map(p => p.textContent.trim()).join('\n');
}

async function modifyTextContent(elemento) {
  try {
    const modal = document.getElementById(MODAL_ID);
    const form = document.getElementById(FORM_ID);

    if (!elemento) {
      throw new Error('No se encontró el elemento div.texto-plano');
    }

    if (!modal || !form) {
      throw new Error('No se encontraron los elementos necesarios');
    }

    const dataValue = await getDataValueFromElement(elemento);

    if (dataValue) {
      form.changeData.value = dataValue;
    } else {
      alert('Ha ocurrido un error al obtener el valor actual de elemento');
    }

    focusInputTextarea({ modal, form });

    elementSelected = elemento;
    form.dataset['type'] = 'paragraph';
  } catch (error) {
    console.error('Error: a ocurrio un error al intentar modificar el contenido actual', error);
    alert('Error: a ocurrio un error al intentar modificar el contenido actual');
  }
}

async function modifyTextContentQuantity({ elemento, qtyValue }) {
  try {
    const modal = document.getElementById(MODAL_ID);
    const form = document.getElementById(FORM_ID);

    if (!elemento) {
      throw new Error('No se encontró el elemento div.texto-plano');
    }

    if (!modal || !form) {
      throw new Error('No se encontraron los elementos necesarios');
    }

    const dataValue = qtyValue;

    if (dataValue) {
      form.changeData.value = dataValue;
    } else {
      alert('Ha ocurrido un error al obtener el valor actual de elemento');
    }

    focusInputTextarea({ modal, form });
    elementSelected = elemento;
    form.dataset['type'] = 'quantity';
  } catch (error) {
    console.error('Ha ocurrido un error al cambiar la cantidad de la plantilla:', error);
  }
}

function setNewValueFigureContent({ elemento }) {
  if (!elemento) {
    throw new Error('No se encontro el elemento a modificar');
  }

  const formChangeData = document.getElementById(FORM_ID);

  if (!formChangeData) {
    console.error('No se encontró el formulario');
    return;
  }

  const dataType = elemento.dataset['type'] ?? '';

  if (dataType === 'CodeUPCA') {
    const result = ValidateValue.isValidUPCA({ value: formChangeData.changeData.value.trim() });

    if (!result.result) {
      alert(result.msg);
      return;
    }
  }

  const nuevoContenido = formChangeData.changeData.value.trim();

  const figcaption = elemento.querySelector('figcaption');
  const img = elemento.querySelector('img');
  const type = elemento.dataset['type'];

  const typeCodeMap = {
    CodeQR: 'QRCode&eclevel=L&dmsize=Default',
    Code128: 'Code128&translate-esc=on&eclevel=L',
    CodeUPCA: 'UPCA',
  };

  const typeCode = type ? typeCodeMap[type] : '';

  if (img) {
    img.src = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(
      nuevoContenido
    )}&code=${typeCode}`;
  }

  if (figcaption) {
    figcaption.textContent = `${nuevoContenido}`;
  }

  // Ocultar el modal después de guardar los cambios
  hideModal();
  elementSelected = null;
}

function setNewValueQuantity({ elemento }) {
  if (!elemento) {
    throw new Error('No se encontró el elemento div.texto-plano');
  }

  const formChangeData = document.getElementById(FORM_ID);

  if (!formChangeData) {
    console.error('No se encontró el formulario');
    return;
  }

  let newContent = formChangeData.changeData.value.trim();

  if (!Number(newContent) || !newContent) {
    alert('Ingrese un numero valido');
    return;
  }

  elemento.innerHTML = newContent;
  hideModal();
  elementSelected = null;
}

function setNewValueParagraphs({ elemento }) {
  if (!elemento) {
    throw new Error('No se encontró el elemento div.texto-plano');
  }

  const formChangeData = document.getElementById(FORM_ID);

  if (!formChangeData) {
    console.error('No se encontró el formulario');
    return;
  }

  let newContent = formChangeData.changeData.value.trim();
  if (newContent) {
    // Limpiar contenido Anterior
    elemento.innerHTML = '';

    // Agregar nuevo contenido
    newContent = newContent.split('\n');
    newContent.forEach(line => {
      const paragraph = document.createElement('p');
      paragraph.className = 'texto';
      paragraph.textContent = line;
      elemento.appendChild(paragraph);
    });
  }

  hideModal();
  elementSelected = null;
}

function hideModal() {
  const modal = document.getElementById(MODAL_ID);
  if (modal) {
    modal.style.display = 'none';
  }
}

function focusInputTextarea({ modal, form }) {
  modal.style.display = 'block';
  form.changeData.focus();
  setTimeout(() => form.changeData.select(), 50);
}

const handleSubmit = {
  figure: ({ elemento }) => setNewValueFigureContent({ elemento }),
  paragraph: ({ elemento }) => setNewValueParagraphs({ elemento }),
  quantity: ({ elemento }) => setNewValueQuantity({ elemento }),
};

function handleEventEnter(e) {
  try {
    e.preventDefault();

    const formChangeData = document.getElementById(FORM_ID);

    if (!formChangeData) {
      throw new Error('No se entontro el elento <form>');
    }

    const dataType = formChangeData.dataset['type'];

    handleEvents({ dataType });
  } catch (error) {
    console.error('Ha ocurrido un error al ejecutar el ENTER submit:', error);
  }
}

function handleEventSubmiForm(e) {
  try {
    e.preventDefault();
    const form = e.target;
    const dataType = form.dataset['type'];

    handleEvents({ dataType });
  } catch (error) {
    console.error('Ha ocurrido un error al ejecutar el evento SUBMIT:', error);
  }
}

function handleEvents({ dataType }) {
  if (handleSubmit[dataType]) {
    handleSubmit[dataType]({ elemento: elementSelected });
  }
}

window.addEventListener('load', inicio, { once: true });
