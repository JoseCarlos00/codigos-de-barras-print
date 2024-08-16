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
    new BarcodeManager('.area-de-impresion');
    new DropdownManager(selectors);
  },
  { once: true }
);
