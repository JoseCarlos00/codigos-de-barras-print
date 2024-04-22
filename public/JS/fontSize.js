let elemento = null;

function changeFontZize(elemento, size) {
  if (size > 6) {
    console.log('Size:', size);
    elemento.style.fontSize = size + 'px';
  }
}

if (FormFontSize) {
  FormFontSize.fontSize.addEventListener('focus', function (e) {
    e.target.select();
  });

  FormFontSize.fontSize.addEventListener('input', function (e) {
    const newZize = this.value;

    if (elemento) {
      changeFontZize(elemento, newZize);
    }
  });
}

export function setElementoSize(elementoParams = null, set) {
  if (set) {
    elemento = elementoParams;
  } else {
    elemento = null;
  }
}
