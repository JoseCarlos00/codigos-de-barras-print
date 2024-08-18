/**
 * { Object } configuration
 * @param {String} dataSetId valor de data-id = "dataSetId"
 * @param {String} valueURL Valor del codigo para la URL del código
 * @param {Object} dimensions Objeto con las dimensiones { width, height }
 * @param {String} type Tipo de Codigo a crear [CodeQR OR Code128 OR CodeUPCA]
 */
export class CreateElementFigure {
  typeCodeMap = {
    CodeQR: 'QRCode&eclevel=L&dmsize=Default',
    Code128: 'Code128&translate-esc=on&eclevel=L',
    CodeUPCA: 'UPCA',
  };

  typeClassName = {
    CodeQR: 'codigo-QR',
    Code128: 'codigo-128',
    CodeUPCA: 'codigo-upca',
  };

  constructor({ dataSetId, valueURL, type, dimensions: { width = 'auto', height = 'auto' } = {} }) {
    this.dataSetId = dataSetId;
    this.valueURL = valueURL;
    this.type = type;
    valueURL;
    this.width = width;
    this.height = height;
  }

  getBarcodeURL() {
    const typeCode = this.typeCodeMap[this.type];
    if (!typeCode) {
      throw new Error(`Tipo de código no soportado: ${this.type}`);
    }

    const encodedValue = encodeURIComponent(this.valueURL);
    return `https://barcode.tec-it.com/barcode.ashx?data=${encodedValue}&code=${typeCode}`;
  }

  createElementfigcaption() {
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = this.valueURL;
    return figcaption;
  }

  createFigureElement() {
    const figure = document.createElement('figure');
    figure.className = this.typeClassName[this.type];
    figure.setAttribute('draggable', 'true');
    figure.dataset.id = this.dataSetId;
    figure.dataset.type = this.type;
    figure.style.opacity = '1';

    const img = document.createElement('img');
    img.alt = 'Barcode Generator TEC-IT';
    img.src = this.getBarcodeURL();

    figure.appendChild(img);

    if (this.type === 'CodeQR') {
      figure.style.width = this.width;
      figure.style.height = this.height;

      figure.appendChild(this.createElementfigcaption());
    }
    return figure;
  }

  /**
   *
   * @param {Object} configuration
   * @returns retorna un elemento [Figure] con la configuracion pasada
   */
  static createFigureElement(configuration) {
    const element = new CreateElementFigure(configuration);
    return element.createFigureElement();
  }
}
