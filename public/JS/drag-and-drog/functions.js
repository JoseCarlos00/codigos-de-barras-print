/**
 * un elemento arrastrado se arrastra sobre
 * un destino de colocación válido,
 * cada pocos cientos de milisegundos
 *
 * Se ejecuta el evento mientras estas sobre el elemento
 */
export function handleDragOver(e) {
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
export function handleDragEnter(e) {
  this.classList.add('over');
}

/**
 * Un elemento arrastrado deja un destino de colocación válido.
 *
 * o  sale del área del elemento receptor
 *
 * Se ejecuta el evento mientras entras y cada ves que te mueves
 */
export function handleDragLeave(e) {
  this.classList.remove('over');
}
