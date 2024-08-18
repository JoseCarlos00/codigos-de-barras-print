export class ValidateValue {
  constructor({ value }) {
    this.value = value;
  }

  /**
   *
   * @param {String} param Cadena de Numeros en formato String
   * @returns {Object}
   * result: Con la comparacion de un Formato valido UPC-A,
   * MSG: Mensaje de Error o de Finalizado
   */
  static isValidUPCA({ value }) {
    // Verificar que sea un Numero
    if (!Number(value)) {
      return { resul: false, msg: 'Ingrese solo datos Numericos' };
    }

    // Verificar que el valor tenga exactamente 12 dígitos
    if (value.length !== 12) {
      return {
        result: false,
        msg:
          value.length < 12
            ? `El número debe tener al menos 12 dígitos (${value.length} dígitos)`
            : `El número debe tener exactamente 12 dígitos (${value.length} dígitos)`,
      };
    }

    const digits = value.split('').map(Number);
    const checkDigit = digits.pop();

    // Calcular el dígito de verificación
    const sumOddPositions = digits.filter((_, i) => i % 2 === 0).reduce((sum, num) => sum + num, 0);
    const sumEvenPositions = digits
      .filter((_, i) => i % 2 !== 0)
      .reduce((sum, num) => sum + num, 0);

    const total = sumOddPositions * 3 + sumEvenPositions;
    const calculatedCheckDigit = (10 - (total % 10)) % 10;

    const result = calculatedCheckDigit === checkDigit ?? false;

    const msg = {
      true: 'Formato Valido',
      false: 'Dígito de control erróneo\nWrong check digit',
    };

    return { result, msg: msg[result] };
  }
}
