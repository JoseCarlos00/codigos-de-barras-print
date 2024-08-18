import { CreateElementFigure } from './CreateCode.js';

export class QrTemplate {
  constructor({ prefixDataId, value }) {
    this.dataSetId = 0;
    this.areaDeImpresion = document.getElementById('areaDeImpresion');
    this.prefixDataId = prefixDataId;
    this.value = value;
  }

  validateAreaDeImpresion() {
    if (!this.areaDeImpresion) {
      throw new Error('No se encontró el elemento #areaDeImpresion');
    }
  }

  createFigureElement({ valueURL, dimensions, position, type }) {
    this.dataSetId++;

    const elementFigure = CreateElementFigure.createFigureElement({
      prefixDataId: this.prefixDataId,
      dataSetId: this.dataSetId,
      valueURL,
      dimensions,
      position,
      type,
    });

    return elementFigure;
  }

  insertTemplate() {
    this.validateAreaDeImpresion();

    console.log('[Crear Plantilla QR]');
    console.log('prefixDataId:', this.prefixDataId);
    console.log('prefixDataId:', this.value);

    const codeQR1 = this.createFigureElement({
      valueURL: this.value,
      dimensions: { height: '67px', width: '67' },
      position: { x: '170.545px', y: '262.659px' },
      type: 'CodeQR',
    });

    console.log('codeQR1:', codeQR1);

    // Insertar elementos
    this.areaDeImpresion.append(codeQR1);
  }
}
