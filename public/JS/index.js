import { BarcodeManager } from './Classes/BarcodeManager.js';
import { DropdownManager } from './Classes/DropdownManager.js';

window.addEventListener(
  'load',
  () => {
    // const barcodeManager = new BarcodeManager('.area-de-impresion');
    new BarcodeManager('.area-de-impresion');
    const dropdownManager = new DropdownManager(
      '#dropdownMenu',
      'titleDropdown',
      'barcodeType',
      'dropdownButton'
    );

    // dropdownManager.initializeDropdown();

    console.log('dropdownManager:', dropdownManager);
  },
  { once: true }
);
console.log('INDEX');
