export class ChangeFontSize {
  constructor() {
    this.elementSelected = null;
    this.inputRange = null;
    this.inputNumber = null;
    this.formChangeFontSize = document.getElementById('FormFontSize');
    this.modal = document.querySelector('#myModalChangeFontSize');

    this.initialize();
  }

  verifiForm() {
    if (!this.formChangeFontSize) {
      throw new Error('No se encontró el Formulario #FormFontSize');
    }

    if (!this.modal) {
      throw new Error('No se encontró el elemento Modal para abrir el Formulario');
    }
  }

  initialize() {
    try {
      this.verifiForm();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error al inicializar el formulario FormFontSize:', error);
    }
  }

  setupEventListeners() {
    const { formChangeFontSize } = this;

    this.inputRange = formChangeFontSize.fontSizeRange;
    this.inputNumber = formChangeFontSize.fontSizeInput;

    if (!this.inputRange || !this.inputNumber) {
      throw new Error('No se encontró el input de rango o el input de número en el Formulario');
    }

    this.inputRange.addEventListener('input', e => this.handleInputRange(e));
    this.inputNumber.addEventListener('input', e => this.handleInputNumber(e));
  }

  handleInputRange(e) {
    const { value } = e.target;
    this.updateFontSize(value);
    this.inputNumber.value = value;
  }

  handleInputNumber(e) {
    const { value } = e.target;
    this.updateFontSize(value);
    this.inputRange.value = value;
  }

  updateFontSize(size) {
    if (this.elementSelected) {
      this.elementSelected.style.fontSize = `${size}px`;
    } else {
      console.error('No se ha seleccionado ningún elemento para cambiar el tamaño de fuente');
    }
  }

  setElementSelected(element) {
    this.elementSelected = element;
  }
}
