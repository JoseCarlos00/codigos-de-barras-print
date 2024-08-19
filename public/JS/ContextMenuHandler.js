class ContextMenuHandler {
  constructor() {
    this.selectedElementForCopy = null;
    this.selectedElementForPaste = null;
    this.selectedElement = null;
    this.contextMenu = null;
    this.init();
  }

  async init() {
    try {
      await this.initializeContextMenu();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error al crear un Menu Contextual:', error.message);
    }
  }

  async initializeContextMenu() {
    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
      this.contextMenu = contextMenu;
    } else {
      throw new Error('No se encontro el elemento #context-menu');
    }
  }

  verifyAllElementExist() {
    return new Promise((resolve, reject) => {
      const copyOption = document.getElementById('copy-option');
      const pasteOption = document.getElementById('paste-option');
      const areaDeImpresion = document.getElementById('areaDeImpresion');

      if (!copyOption || !pasteOption || !areaDeImpresion) {
        reject({ message: 'No se encontraron los elementos' });
        return;
      }

      resolve({ copyOption, pasteOption, areaDeImpresion });
    });
  }

  async setupEventListeners() {
    const { copyOption, pasteOption, areaDeImpresion } = await this.verifyAllElementExist();

    copyOption.addEventListener('click', () => this.handleClickCopy());
    pasteOption.addEventListener('click', () => this.handlePaste());
    areaDeImpresion.addEventListener('contextmenu', e => this.handleOpenMenu(e));
    document.addEventListener('click', () => this.hideContextMenu());
  }

  handleOpenMenu(e) {
    e.preventDefault();

    const element = e.target;
    const nodeName = element.nodeName;

    console.log('handleOpenMenu:', '[', nodeName, ']', element);

    const x = e.pageX;
    const y = e.pageY;

    if (this.contextMenu) {
      this.contextMenu.style.display = 'block';
      this.contextMenu.style.left = `${x}px`;
      this.contextMenu.style.top = `${y}px`;
    } else {
      // ToastAlert.showAlertFullTop('No se encontró el menú', 'error');
      console.error('No se encontró el menú', 'error');
    }
  }

  hideContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.style.display = 'none';
    }
  }
}

window.addEventListener('load', () => new ContextMenuHandler(), { once: true });
