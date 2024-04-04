function inicio() {
  const dropdownButton = document.querySelector('#dropdownButton');
  const dropdownItem = document.querySelector('#dropdownMenu');

  if (dropdownButton) {
    dropdownButton.addEventListener('click', toggleDropdown);
  }

  if (dropdownItem) {
    dropdownItem.addEventListener('click', e => changeBarcode(e));
  }

  insertarCodigos();
}

function toggleDropdown() {
  console.log('[Toggle Dropdown]');

  if (dropdownMenu.classList.contains('hidden')) {
    dropdownMenu.classList.remove('hidden');
  } else {
    dropdownMenu.classList.add('hidden');
  }
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

    console.log('Data:', data);

    if (!data) return;

    if (typeCode === 'Code128') {
      setInsertCode128(data, areaDeImpresion);
    } else if (typeCode === 'CodeQR') {
      setInsertCodeQr(data, areaDeImpresion);
    }

    this.reset();
  });
}

function setInsertCode128(value, element) {
  if (!value) return;

  value = value.trim();

  const html = `
<img alt='Barcode Generator TEC-IT'
    src='https://barcode.tec-it.com/barcode.ashx?data=${value}&code=Code128&translate-esc=on&eclevel=L' />
`;

  element.insertAdjacentHTML('beforeend', html);
}

function setInsertCodeQr(value, element) {
  if (!value) return;

  value = value.trim();

  const html = `
  <img alt='Barcode Generator TEC-IT'
     src='https://barcode.tec-it.com/barcode.ashx?data=${value}&code=QRCode&eclevel=L&dmsize=Default' />
  `;

  element.insertAdjacentHTML('beforeend', html);
}

window.addEventListener('load', inicio, { once: true });
