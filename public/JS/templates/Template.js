export class PersonalizedTemplates {
  constructor({ codeUPCA, code128, modelNumber, description, prefixDataId }) {
    this.dataSetId = 1;
    this.areaDeImpresion = document.getElementById('areaDeImpresion');
    this.codeUPCA = codeUPCA;
    this.code128 = code128;
    this.modelNumber = modelNumber;
    this.description = description;
    this.prefixDataId = prefixDataId;
    console.log('prefixDataId:', prefixDataId);

    if (!this.areaDeImpresion) {
      throw new Error('No se econtro el elemento #areaDeImpresion');
    }
  }

  insertTemplate() {
    try {
      console.log('area:', this.areaDeImpresion);

      if (!this.areaDeImpresion) {
        throw new Error('No se econtro el elemento #areaDeImpresion');
      }

      const encodedValue = value => encodeURIComponent(value);

      const template = `
        <figure draggable="true" class="codigo-upca" data-id="${this.prefixDataId}-${
        this.dataSetId
      }"
            data-type="CodeUPCA"
            style="transform: translate(-3.45456px, 262.659px); opacity: 1; height: 70px; width: 160px;">
            <img alt="Barcode Generator TEC-IT"
              src="https://barcode.tec-it.com/barcode.ashx?data=${encodedValue(
                this.codeUPCA
              )}&amp;code=UPCA" />
          </figure>

          <figure draggable="true" class="codigo-128" data-id="${this.prefixDataId}-${++this
        .dataSetId}" data-type="Code128"
            style="opacity: 1; transform: translate(170.545px, 262.659px); width: 176px; height: 67px;">
            <img alt="Barcode Generator TEC-IT"
              src="https://barcode.tec-it.com/barcode.ashx?data=${encodedValue(
                this.code128
              )}&amp;code=Code128&amp;translate-esc=on&amp;eclevel=L" />
          </figure>

          <div draggable="true" class="texto-plano" data-id="${this.prefixDataId}-${++this
        .dataSetId}"
            style="opacity: 1; transform: translate(-6.55456px, 13.6591px);">
            <p class="texto">STYLE N°/MODELO N°</p>
            <p class="texto">${this.modelNumber}</p>
          </div>
          <div draggable="true" class="texto-plano" data-id="${this.prefixDataId}-${++this
        .dataSetId}"
            style="opacity: 1; transform: translate(168.545px, 15.75px);">
            <p class="texto" style="letter-spacing: -0.3px;">Fantasias Miguel S.A. de C.V.</p>
          </div>
          <div draggable="true" class="texto-plano" data-id="${this.prefixDataId}-${++this
        .dataSetId}"
            style="opacity: 1; transform: translate(-6.45456px, 94.6591px);">
            <p class="texto">Descripción:</p>
          </div>
          <div draggable="true" class="texto-plano" data-id="${this.prefixDataId}-${++this
        .dataSetId}"
            style="opacity: 1; transform: translate(-6.45456px, 124.841px);">
            <p class="texto">${this.description}</p>
          </div>
          <div draggable="true" class="texto-plano" data-id="${this.prefixDataId}-${++this
        .dataSetId}"
            style="opacity: 1; transform: translate(22.5454px, 184.841px);">
            <p class="texto">Departamento:</p>
            <p class="texto">Art. Temporada</p>
          </div>
          <div draggable="true" class="texto-plano" data-id="${this.prefixDataId}-${++this
        .dataSetId}"
            style="opacity: 1; transform: translate(200.545px, 184.841px);">
            <p class="texto plantilla-quantity">Total de Pz: <span class="qty">24</span> pz</p>
          </div>        
      `;

      this.areaDeImpresion.innerHTML = '';
      this.areaDeImpresion.insertAdjacentHTML('beforeend', template);
      this.dataSetId++;
    } catch (error) {
      console.error('Class PersonalizedTemplates: error al insertar plantilla:', error);
    }
  }
}
