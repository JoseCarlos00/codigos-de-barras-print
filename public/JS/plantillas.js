async function plantillas() {
  try {
    const plantillaSelector = 'plantillas';
    const cleanAreaPrint = document.getElementById('clean-area-print');
    const areaDeImpresion = document.getElementById('areaDeImpresion');

    if (cleanAreaPrint && areaDeImpresion) {
      cleanAreaPrint.addEventListener('click', () => (areaDeImpresion.innerHTML = ''));
    }

    const plantillaAcordion = document.getElementById(plantillaSelector);

    if (plantillaAcordion) {
      plantillaAcordion.addEventListener('click', handeCLickAcordionButtons);
    } else {
      throw new Error('No se enontro el elemento .plantillas acordion');
    }
  } catch (error) {
    console.error('Error al crear las plantillas:', error);
  }

  function handeCLickAcordionButtons(e) {
    const element = e.target;

    // Verificar si el elemento tiene una clase que comienza con "plantilla-"
    const hasPlantillaClass = Array.from(element.classList).some(className =>
      className.startsWith('plantilla-')
    );

    if (hasPlantillaClass) {
      setPlantilla({ element });
    }
  }

  function setPlantilla({ element }) {
    const type = element.dataset.type;

    if (type) {
      insertPlantilla(type);
    }
  }

  function getPlantilla(type) {
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
