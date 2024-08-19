// Función para inicializar el estado seleccionado
function initialSelectMargin() {
  console.log('[initSelectedState]');

  try {
    const radioInputSelected = localStorage.getItem('selectMargin');
    const areaDeImpresion = document.getElementById('areaDeImpresion');

    if (radioInputSelected) {
      const radioInputs = document.querySelectorAll(
        '.main header .radio-inputs input[type="radio"]'
      );
      radioInputs.forEach(input => {
        input.checked = input.value === radioInputSelected;
      });

      areaDeImpresion.classList.toggle('not-margin', radioInputSelected === 'Sin margen');
      areaDeImpresion.classList.toggle('with-margin', radioInputSelected === 'Con margen');
    }

    setEventListener({ areaDeImpresion });
  } catch (error) {
    console.error('Error: ha ocurrido un error al inicalizar el estado del margin', error);
  }

  function setEventListener({ areaDeImpresion }) {
    // Escucha los cambios en los inputs de radio
    const radioInputs = document.querySelectorAll('.main header .radio-inputs input[type="radio"]');

    radioInputs.forEach(input => {
      input.addEventListener('change', function () {
        const valueInput = this.value;

        areaDeImpresion.classList.toggle('not-margin', valueInput === 'Sin margen');
        areaDeImpresion.classList.toggle('with-margin', valueInput === 'Con margen');

        if (valueInput === 'Con margen' && this.checked) {
          localStorage.setItem('selectMargin', valueInput);
        } else {
          localStorage.removeItem('selectMargin');
        }
      });
    });
  }
}

class ModalManager {
  constructor(modals) {
    this.modals = modals;
    this.initialize();
  }

  initialize() {
    // Asigna el evento de cierre al hacer clic fuera del modal
    window.addEventListener('click', e => this.handleOutsideClick(e));

    // Asigna el evento de cierre al presionar la tecla Esc
    window.addEventListener('keydown', e => this.handleKeydown(e));

    // Asigna evento al button cerrar Modal
    this.modals.forEach(modal => {
      const btnClose = modal.querySelector('.close');
      if (btnClose) {
        btnClose.addEventListener('click', () => this.closeModal(modal));
      } else {
        console.error('No se encontro el elemento .modal > button.clode');
      }
    });
  }

  handleOutsideClick(e) {
    this.modals.forEach(modal => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.modals.forEach(modal => {
        if (modal.style.display === 'block') {
          this.closeModal(modal);
        }
      });
    }
  }

  closeModal(modal) {
    modal.style.display = 'none';
  }
}

// Llama a la función de inicialización al cargar la página
window.addEventListener('load', () => {
  initialSelectMargin();

  // Inicializa el ModalManager con los modales que deseas manejar
  const modals = document.querySelectorAll('.modal-container-personality .modal');
  new ModalManager(modals);
});
