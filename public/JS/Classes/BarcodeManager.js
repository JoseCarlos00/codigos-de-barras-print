export class BarcodeManager {
  constructor(areaDeImpresionSelector) {
    this.dataSetId = 1;
    this.areaDeImpresion = document.querySelector(areaDeImpresionSelector);
    this.form = document.querySelector('#FormCode');

    if (this.form) {
      this.form.addEventListener('submit', e => this.insertarCodigo(e));
    }
  }

  insertarCodigo(e) {
    e.preventDefault();

    const data = this.form.DataCode.value.trim();
    const typeCode = this.form.DataType.dataset['id'];

    if (!data) return;

    if (typeCode === 'Code128') {
      this.setInsertCode128(data, typeCode);
    } else if (typeCode === 'CodeQR') {
      this.setInsertCodeQr(data, typeCode);
    } else if (typeCode === 'Texto') {
      this.setInsertText(data);
    }

    this.form.reset();
  }

  setInsertCode128(value, type) {
    const encodedValue = encodeURIComponent(value.trim());
    const html = `
      <figure draggable="true" class="codigo-128" data-id="${this.dataSetId}" data-type="${type}">
        <img alt='Barcode Generator TEC-IT' 
        src='https://barcode.tec-it.com/barcode.ashx?data=${encodedValue}&code=Code128&translate-esc=on&eclevel=L' />
      </figure>
    `;
    this.areaDeImpresion.insertAdjacentHTML('beforeend', html);
    this.dataSetId++;
  }

  setInsertCodeQr(value, type) {
    const encodedValue = encodeURIComponent(value.trim());
    const html = `
      <figure draggable="true" class="codigo-QR" data-id="${
        this.dataSetId
      }" data-type="${type}" style="width: 180px;height: 190px;">
        <img alt='Barcode Generator TEC-IT'
        src='https://barcode.tec-it.com/barcode.ashx?data=${encodedValue}&code=QRCode&eclevel=L&dmsize=Default' />
        <figcaption>${value.trim()}</figcaption>
      </figure>
    `;
    this.areaDeImpresion.insertAdjacentHTML('beforeend', html);
    this.dataSetId++;
  }

  setInsertText(value) {
    const textoValue = value.trim().split('\n');
    const div = document.createElement('div');
    div.draggable = true;
    div.className = 'texto-plano';
    div.dataset['id'] = `${this.dataSetId}`;

    textoValue.forEach(texto => {
      const p = document.createElement('p');
      p.textContent = texto;
      p.className = 'texto';
      div.appendChild(p);
    });

    this.areaDeImpresion.appendChild(div);
    this.dataSetId++;
  }
}
