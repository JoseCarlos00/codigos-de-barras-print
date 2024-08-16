import { ValidateValue } from './Classes/Validations.js';

function inicio() {
  const areaDeImpresion = document.querySelector('#areaDeImpresion');

  // Verificar si se encontró el elemento
  if (!areaDeImpresion) {
    throw new Error('No se encontró el área de impresión <main>');
  }

  areaDeImpresion.addEventListener('dblclick', editarContenido);
}

const MODAL_ID = 'myModaChangeText';
const FORM_ID = 'FormChangeText';

const nodeHandlers = {
  FIGURE: ({ elemento }) => modifyFigureContent({ figureElement: elemento }),
  IMG: ({ elemento }) => modifyFigureContent({ figureElement: elemento.closest('figure') }),
  FIGCAPTION: ({ elemento }) => modifyFigureContent({ figureElement: elemento.closest('figure') }),
  DIV: ({ elemento }) => modifyTextContent(elemento),
  P: ({ elemento }) => modifyTextContent(elemento.closest('div.texto-plano')),
};

// Definir la función para editar el contenido
function editarContenido(e) {
  const nodeName = e.target.nodeName;
  const elemento = e.target;

  if (nodeHandlers[nodeName]) {
    nodeHandlers[nodeName]({ elemento });
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

    /**
     * TODO: revisar si existe una sobrecarga del evento SUBMIT
     */
    modal.addEventListener('submit', e => setNewValueFigureContent(e, figureElement));
  } catch (error) {
    console.error('Error: a ocurrio un error al intentar modificar el contenido actual', error);
    alert('Error: a ocurrio un error al intentar modificar el contenido actual');
  }
}

/**
 * TODO validar que el contenido nuevo sea diferente al actual
 */
function setNewValueFigureContent(e, elemento) {
  e.preventDefault();

  const formChangeData = e.target;

  if (!formChangeData) {
    console.error('No se encontró el formulario');
    return;
  }

  const dataType = elemento.dataset['type'] ?? '';

  console.log('elemento:', dataType, elemento);

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

    /**
     * TODO: revisar si existe una sobrecarga del evento SUBMIT
     */
    modal.addEventListener('submit', e => setNewValueParagraphs({ e, elemento }));
  } catch (error) {
    console.error('Error: a ocurrio un error al intentar modificar el contenido actual', error);
    alert('Error: a ocurrio un error al intentar modificar el contenido actual');
  }
}

function setNewValueParagraphs({ e, elemento }) {
  e.preventDefault();

  if (!elemento) {
    throw new Error('No se encontró el elemento div.texto-plano');
  }

  const formChangeData = e.target;

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

window.addEventListener('load', inicio, { once: true });
