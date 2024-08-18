/**
 * { Object } configuration
 * @param {String} prefixDataId Prefijo de data-id = [prefix-dataSetId]
 * @param {String} dataSetId Sufijo de data-id = [prefix-dataSetId]
 * @param {String} valueURL Valor del codigo para la URL del código
 * @param {Object} dimensions Objeto con las dimensiones { width, height }
 * @param {Object} position Objeto con las posiciones en ejeX y ejeY { x, y }
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

  constructor({
    prefixDataId,
    dataSetId,
    valueURL,
    dimensions: { width, height },
    position: { x, y },
    type,
  }) {
    this.prefixDataId = prefixDataId;
    this.dataSetId = dataSetId;
    this.valueURL = valueURL;
    this.type = type;

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;
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
    figure.dataset.id = `${this.prefixDataId}-${this.dataSetId}`;
    figure.dataset.type = this.type;
    figure.style.transform = `translate(${this.x}, ${this.y})`;
    figure.style.opacity = '1';
    figure.style.width = this.width;
    figure.style.height = this.height;

    const img = document.createElement('img');
    img.alt = 'Barcode Generator TEC-IT';
    img.src = this.getBarcodeURL();

    figure.appendChild(img);

    if (this.type === 'CodeQR') {
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

/**
 * { Object } configuration
 * @param {String} prefixDataId Prefijo de data-id = [prefix-dataSetId]
 * @param {String} dataSetId Sufijo de data-id = [prefix-dataSetId]
 * @param {Object} position Objeto con las posiciones en ejeX y ejeY { x, y }
 */
export class CreateElementDiv {
  constructor({ prefixDataId, dataSetId, position: { x, y } }) {
    this.prefixDataId = prefixDataId;
    this.dataSetId = dataSetId;

    this.x = x;
    this.y = y;
  }

  createDivElement() {
    const div = document.createElement('div');
    div.className = 'texto-plano';
    div.setAttribute('draggable', 'true');
    div.dataset.id = `${this.prefixDataId}-${this.dataSetId}`;
    div.style.transform = `translate(${this.x}, ${this.y})`;
    div.style.opacity = '1';

    return div;
  }

  /**
   *
   * @param {Object} configuration
   * @returns retorna un elemento [div] con la configuracion pasada
   */
  static createDivElement(configuration) {
    const element = new CreateElementDiv(configuration);
    return element.createDivElement();
  }
}
