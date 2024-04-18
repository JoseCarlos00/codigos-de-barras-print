let dataSetId = 1;
function inicio() {
  const dropdownItem = document.querySelector('#dropdownMenu');

  if (dropdownItem) {
    dropdownItem.addEventListener('click', changeBarcode);
  }

  insertarCodigos();
}

function changeBarcode(e) {
  if (e.target.nodeName === 'A') {
    const valueId = e.target.dataset['id'];
    const typeCode = e.target.dataset['type'];
    // console.log(e.target.dataset);

    const titleElement = document.getElementById('titleDropdown');
    const h2Element = document.getElementById('barcodeType');
    const buttonElement = document.getElementById('dropdownButton');

    titleElement && (titleElement.innerHTML = valueId);
    h2Element && (h2Element.innerHTML = valueId);
    buttonElement && (buttonElement.innerHTML = valueId);

    FormCode.DataType && (FormCode.DataType.dataset['id'] = typeCode);
  }
}

function insertarCodigos() {
  const areaDeImpresion = document.querySelector('.area-de-impresion');

  FormCode.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = FormCode.DataCode.value.trim();
    const typeCode = FormCode.DataType.dataset['id'];

    console.log(typeCode);

    console.log('DataCode:', data);

    if (!data) return;

    if (typeCode === 'Code128') {
      setInsertCode128(data, areaDeImpresion);
    } else if (typeCode === 'CodeQR') {
      setInsertCodeQr(data, areaDeImpresion);
    } else if (typeCode === 'Texto') {
      setInsertText(data, areaDeImpresion);
    }

    this.reset();
  });
}

function setInsertCode128(value, element) {
  if (!value) return;

  value = value.trim();

  const html = `
  <figure draggable="true" class="codigo-128" data-id="${dataSetId}">
    <img alt='Barcode Generator TEC-IT' 
    src='https://barcode.tec-it.com/barcode.ashx?data=${value}&code=Code128&translate-esc=on&eclevel=L' />
  </figure>
`;

  element.insertAdjacentHTML('beforeend', html);
  dataSetId++;
}

function setInsertCodeQr(value, element) {
  if (!value) return;

  value = value.trim();

  const html = `
  <figure draggable="true" class="codigo-QR" data-id="${dataSetId}">
    <img alt='Barcode Generator TEC-IT' 
    src='https://barcode.tec-it.com/barcode.ashx?data=${value}&code=QRCode&eclevel=L&dmsize=Default' />
    <figcaption>${value}</figcaption>
  </figure>
  `;

  element.insertAdjacentHTML('beforeend', html);
  dataSetId++;
}

function setInsertText(value, element) {
  if (!value) return;

  value = value.trim();

  const html = `
  <div draggable="true" class="texto-plano" data-id="${dataSetId}">
    <p class="texto">${value}</p>
  </div>
  `;

  element.insertAdjacentHTML('beforeend', html);
  dataSetId++;
}

window.addEventListener('load', inicio, { once: true });
