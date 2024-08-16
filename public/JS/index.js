import { BarcodeManager } from './Classes/BarcodeManager.js';
import { DropdownManager } from './Classes/DropdownManager.js';

const selectors = {
  dropdownSelector: '#dropdownMenu',
  titleSelector: 'titleDropdown',
  barcodeTypeSelector: 'barcodeType',
};

window.addEventListener(
  'load',
  () => {
    try {
      new BarcodeManager('.area-de-impresion');
      new DropdownManager(selectors);
    } catch (error) {
      console.error('Error al inicializar la creacion de codigos:');
    }
  },
  { once: true }
);
