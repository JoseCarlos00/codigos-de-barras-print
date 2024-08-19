// Configuracion de Posicion y dimensiones

/** Usuarios Mariano */
const dimensionsUsuariosMarinao = {
  width: '120px',
  height: '130px',
};
const positionsUsuariosMariano = {
  row1Col1: { x: '-9px', y: '10px' },
  row3Col1: { x: '9px', y: '233.219px' },
  row3Col2: { x: '226px', y: '233.219px' },
};

/**  Banda Ascensor */
const dimensionsBandaAscensor = {
  width: '120px',
  height: '130px',
};
const positionsBandaAscensor = {
  row1Col1: { x: '9px', y: '10px' },
  row2Col2: { x: '215px', y: '127.219px' },
  row3Col1: { x: '9px', y: '233.219px' },
};

/** Banda Ascensor Multi */
const dimensionsBandaAscensorMulti = {
  width: '90px',
  height: '100px',
};
const positionsBandaAscensorMulti = {
  row1Col1: { x: '27px', y: '10px' },
  row2Col1: { x: '27px', y: '142.219px' },
  row3Col1: { x: '27px', y: '275.219px' },
  row2Col2: { x: '215px', y: '142.219px' },
  row1Col2: { x: '215px', y: '10px' },
  row3Col2: { x: '215px', y: '275.219px' },
};

export const qrCongiguration = {
  usuariosMariano: {
    template: [
      {
        value: 'mariano05@fantasiasmiguel.com.mx',
        dimensions: dimensionsUsuariosMarinao,
        position: positionsUsuariosMariano.row1Col1,
      },
      {
        value: 'Scale@2024',
        dimensions: dimensionsUsuariosMarinao,
        position: positionsUsuariosMariano.row3Col1,
      },
      {
        value: 'Scale@2025',
        dimensions: dimensionsUsuariosMarinao,
        position: positionsUsuariosMariano.row3Col2,
      },
    ],
  },
  bandaAscensor: {
    template: [
      {
        value: 'BANDA',
        dimensions: dimensionsBandaAscensor,
        position: positionsBandaAscensor.row1Col1,
      },
      {
        value: 'ASCENSOR',
        dimensions: dimensionsBandaAscensor,
        position: positionsBandaAscensor.row2Col2,
      },
      {
        value: 'ETIQUETADO',
        dimensions: dimensionsBandaAscensor,
        position: positionsBandaAscensor.row3Col1,
      },
    ],
  },
  bandaAscensorMulti: {
    template: [
      {
        value: 'BANDA',
        dimensions: dimensionsBandaAscensorMulti,
        position: positionsBandaAscensorMulti.row1Col1,
      },
      {
        value: 'BANDA',
        dimensions: dimensionsBandaAscensorMulti,
        position: positionsBandaAscensorMulti.row1Col2,
      },
      {
        value: 'ASCENSOR',
        dimensions: dimensionsBandaAscensorMulti,
        position: positionsBandaAscensorMulti.row2Col1,
      },
      {
        value: 'ASCENSOR',
        dimensions: dimensionsBandaAscensorMulti,
        position: positionsBandaAscensorMulti.row2Col2,
      },
      {
        value: 'ETIQUETADO',
        dimensions: dimensionsBandaAscensorMulti,
        position: positionsBandaAscensorMulti.row3Col1,
      },
      {
        value: 'ETIQUETADO',
        dimensions: dimensionsBandaAscensorMulti,
        position: positionsBandaAscensorMulti.row3Col2,
      },
    ],
  },
};
