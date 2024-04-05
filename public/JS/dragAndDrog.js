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

    console.log('elementId:', dataSetId);
    // console.log('elementToDelete:', elementToDelete);

    // Si se encontró el elemento, eliminarlo
    if (elementToDelete) {
      elementToDelete.remove();
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

    if (nodeName === 'IMG' || nodeName === 'DIV') {
      const elemento = e.target;
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
    const draggableElement = document.querySelector('.dragging'); // Obtener el elemento que está siendo arrastrado
    if (draggableElement) {
      // Obtener las coordenadas del área de impresión
      const areaRect = areaDeImpresion.getBoundingClientRect();
      console.log(areaRect);
      // Calcular las coordenadas relativas del punto de soltado dentro del área de impresión
      const posX = e.clientX - areaRect.left - 50;
      const posY = e.clientY - areaRect.top - 50;

      console.log('top:', posY);
      // Establecer las coordenadas del elemento arrastrado para que se coloque donde fue soltado
      draggableElement.style.left = posX + 'px';
      draggableElement.style.top = posY + 'px';
      // Eliminar la clase 'dragging' para indicar que el elemento ya no está siendo arrastrado
      draggableElement.classList.remove('dragging');
    }
  });

  // Agregar evento 'dragover' para permitir que los elementos sean soltados en esta área
  areaDeImpresion.addEventListener('dragover', function (e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado de no permitir soltar elementos aquí
  });

  function setEventoDragEnd(element) {
    // Verificar si ya existe un evento 'dragend' antes de agregarlo
    if (!element.hasEventListener('dragend')) {
      element.addEventListener('dragend', handleDragEnd, false);
    }
  }
}

Element.prototype.hasEventListener = function (eventName) {
  var events = this._events || {};
  return !!events[eventName];
};

window.addEventListener('load', inicio, { once: true });
