let dataSetId = 1;

function inicio() {
  const dropdownItem = document.querySelector('#dropdownMenu');

  if (dropdownItem) {
    dropdownItem.addEventListener('click', function (e) {
      if (e.target.nodeName === 'A') {
        const valueId = e.target.dataset['id'];
        const typeCode = e.target.dataset['type'];
        const elemento = e.target;

        changeBarcode(elemento, valueId, typeCode);
      }
    });
  }

  // Cargar selección guardada al iniciar
  const savedSelection = localStorage.getItem('selectedBarcode') ?? 'Codigo de Barras';
  if (savedSelection) {
    const selectedItem = document.querySelector(`[data-id="${savedSelection}"]`);

    if (selectedItem) {
      toggleSelectedClass(selectedItem);
      const valueId = selectedItem.dataset['id'];
      const typeCode = selectedItem.dataset['type'];

      changeBarcode(selectedItem, valueId, typeCode);
    }
  }

  insertarCodigos();
}

function changeBarcode(elemento, valueId, typeCode) {
  // Guardar selección en localStorage
  localStorage.setItem('selectedBarcode', valueId);

  const titleElement = document.getElementById('titleDropdown');
  const h2Element = document.getElementById('barcodeType');
  const buttonElement = document.getElementById('dropdownButton');

  titleElement && (titleElement.innerHTML = valueId);
  h2Element && (h2Element.innerHTML = valueId);
  buttonElement && (buttonElement.innerHTML = valueId);

  FormCode.DataType && (FormCode.DataType.dataset['id'] = typeCode);

  changeBackGroundImage(typeCode);

  // Aplicar estilos de selección
  toggleSelectedClass(elemento);
}

function toggleSelectedClass(element) {
  const dropdownItems = document.querySelectorAll('#dropdownMenu a');

  dropdownItems.forEach(function (item) {
    item.classList.remove('selected');
  });

  element.classList.add('selected');
}

function changeBackGroundImage(typeCode) {
  const editorField = document.querySelector('.barcodeData div.editor-field');

  if (!editorField) return;

  const urlImage = {
    Code128: './public/images/128.png',
    CodeQR: './public/images/qr.png',
    Texto: './public/images/pencil.png',
    CodeUPCA: './public/images/128.png',
  };

  if (typeCode === 'Code128' || typeCode === 'CodeUPCA') {
    editorField.style.backgroundImage = "url('" + urlImage[typeCode] + "')";
  } else if (typeCode === 'CodeQR') {
    editorField.style.backgroundImage = "url('" + urlImage[typeCode] + "')";
  } else if (typeCode === 'Texto') {
    editorField.style.backgroundImage = "url('" + urlImage[typeCode] + "')";
  }
}

function insertarCodigos() {
  const areaDeImpresion = document.querySelector('.area-de-impresion');

  FormCode.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = FormCode.DataCode.value.trim();
    const typeCode = FormCode.DataType.dataset['id'];

    if (!data) return;

    if (typeCode === 'Code128') {
      setInsertCode128(data, areaDeImpresion, typeCode);
    } else if (typeCode === 'CodeQR') {
      setInsertCodeQr(data, areaDeImpresion, typeCode);
    } else if (typeCode === 'Texto') {
      setInsertText(data, areaDeImpresion);
    }

    this.reset();
  });
}

function setInsertCode128(value, element, type) {
  if (!value) return;

  const encodedValue = encodeURIComponent(value.trim());

  const html = `
  <figure draggable="true" class="codigo-128" data-id="${dataSetId}" data-type="${type}">
    <img alt='Barcode Generator TEC-IT' 
    src='https://barcode.tec-it.com/barcode.ashx?data=${encodedValue}&code=Code128&translate-esc=on&eclevel=L' />
  </figure>
`;

  element.insertAdjacentHTML('beforeend', html);
  dataSetId++;
}

function setInsertCodeQr(value, element, type) {
  if (!value) return;

  const encodedValue = encodeURIComponent(value.trim());
  value = value.trim();

  const html = `
  <figure draggable="true" class="codigo-QR" data-id="${dataSetId}" data-type="${type}" style="width: 180px;height: 190px;transform: translate(55.8px, 44.5px);">
    <img alt='Barcode Generator TEC-IT'
    src='https://barcode.tec-it.com/barcode.ashx?data=${encodedValue}&code=QRCode&eclevel=L&dmsize=Default' />
    <figcaption>${value}</figcaption>
  </figure>
  `;

  element.insertAdjacentHTML('beforeend', html);
  dataSetId++;
}

function setInsertText(value, element) {
  if (!value) return;

  const textoValue = value.trim().split('\n');

  const div = document.createElement('div');
  div.draggable = true;
  div.className = 'texto-plano';
  div.dataset['id'] = `${dataSetId}`;

  textoValue.forEach(texto => {
    const p = document.createElement('p');
    p.textContent = texto;
    p.className = 'texto';

    div.appendChild(p);
  });

  element.appendChild(div);
  dataSetId++;
}

window.addEventListener('load', inicio, { once: true });
