function inicio() {
  const areaDeImpresion = document.querySelector('#areaDeImpresion');

  // Verificar si se encontró el elemento
  if (!areaDeImpresion) return;
  areaDeImpresion.addEventListener('dblclick', editarContenido);
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

function modifyFigureContent(elemento) {
  let nuevoContenido = prompt('Por favor, ingresa el nuevo contenido:');

  if (!nuevoContenido) return;
  nuevoContenido = nuevoContenido.trim();

  const figure = elemento.closest('figure');
  if (!figure) return;

  const figcaption = figure.querySelector('figcaption');
  const img = figure.querySelector('img');
  const type = figure.dataset['type'];

  const typeCodeMap = {
    CodeQR: 'QRCode&eclevel=L&dmsize=Default',
    Code128: 'Code128&translate-esc=on&eclevel=L',
  };

  const typeCode = type ? typeCodeMap[type] : '';

  if (img) {
    img.src = `https://barcode.tec-it.com/barcode.ashx?data=${nuevoContenido}&code=${typeCode}`;
  }

  figcaption && (figcaption.textContent = `${nuevoContenido}`);
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
