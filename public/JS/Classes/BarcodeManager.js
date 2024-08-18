import { ValidateValue } from './Validation.js';
import { CreateElementFigure } from './CreateElementFigure.js';

export class BarcodeManager {
  constructor(areaDeImpresionSelector) {
    this.dataSetId = 0;
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

  getBarcodeURL({ value, type }) {
    const typeCode = this.typeCodeMap[type];
    if (!typeCode) {
      throw new Error(`Tipo de código no soportado: ${type}`);
    }

    const encodedValue = encodeURIComponent(value);
    return `https://barcode.tec-it.com/barcode.ashx?data=${encodedValue}&code=${typeCode}`;
  }

  insertElement(e) {
    try {
      e.preventDefault();

      const data = this.form.DataCode.value.trim();
      const typeCode = this.form.DataType.dataset['id'];

      if (!data) return;

      if (typeCode === 'CodeUPCA') {
        // Validar el código UPC-A
        const validate = ValidateValue.isValidUPCA({ value: data });

        if (!validate.result) {
          alert(validate.msg);
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
    this.dataSetId++;

    const code128 = CreateElementFigure.createFigureElement({
      dataSetId: this.dataSetId,
      valueURL: value,
      type,
    });

    this.areaDeImpresion.appendChild(code128);
  }

  setInsertCodeQr({ value, type }) {
    this.dataSetId++;

    const codeQr = CreateElementFigure.createFigureElement({
      dataSetId: this.dataSetId,
      valueURL: value,
      type,
      dimensions: { width: '120px', height: '130px' },
    });

    this.areaDeImpresion.appendChild(codeQr);
  }

  setInsetCodeUPCA({ value, type }) {
    this.dataSetId++;

    const codeUPCA = CreateElementFigure.createFigureElement({
      dataSetId: this.dataSetId,
      valueURL: value,
      type,
    });

    this.areaDeImpresion.appendChild(codeUPCA);
  }

  setInsertText({ value }) {
    this.dataSetId++;

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
  }
}
