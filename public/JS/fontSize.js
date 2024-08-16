let elemento = null;

function changeFontZize(elemento, size) {
  if (size > 6) {
    elemento.style.fontSize = size + 'px';
  }
}

if (FormFontSize) {
  // FormFontSize.fontSize.addEventListener('focus', function (e) {
  //   e.target.select();
  // });

  FormFontSize.fontSize.addEventListener('input', function (e) {
    const newZize = this.value;

    if (elemento) {
      changeFontZize(elemento, newZize);
      FormFontSize.fontSize2.value = newZize;
    }
  });

  FormFontSize.fontSize2.addEventListener('input', function (e) {
    const newZize = this.value;

    if (elemento) {
      changeFontZize(elemento, newZize);
      FormFontSize.fontSize.value = newZize;
    }
  });
}

export function setElementoSize(elementoParams = null, set) {
  console.log('[setElementoSize]:', elementoParams);

  if (set) {
    elemento = elementoParams;
  } else {
    elemento = null;
  }
}
