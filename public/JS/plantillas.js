async function plantillas() {
  try {
    const cleanAreaPrint = document.getElementById('clean-area-print');
    const areaDeImpresion = document.getElementById('areaDeImpresion');

    if (cleanAreaPrint && areaDeImpresion) {
      cleanAreaPrint.addEventListener('click', () => (areaDeImpresion.innerHTML = ''));
    }

    const btnsPlantillaQr = document.querySelectorAll('.plantillas .plantilla-qr.btn');

    if (btnsPlantillaQr.length === 0) {
      throw new Error('No se enontraron botones de plantilla');
    }

    await setEventListener(btnsPlantillaQr);
  } catch (error) {
    console.error('Error:', error);
  }

  function setEventListener(btnPlantilla) {
    return new Promise((resolve, reject) => {
      btnPlantilla.forEach(btn => {
        btn.addEventListener('click', setPlantilla);
      });
    });
  }

  function setPlantilla(e) {
    const type = e.target.dataset.type;

    if (type) {
      insertPlantilla(type);
    }
  }

  function getPlantilla(type = 'none') {
    return new Promise((resolve, reject) => {
      const platillaElementHTML = document.querySelector(
        `section.plantillas .accordion div.plantilla.${type}`
      );

      if (!platillaElementHTML) {
        console.error('No se encontro la plantilla HTML');
        reject();
        return;
      }

      resolve(platillaElementHTML);
    });
  }

  async function insertPlantilla(type) {
    const areaDeImpresion = document.getElementById('areaDeImpresion');

    if (!areaDeImpresion) {
      console.error('No existe el area de impresion');
      reject();
      return;
    }

    // Obtén el elemento fuente y el elemento destino
    const source = await getPlantilla(type);

    // Vacía el contenido del elemento destino
    areaDeImpresion.innerHTML = '';

    // Clona todos los nodos hijos del elemento fuente (profundidad completa)
    const clonedChildren = Array.from(source.childNodes).map(child => child.cloneNode(true));

    // Añade cada nodo clonado al elemento destino
    clonedChildren.forEach(child => areaDeImpresion.appendChild(child));
  }
}

window.addEventListener('load', plantillas, { once: true });
