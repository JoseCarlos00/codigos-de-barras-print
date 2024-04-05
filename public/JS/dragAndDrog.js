function inicio() {
  const dropElement = document.querySelector('.custum-file-upload');
  const ariaDeimpresion = document.querySelector('.area-de-impresion');

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
    const elementToDelete = document.querySelector(`.area-de-impresion [data-id="${dataSetId}"]`);

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

  ariaDeimpresion.addEventListener('dragstart', handleDragStart);

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
