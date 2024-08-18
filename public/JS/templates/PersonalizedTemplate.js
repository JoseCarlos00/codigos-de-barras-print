import { CreateElementDiv, CreateElementFigure } from './CreateCode.js';

export class PersonalizedTemplate {
  constructor({ codeUPCA, code128, modelNumber, description, quantity, prefixDataId }) {
    this.dataSetId = 0;
    this.areaDeImpresion = document.getElementById('areaDeImpresion');
    this.codeUPCA = codeUPCA;
    this.code128 = code128;
    this.modelNumber = modelNumber;
    this.description = description;
    this.quantity = quantity;
    this.prefixDataId = prefixDataId;

    this.validateAreaDeImpresion();
  }

  validateAreaDeImpresion() {
    if (!this.areaDeImpresion) {
      throw new Error('No se encontró el elemento #areaDeImpresion');
    }
  }

  createTextElement({ x, y, html: htmlContent }) {
    this.dataSetId++;

    const elementText = CreateElementDiv.createDivElement({
      prefixDataId: this.prefixDataId,
      dataSetId: this.dataSetId,
      position: { x, y },
    });
    elementText.innerHTML = htmlContent;
    return elementText;
  }

  createFigureElement({ valueURL, dimensions, position, type }) {
    this.dataSetId++;

    const elementFigure = CreateElementFigure.createFigureElemen({
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
      const ejeX = '-6.45456px';

      const codeUPCA = this.createFigureElement({
        valueURL: this.codeUPCA,
        dimensions: { height: '70px', width: '160px' },
        position: { x: '-3.45456px', y: '262.659px' },
        type: 'CodeUPCA',
      });

      const code128 = this.createFigureElement({
        valueURL: this.code128,
        dimensions: { height: '67px', width: '176px' },
        position: { x: '170.545px', y: '262.659px' },
        type: 'Code128',
      });

      // Se crean  los elementos de texto [div] y guardan en un array
      const textElements = [
        {
          x: ejeX,
          y: '13.6591px',
          html: `<p class="texto">STYLE N°/MODELO N°</p> <p class="texto">${this.modelNumber}</p>`,
        },
        {
          x: '168.545px',
          y: '13.6591px',
          html: `<p class="texto" style="letter-spacing: -0.3px;">Fantasias Miguel S.A. de C.V.</p>`,
        },
        { x: ejeX, y: '94.6591px', html: `<p class="texto">Descripción:</p>` },
        { x: ejeX, y: '124.841px', html: ` <p class="texto">${this.description}</p>` },
        {
          x: '22.5454px',
          y: '184.841px',
          html: `<p class="texto">Departamento:</p> <p class="texto">Art. Temporada</p>`,
        },
        {
          x: '200.545px',
          y: '184.841px',
          html: `<p class="texto plantilla-quantity">Total de Pz: <span class="qty">${this.quantity}</span> pz</p>`,
        },
      ].map(data => this.createTextElement(data));

      // Insertar elementos
      this.areaDeImpresion.append(codeUPCA, code128, ...textElements);
    } catch (error) {
      console.error('Class PersonalizedTemplates: error al insertar plantilla:', error);
    }
  }
}
