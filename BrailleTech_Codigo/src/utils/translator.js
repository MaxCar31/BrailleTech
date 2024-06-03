// src/translator.js
import Braille from './braille';

/**
 * Convierte un texto a Braille.
 * @param {string} text - El texto a convertir.
 * @returns {string} El texto convertido a Braille.
 */
export function toBraille(text) {
    return Braille.toBraille(text);
}

/**
 * Convierte un texto en Braille a texto normal.
 * @param {string} brailleText - El texto en Braille a convertir.
 * @returns {string} El texto convertido a texto normal.
 */
export function fromBraille(brailleText) {
    return Braille.toText(brailleText);
}
