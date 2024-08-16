import { toggleRedimensionarListener, cambiarDimensiones, resetElement } from './resize.js';
import { setElementoSize } from './fontSize.js';
import { handleDragOver, handleDragLeave } from './drag-and-drog/functions.js';
import { savePosition } from './undoAndRedo.js';

function inicio() {
  try {
    const trashSection = document.querySelector('section.trash-container');
    const dropElement = document.querySelector('.custum-file-upload');
    const areaDeImpresion = document.querySelector('#areaDeImpresion');

    /**
     * Un artículo se suelta en un destino de colocación válido.
     */
    dropElement.addEventListener('drop', function (e) {
      // Evitar redirección del navegador
      if (e.stopPropagation) {
        e.stopPropagation();

        this.classList.remove('over');
      }

      // Obtener el ID del elemento a eliminar
      const dataSetId = e.dataTransfer.getData('text/plain');
      const elementToDelete = document.querySelector(`#areaDeImpresion [data-id="${dataSetId}"]`);

      // Si se encontró el elemento, eliminarlo
      if (elementToDelete) {
        elementToDelete.remove();
        resetElement();
      }

      return false; // Evitar comportamiento predeterminado
    });

    dropElement.addEventListener('dragleave', handleDragLeave, false);
    dropElement.addEventListener('dragover', handleDragOver, false);

    areaDeImpresion.addEventListener('dragover', handleDragOver, false);
    areaDeImpresion.addEventListener('dragstart', handleDragStart);
    areaDeImpresion.addEventListener('click', handleClick);

    document.addEventListener('keydown', eliminarElemento);

    function showTrash() {
      if (!trashSection) return;

      trashSection.classList.add('show');
    }

    function hiddenTrash() {
      if (!trashSection) return;

      trashSection.classList.remove('show');
    }

    /**
     * Iniciar arrastre del elemento
     * @param {event} e Evento
     */
    let handleDrop = () => {};

    function handleDragStart(e) {
      const nodeName = e.target.nodeName;

      if (nodeName === 'FIGURE' || nodeName === 'DIV') {
        const elemento = e.target;
        handleDropWithOffset(e, elemento);
        showTrash();
      } else if (nodeName === 'IMG') {
        const elemento = e.target.closest('figure');
        handleDropWithOffset(e, elemento);
        showTrash();
      } else if (nodeName === 'P') {
        const elemento = e.target.closest('div.texto-plano');
        handleDropWithOffset(e, elemento);
        showTrash();
      }
    }

    // TODO: Errro en la colicion
    let position = 0;
    function handleDropWithOffset(e, elemento) {
      if (!elemento) return;

      elemento.style.opacity = '0.4';
      elemento.classList.add('dragging');
      setEventDragEnd(elemento);

      const dataSetId = elemento.dataset['id'];

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', dataSetId);

      const offsetX = e.offsetX;
      const offsetY = e.offsetY;

      const areaDeImpresionRect = areaDeImpresion.getBoundingClientRect();
      const elementoRect = elemento.getBoundingClientRect();

      // Almacenar la posición inicial
      const xInicial = elementoRect.left - areaDeImpresionRect.left;
      const yInicial = elementoRect.top - areaDeImpresionRect.top;

      // Función para manejar el evento drop
      handleDrop = event => {
        event.preventDefault();

        const xActual = event.clientX - areaDeImpresionRect.left - offsetX;
        const yActual = event.clientY - areaDeImpresionRect.top - offsetY;

        ++position;
        savePosition({ xInicial, yInicial, xActual, yActual, elemento, position });

        // console.log(
        //   `[xInicial:${xInicial} | yInicial:${yInicial}] - [xActual:${xActual} | yActual:${yActual}]`
        // );

        // Verificar si el elemento está fuera del área de impresión
        let collisionSide = '';

        if (xActual < 0) {
          collisionSide = 'left';
          // xActual = 0;
        } else if (xActual + elementoRect.width > areaDeImpresionRect.width) {
          collisionSide = 'right';
          // xActual = areaRect.width - elementoRect.width;
        }

        if (yActual < 0) {
          collisionSide = 'top';
          // yActual = 0;
        } else if (yActual + elementoRect.height > areaDeImpresionRect.height) {
          collisionSide = 'bottom';
          // yActual = areaRect.height - elementoRect.height;
        }

        // Cambiar el borde específico dependiendo de la colisión
        switch (collisionSide) {
          case 'left':
            areaDeImpresion.style.borderLeft = '3px solid red';
            break;
          case 'right':
            areaDeImpresion.style.borderRight = '3px solid red';
            break;
          case 'top':
            areaDeImpresion.style.borderTop = '3px solid red';
            break;
          case 'bottom':
            areaDeImpresion.style.borderBottom = '3px solid red';
            break;
          default:
            areaDeImpresion.style.border = ''; // Restaurar el borde predeterminado
        }

        elemento.style.transform = `translate(${xActual}px, ${yActual}px)`;
      };

      // Agregar evento 'drop' para manejar la caída de elementos en esta área
      areaDeImpresion.addEventListener('drop', handleDrop);
    }

    /**
     * Una operación de arrastre finaliza
     * (como soltar el botón del mouse o presionar la tecla Esc
     */
    function handleDragEnd(e) {
      this.style.opacity = '1';

      this.classList.remove('dragging');
      areaDeImpresion.removeEventListener('drop', handleDrop);

      hiddenTrash();
    }

    function setEventDragEnd(element) {
      // Verificar si ya existe un evento 'dragend' antes de agregarlo
      if (!element.hasEventListener('dragend')) {
        element.addEventListener('dragend', handleDragEnd, false);
      }
    }
  } catch (error) {
    console.error('Error en dragAndDrog [inicio]:');
  }
}

function handleClick(e) {
  // Marcar el elemento seleccionado
  if (e.target.nodeName === 'FIGURE' || e.target.nodeName === 'DIV') {
    const elemento = e.target;
    setData(elemento);
  } else if (e.target.nodeName === 'IMG') {
    const elemento = e.target.closest('figure');
    setData(elemento);
  } else if (e.target.nodeName === 'P') {
    const elemento = e.target.closest('div.texto-plano');
    setData(elemento);
    setElementoSize(elemento, true);
  } else {
    // Desmarcar todos los elementos
    const elementosSelected = document.querySelectorAll('.area-de-impresion .selected');
    if (elementosSelected) {
      elementosSelected.forEach(function (element) {
        element.classList.remove('selected');
      });

      resetElement();
      setElementoSize(null, false);
    }
  }
}

function setData(elemento) {
  if (!elemento) return;
  elemento.classList.add('selected');

  /** Redimencinar elementos */
  toggleRedimensionarListener(elemento);
  cambiarDimensiones(elemento);
}

function eliminarElemento(e) {
  if (e.key === 'Delete') {
    const selectedElement = document.querySelector('.main .selected');
    console.log('[eliminarElemento]', selectedElement);

    if (selectedElement) {
      selectedElement.remove(); // Eliminar el elemento seleccionado
      resetElement();
    }
  }
}

Element.prototype.hasEventListener = function (eventName) {
  var events = this._events || {};
  return !!events[eventName];
};

window.addEventListener('load', inicio, { once: true });
