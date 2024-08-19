import { editarContenido } from './editContent/editContent.js';

class ContextMenuHandler {
  handleSelectedElement = {
    P: ({ element }) => element.closest('div.texto-plano'),
    IMG: ({ element }) => element.closest('figure'),
  };

  constructor() {
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
      const editOption = document.getElementById('edit-option');
      const deleteOption = document.getElementById('delete-option');
      const areaDeImpresion = document.getElementById('areaDeImpresion');

      if (!editOption || !deleteOption || !areaDeImpresion) {
        reject({ message: 'No se encontraron los elementos' });
        return;
      }

      resolve({ editOption, deleteOption, areaDeImpresion });
    });
  }

  async setupEventListeners() {
    try {
      const { editOption, deleteOption, areaDeImpresion } = await this.verifyAllElementExist();

      editOption.addEventListener('click', () => this.handleEditContent());
      deleteOption.addEventListener('click', () => this.handleDeleteContent());
      areaDeImpresion.addEventListener('contextmenu', e => this.handleOpenMenu(e));
      document.addEventListener('click', () => this.hideContextMenu());
    } catch (error) {
      console.error(
        'Error: ha ocurrido un error al inicializar los eventos del menuContextual:',
        error
      );
    }
  }

  validateElementSelected() {
    return new Promise(resolve => {
      console.log('[validateElementSelected]', this.selectedElement);

      if (!this.selectedElement) {
        throw new Error('No se encontro el elemento selecionado');
      }

      resolve();
    });
  }

  async handleEditContent() {
    try {
      await this.validateElementSelected();

      editarContenido({ element: this.selectedElement });
      this.selectedElement = null;
    } catch (error) {
      console.error(
        'Errror: ha ocurrido un error al editar el contenido desde el menuContextual',
        error
      );
    }
  }

  async handleDeleteContent() {
    try {
      await this.validateElementSelected();
      this.selectedElement.remove();
      this.selectedElement = null;
    } catch (error) {
      console.error(
        'Errro: ha ocurrido un error al eliminar el contenido desde el menuContextual',
        error
      );
    }
  }

  hideContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.style.display = 'none';
    }
  }

  handleOpenMenu(e) {
    try {
      e.preventDefault();

      const element = e.target;
      const nodeName = element.nodeName;

      console.log('handleOpenMenu:', '[', nodeName, ']', element);

      // Verifica si el nodo es 'P' o 'IMG'
      if (this.handleSelectedElement[nodeName]) {
        // Asigna el elemento seleccionado utilizando la lógica correspondiente
        this.selectedElement = this.handleSelectedElement[nodeName]({ element });
      } else {
        console.log(`El elemento ${nodeName} no es válido para selección.`);
        this.selectedElement = null; // Opcional: Desasignar si no es P o IMG
      }

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
    } catch (error) {
      console.error('Error: Ha ocurrido un error al abrir el menu Contextual');
    }
  }
}

window.addEventListener('load', () => new ContextMenuHandler(), { once: true });
