import { CreateElementFigure } from './CreateCode.js';

export class QrTemplate {
  constructor({ prefixDataId, template = [] }) {
    this.dataSetId = 0;
    this.areaDeImpresion = document.getElementById('areaDeImpresion');
    this.prefixDataId = prefixDataId;
    this.template = template;
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
    try {
      this.validateAreaDeImpresion();

      // Limpiar área de impresión
      this.areaDeImpresion.innerHTML = '';

      if (this.template.length === 0) {
        throw new Error('No se encontraron valores');
      }

      // Crear Un array de elementos Creados
      const elements = this.template.map(item => {
        const { value, dimensions, position } = item;
        return this.createFigureElement({
          valueURL: value,
          dimensions,
          position,
          type: 'CodeQR',
        });
      });

      // Insertar elementos
      this.areaDeImpresion.append(...elements);
    } catch (error) {
      console.error('Class QrTemplate: error al insertar plantilla qr:', error);
    }
  }
}
