import { toggleRedimensionarListener, cambiarDimensiones, resetElement } from './rezize.js';

function inicio() {
  const dropElement = document.querySelector('.custum-file-upload');
  const areaDeImpresion = document.querySelector('#areaDeImpresion');

  /**
   * Un artículo se suelta en un destino de colocación válido.
   */
  dropElement.addEventListener('drop', function (e) {
    console.log('[Drop delete]');

    // Evitar redirección del navegador
    if (e.stopPropagation) {
      e.stopPropagation();

      this.classList.remove('over');
    }

    // Obtener el ID del elemento a eliminar
    const dataSetId = e.dataTransfer.getData('text/plain');
    const elementToDelete = document.querySelector(`#areaDeImpresion [data-id="${dataSetId}"]`);
    console.log(dataSetId);

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
    // console.log(e);
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
    // console.log(e);
  }

  /**
   * Iniciar arrastre del elemento
   * @param {event} e Evento
   */
  function handleDragStart(e) {
    const nodeName = e.target.nodeName;

    if (nodeName === 'FIGURE' || nodeName === 'DIV') {
      const elemento = e.target;
      getDataId(elemento);
    } else if (nodeName === 'IMG') {
      const elemento = e.target.closest('figure');
      getDataId(elemento);
    } else if (nodeName === 'P') {
      const elemento = e.target.closest('div.texto-plano');
      getDataId(elemento);
    }

    function getDataId(elemento) {
      if (!elemento) return;
      elemento.style.opacity = '0.4';

      elemento.classList.add('dragging');

      setEventoDragEnd(elemento);
      const dataSetId = elemento.dataset['id'];

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', dataSetId);

      console.log(dataSetId);
    }
  }

  /**
   * Una operación de arrastre finaliza
   * (como soltar el botón del mouse o presionar la tecla Esc
   */
  function handleDragEnd(e) {
    this.style.opacity = '1';
  }

  areaDeImpresion.addEventListener('dragstart', handleDragStart);

  // Agregar evento 'drop' para manejar la caída de elementos en esta área
  areaDeImpresion.addEventListener('drop', function (e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado de abrir la imagen o el enlace cuando se suelta el elemento aquí
    const draggableElement = document.querySelector('.dragging:not(.texto-plano)'); // Obtener el elemento que está siendo arrastrado
    const textoPLanoElement = document.querySelector('.dragging.texto-plano');

    if (draggableElement) {
      // Obtener las coordenadas del área de impresión
      const areaRect = areaDeImpresion.getBoundingClientRect();
      // Calcular las coordenadas relativas del punto de soltado dentro del área de impresión
      const posX = e.clientX - areaRect.left - 50;
      const posY = e.clientY - areaRect.top - 50;

      // Establecer las coordenadas del elemento arrastrado para que se coloque donde fue soltado
      draggableElement.style.left = posX + 'px';
      draggableElement.style.top = posY + 'px';
      // Eliminar la clase 'dragging' para indicar que el elemento ya no está siendo arrastrado
      draggableElement.classList.remove('dragging');
    } else if (textoPLanoElement) {
      // Elementos
      let isDragging = false;
      let offsetX, offsetY;
      let isSelected = textoPLanoElement.classList.contains('selected');

      // Función que maneja el evento mousedown
      function onMouseDown(event) {
        // Inicia el arrastre
        isDragging = true;

        // Calcula la posición relativa del clic dentro del elemento
        offsetX = event.clientX - textoPLanoElement.offsetLeft;
        offsetY = event.clientY - textoPLanoElement.offsetTop;

        // Añade un evento mousemove al documento para manejar el arrastre
        document.addEventListener('mousemove', onMouseMove);

        // Añade un evento mouseup para finalizar el arrastre
        document.addEventListener('mouseup', onMouseUp);
      }

      // Función que maneja el evento mousemove
      function onMouseMove(event) {
        if (isDragging) {
          console.log('onMouseMove:', isSelected);
          // Calcula la nueva posición del elemento
          const newLeft = event.clientX - offsetX;
          const newTop = event.clientY - offsetY;

          // Actualiza la posición del elemento
          textoPLanoElement.style.left = `${newLeft}px`;
          textoPLanoElement.style.top = `${newTop}px`;
        }
      }

      // Función que maneja el evento mouseup
      function onMouseUp() {
        // Finaliza el arrastre
        isDragging = false;
        console.log('Eliminar EVENTOS');
        // Elimina los eventos mousemove y mouseup del documento
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        textoPLanoElement.removeEventListener('mousedown', onMouseDown);
      }

      // Añade un evento mousedown al elemento
      textoPLanoElement.addEventListener('mousedown', onMouseDown);
    }
  });

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
    } else {
      // Desmarcar todos los elementos
      const elementosSelected = document.querySelectorAll('.area-de-impresion .selected');
      if (elementosSelected) {
        elementosSelected.forEach(function (element) {
          element.classList.remove('selected');
        });

        resetElement();
      }
    }
  });

  function setData(elemento) {
    console.log('[SetData]');
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
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const selectedElement = document.querySelector('.selected');
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
