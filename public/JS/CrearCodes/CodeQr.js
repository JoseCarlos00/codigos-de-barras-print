export class createCodeQr {
  constructor({ data = '', type, areaPrint, dataSet }) {
    this.data = data.trim();
    this.type = type;
    this.areaPrint = areaPrint;
    this.dataSet = dataSet;
    this.element = null;
  }

  createElement() {
    const encodedValue = encodeURIComponent(this.data);
    const html = `
      <figure draggable="true" class="codigo-QR" data-id="${this.dataSet}" data-type="${this.type}" style="width: 180px;height: 190px;">
        <img alt='Barcode Generator TEC-IT'
        src='https://barcode.tec-it.com/barcode.ashx?data=${encodedValue}&code=QRCode&eclevel=L&dmsize=Default' />
        <figcaption>${this.data}</figcaption>
      </figure>
    `;
    this.areaPrint.insertAdjacentHTML('beforeend', html);

    setTimeout(() => this.mostrarElement(), 50);
  }

  mostrarElement() {
    const elemenActualy = document.querySelector(
      `.area-de-impresion > figure[data-id="${this.dataSet}"]`
    );

    console.log('elemenActualy:', elemenActualy);

    if (elemenActualy) {
      this.element = elemenActualy;
      console.log('Elemento:', this.element);
    }
  }
}
