import { createCodeQr } from '../CrearCodes/CodeQr.js';

export class BarcodeManager {
  constructor(areaDeImpresionSelector) {
    this.dataSetId = 1;
    this.areaDeImpresion = document.querySelector(areaDeImpresionSelector);
    this.form = document.querySelector('#FormCode');

    if (!areaDeImpresionSelector) {
      throw new Error('No se econtro el elemento .area-de-impresion');
    }

    if (!this.form) {
      throw new Error('No se encotro el elemento: #FormCode');
    }

    this.form.addEventListener('submit', e => this.insertElement(e));

    this.typeCodeCreate = {
      Code128: ({ value, type }) => this.setInsertCode128({ value, type }),
      CodeQR: ({ value, type }) => this.setInsertCodeQr({ value, type }),
      CodeUPCA: ({ value, type }) => this.setInsetCodeUPCA({ value, type }),
      Texto: ({ value }) => this.setInsertText({ value }),
    };
  }

  insertElement(e) {
    try {
      e.preventDefault();

      const data = this.form.DataCode.value.trim();
      const typeCode = this.form.DataType.dataset['id'];

      if (!data) return;

      if (typeCode === 'CodeUPCA') {
        // Validar el código UPC-A
        if (!this.isValidUPCA({ valueNumeric: Number(data), value: data })) {
          alert('Código UPC-A no válido.');
          return;
        }
      }

      if (this.typeCodeCreate[typeCode]) {
        this.typeCodeCreate[typeCode]({ value: data, type: typeCode });
      }

      this.form.reset();
    } catch (error) {
      console.error('Error al crear el codigo selecionado:');
    }
  }

  setInsertCode128({ value, type }) {
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

  setInsertCodeQr({ value, type }) {
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

  isValidUPCA({ value: upcCode }) {
    // Validar el código UPC-A
    // Verificar que el código tenga 12 dígitos
    if (upcCode.length !== 12) {
      return false;
    }

    // Calcular el dígito de verificación
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      let digit = parseInt(upcCode[i], 10);
      if (i % 2 === 0) {
        sum += digit;
      } else {
        sum += digit * 3;
      }
    }

    // Calcular el resto de la división entre la suma y 10
    let remainder = sum % 10;

    // Verificar que el dígito de verificación sea correcto
    let checkDigit = parseInt(upcCode[11], 10);
    // Dígito de control erróneo
    if (remainder === 0) {
      console.log('Validacion 1');
      return checkDigit === 0;
    } else {
      console.log('Validacion 2');
      return checkDigit === 10 - remainder;
    }
  }

  setInsetCodeUPCA({ value, type }) {
    const encodedValue = encodeURIComponent(value.trim());
    const html = `
      <figure draggable="true" class="codigo-upca" data-id="${this.dataSetId}" data-type="${type}">
        <img alt='Barcode Generator TEC-IT' 
        src='https://barcode.tec-it.com/barcode.ashx?data=${encodedValue}&code=UPCA' />
      </figure>
    `;
    this.areaDeImpresion.insertAdjacentHTML('beforeend', html);
    this.dataSetId++;
  }

  setInsertText({ value }) {
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