window.addEventListener('beforeprint', function () {
  const elementsSelected = document.querySelectorAll('#areaDeImpresion .selected');

  if (elementsSelected.length > 0) {
    elementsSelected.forEach(nodo => {
      nodo.classList.remove('selected');
    });
  }
});
