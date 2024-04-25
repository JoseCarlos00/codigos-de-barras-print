import { toggleRedimensionarListener, cambiarDimensiones, resetElement } from './rezize.js';
import { setElementoSize } from './fontSize.js';

function inicio() {
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

  // dropElement.addEventListener('dragenter', handleDragEnter, false);
  dropElement.addEventListener('dragleave', handleDragLeave, false);
  dropElement.addEventListener('dragover', handleDragOver, false);

  /**
   * un elemento arrastrado se arrastra sobre
   * un destino de colocación válido,
   * cada pocos cientos de milisegundos
   *
   * Se ejecuta el evento mientras estas sobre el elemento
   */
  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();

      this.classList.add('over');
    }

    return false;
  }

  /**
   * Un elemento arrastrado ingresa a un destino de colocación válido.
   *
   * Se ejecuta el evento mientras entras y cada ves que te mueves
   */
  function handleDragEnter(e) {
    this.classList.add('over');
  }

  /**
   * Un elemento arrastrado deja un destino de colocación válido.
   *
   * o  sale del área del elemento receptor
   *
   * Se ejecuta el evento mientras entras y cada ves que te mueves
   */
  function handleDragLeave(e) {
    this.classList.remove('over');
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
    } else if (nodeName === 'IMG') {
      const elemento = e.target.closest('figure');
      handleDropWithOffset(e, elemento);
    } else if (nodeName === 'P') {
      const elemento = e.target.closest('div.texto-plano');
      handleDropWithOffset(e, elemento);
    }
  }

  function handleDropWithOffset(e, elemento) {
    if (!elemento) return;

    elemento.style.opacity = '0.4';
    elemento.classList.add('dragging');
    setEventoDragEnd(elemento);

    const dataSetId = elemento.dataset['id'];

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dataSetId);

    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    // Función para manejar el evento drop
    handleDrop = event => {
      event.preventDefault();
      let x = event.clientX - areaDeImpresion.getBoundingClientRect().left - offsetX;
      let y = event.clientY - areaDeImpresion.getBoundingClientRect().top - offsetY;

      // Verificar si el elemento está fuera del área de impresión
      const areaRect = areaDeImpresion.getBoundingClientRect();
      const elementoRect = elemento.getBoundingClientRect();

      let collisionSide = '';

      if (x < 0) {
        collisionSide = 'left';
        x = 0;
      } else if (x + elementoRect.width > areaRect.width) {
        collisionSide = 'right';
        x = areaRect.width - elementoRect.width;
      }

      if (y < 0) {
        collisionSide = 'top';
        y = 0;
      } else if (y + elementoRect.height > areaRect.height) {
        collisionSide = 'bottom';
        y = areaRect.height - elementoRect.height;
      }
      // Cambiar el borde específico dependiendo de la colisión
      switch (collisionSide) {
        case 'left':
          areaDeImpresion.style.borderLeft = '2px solid red';
          break;
        case 'right':
          areaDeImpresion.style.borderRight = '2px solid red';
          break;
        case 'top':
          areaDeImpresion.style.borderTop = '2px solid red';
          break;
        case 'bottom':
          areaDeImpresion.style.borderBottom = '2px solid red';
          break;
        default:
          areaDeImpresion.style.border = ''; // Restaurar el borde predeterminado
      }

      elemento.style.transform = `translate(${x}px, ${y}px)`;
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
  }

  areaDeImpresion.addEventListener('dragstart', handleDragStart);

  // Agregar evento 'dragover' para permitir que los elementos sean soltados en esta área
  areaDeImpresion.addEventListener('dragover', function (e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado de no permitir soltar elementos aquí
  });

  // Agregar evento de click a los elementos para seleccionarlos
  areaDeImpresion.addEventListener('click', function (e) {
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
  });

  function setData(elemento) {
    if (!elemento) return;
    elemento.classList.add('selected');

    /** Redimencinar elementos */
    toggleRedimensionarListener(elemento);
    cambiarDimensiones(elemento);
  }

  function setEventoDragEnd(element) {
    // Verificar si ya existe un evento 'dragend' antes de agregarlo
    if (!element.hasEventListener('dragend')) {
      element.addEventListener('dragend', handleDragEnd, false);
    }
  }

  function eliminarElemento(e) {
    if (e.key === 'Delete') {
      const selectedElement = document.querySelector('main .selected');
      if (selectedElement) {
        selectedElement.remove(); // Eliminar el elemento seleccionado
        resetElement();
      }
    }
  }

  document.addEventListener('keydown', eliminarElemento);
}

Element.prototype.hasEventListener = function (eventName) {
  var events = this._events || {};
  return !!events[eventName];
};

window.addEventListener('load', inicio, { once: true });
