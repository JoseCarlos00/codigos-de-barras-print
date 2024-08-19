import { PersonalizedTemplate } from './PersonalizedTemplate.js';
import { personality } from './configuration/templatePersonalityContent.js';

import { QrTemplate } from './QrTemplate.js';
import { qrCongiguration } from './configuration/templateQrContent.js';

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
      throw new Error('No se enontro el elemento .plantillas.acordion');
    }
  } catch (error) {
    console.error('Error al crear las plantillas:', error);
  }

  function handeCLickAcordionButtons(e) {
    const element = e.target;

    // Botones de plantilla
    // Verificar si el elemento tiene una clase que comienza con "plantilla-"
    const hasPlantillaClass = Array.from(element.classList).some(className =>
      className.startsWith('plantilla-')
    );

    if (hasPlantillaClass) {
      setPlantilla({ element });
    }
  }

  function setPlantilla({ element }) {
    const { type, id } = element.dataset;

    if (!type || !id) {
      throw new Error("No se encontro el Data Set: ['type'] OR ['id']");
    }

    if (type.includes('personality-')) {
      const template = new PersonalizedTemplate({
        ...templatePersonalizeType[id],
        prefixDataId: type,
      });

      template.insertTemplate();
    } else if (element.classList.contains('plantilla-qr')) {
      const templateQR = new QrTemplate({
        ...templateQr[id],
        prefixDataId: type,
      });

      templateQR.insertTemplate();
    }
  }
}

const templatePersonalizeType = {
  1: personality.personality1,
  2: personality.personality2,
  3: personality.personality3,
  4: personality.personality4,
  5: personality.personality5,
  6: personality.personality6,
  7: personality.personality7,
  8: personality.personality8,
  9: personality.personality9,
  10: personality.personality10,
  11: personality.personality11,
  12: personality.personality12,
  13: personality.personality13,
  14: personality.personality14,
  15: personality.personality15,
  16: personality.personality16,
  17: personality.personality17,
};

const templateQr = {
  1: qrCongiguration.usuariosMariano,
  2: qrCongiguration.bandaAscensor,
  3: qrCongiguration.bandaAscensorMulti,
};

window.addEventListener('load', plantillas, { once: true });
