function inicio() {
  try {
    const areaDeImpresion = document.querySelector('#areaDeImpresion');

    // Verificar si se encontró el elemento
    if (!areaDeImpresion) {
      throw new Error('No se encontró el área de impresión <main>');
    }

    areaDeImpresion.addEventListener('dblclick', editarContenido);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Definir la función para editar el contenido
function editarContenido(e) {
  const nodeName = e.target.nodeName;
  const elemento = e.target;

  console.log(nodeName);
  if (nodeName === 'FIGURE') {
    if (elemento) modifyFigureContent(elemento);
  } else if (nodeName === 'IMG' || nodeName === 'FIGCAPTION') {
    const figure = elemento.closest('figure');
    if (figure) modifyFigureContent(figure);
  } else if (nodeName === 'DIV') {
    elemento && modifyTextContent(elemento);
  } else if (nodeName === 'P') {
    const div = elemento.closest('div.texto-plano');
    div && modifyTextContent(div);
  }
}

function getDataValueFromFigure(figureElement) {
  return new Promise(resolve => {
    // Encuentra la imagen dentro del elemento figure
    const imgElement = figureElement.querySelector('img');

    if (imgElement) {
      const src = imgElement.src;

      if (!src) return;

      const url = new URL(src);
      const dataValue = url.searchParams.get('data');

      resolve(dataValue);
    } else {
      resolve(null);
    }
  });
}

async function modifyFigureContent(elemento) {
  try {
    const modal = document.getElementById('myModaChangeText');
    const formChangeText = document.getElementById('FormChangeText');

    if (!elemento) {
      throw new Error('No se encontró el <elemento> del evento');
    }

    if (!modal) {
      throw new Error('No se encontró el elemento <modal>');
    }

    if (!formChangeText) {
      throw new Error('No se encontró el elemento <textarea>');
    }

    const dataValue = await getDataValueFromFigure(elemento);

    if (dataValue) {
      formChangeText.changeData.value = dataValue;
    } else {
      alert('Ha ocurrido un error al obtener el valor de data.');
    }

    modal.style.display = 'block';

    if (formChangeText.changeData) {
      formChangeText.changeData.focus();
      setTimeout(() => formChangeText.changeData.select(), 50);
    }

    // Remueve el listener previo si existe
    modal.removeEventListener('submit', setNewValueFigureContent);
    modal.addEventListener('submit', function (e) {
      setNewValueFigureContent(e, elemento);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function setNewValueFigureContent(e, elemento) {
  e.preventDefault();

  const formChangeData = e.target;

  if (!formChangeData) {
    console.error('No se encontró el formulario');
    return;
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
  const modal = document.getElementById('myModaChangeText');
  if (modal) {
    modal.style.display = 'none';
  }
}

function modifyTextContent(elemento) {
  let nuevoContenido = getValueModal();

  if (!nuevoContenido) return;
  nuevoContenido = nuevoContenido.trim().split('\n');

  elemento.innerHTML = '';

  nuevoContenido.forEach(texto => {
    const p = document.createElement('p');
    p.textContent = texto;
    p.className = 'texto';

    elemento.appendChild(p);
  });
}

function getValueModal() {
  modal.style.display = 'block';

  // Obtener el botón de envío
  var submitBtn = document.getElementById('submitBtn');

  // Manejar el clic en el botón de envío
  submitBtn.onclick = function () {
    // Obtener el nuevo contenido del textarea
    var nuevoContenido = document.getElementById('newContent').value;

    // Llamar a la función para modificar el contenido con el nuevo texto
    modificarContenido(nuevoContenido);

    // Cerrar el modal
    modal.style.display = 'none';
  };

  // Función para modificar el contenido
  function modificarContenido(nuevoContenido) {
    // Aquí puedes agregar la lógica para modificar el contenido según tu requerimiento
    console.log('Nuevo contenido:', nuevoContenido);
    // Por ejemplo, puedes agregar código aquí para modificar el contenido del elemento deseado.}
    return nuevoContenido;
  }
}

window.addEventListener('load', inicio, { once: true });
