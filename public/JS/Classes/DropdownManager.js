export class DropdownManager {
  constructor({ dropdownSelector, titleSelector, barcodeTypeSelector }) {
    this.dropdownItem = document.querySelector(dropdownSelector);
    this.titleElement = document.getElementById(titleSelector);
    this.h2Element = document.getElementById(barcodeTypeSelector);

    this.initializeDropdown();
  }

  initializeDropdown() {
    if (this.dropdownItem) {
      this.dropdownItem.addEventListener('click', e => this.handleDropdownClick(e));
    }

    // Cargar selección guardada al iniciar
    const savedSelection = localStorage.getItem('selectedBarcode') ?? 'Codigo de Barras';
    if (savedSelection) {
      const selectedItem = document.querySelector(`[data-id="${savedSelection}"]`);
      if (selectedItem) {
        this.toggleSelectedClass(selectedItem);
        this.changeBarcode(selectedItem.dataset['id'], selectedItem.dataset['type']);
      }
    }
  }

  handleDropdownClick(e) {
    if (e.target.nodeName === 'A') {
      const valueId = e.target.dataset['id'];
      const typeCode = e.target.dataset['type'];
      this.changeBarcode(valueId, typeCode);
      this.toggleSelectedClass(e.target);
    }
  }

  changeBarcode(valueId, typeCode) {
    localStorage.setItem('selectedBarcode', valueId);

    if (this.titleElement) this.titleElement.innerHTML = valueId;
    if (this.h2Element) this.h2Element.innerHTML = valueId;

    if (FormCode.DataType) {
      FormCode.DataType.dataset['id'] = typeCode;
    }

    this.changeBackGroundImage(typeCode);
  }

  toggleSelectedClass(element) {
    const dropdownItems = document.querySelectorAll('#dropdownMenu a');
    dropdownItems.forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
  }

  changeBackGroundImage(typeCode) {
    const editorField = document.querySelector('.barcodeData div.editor-field');
    if (!editorField) return;

    const urlImage = {
      Code128: './public/images/128.png',
      CodeQR: './public/images/qr.png',
      Texto: './public/images/pencil.png',
      CodeUPCA: './public/images/128.png',
    };

    if (urlImage[typeCode]) {
      editorField.style.backgroundImage = `url('${urlImage[typeCode]}')`;
    }
  }
}
