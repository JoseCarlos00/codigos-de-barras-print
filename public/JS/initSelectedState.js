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

function initialModal() {
  try {
    const modalInsert = document.getElementById('myModalChangeText');
    const btnCloseModal = document.querySelector('.modal-container-insert .close');

    // Cuando el usuario hace clic en <span> (x), cierra el modal
    btnCloseModal.addEventListener('click', function () {
      modalInsert.style.display = 'none';
    });

    // Cuando el usuario hace clic fuera del modal, ciérralo
    window.addEventListener('click', function (e) {
      const element = e.target;

      if (element == modalInsert) {
        modalInsert.style.display = 'none';
      }
    });

    // Cuando el usuario apreta la tecla Esc, ciérralo
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (modalInsert.style.display === 'block') {
          modalInsert.style.display = 'none';
        }
      }
    });
  } catch (error) {
    console.error('Error: ha ocurrido un error al inicalizar el estado del Modal', error);
  }
}

// Llama a la función de inicialización al cargar la página
window.addEventListener('load', () => {
  initialModal();
  initialSelectMargin();
});
