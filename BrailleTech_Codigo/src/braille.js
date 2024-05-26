/**
 * @fileoverview Este módulo proporciona una clase Braille para convertir texto a Braille y viceversa.
 */

import brailleMap from './brailleMap';

/**
 * Clase que representa un convertidor de Braille.
 */
class Braille {
    /**
     * Convierte una cadena de texto a Braille.
     * @param {string} text - La cadena de texto a convertir.
     * @return {string} El texto convertido en Braille.
     */
    static toBraille(text) {
        return text.split(/(\d+)/).map(chunk => {
            if (/\d/.test(chunk)) {
                return '⠼' + [...chunk].map(char => brailleMap[char]).join('');
            } else {
                return [...chunk].map(char => brailleMap[char] || char).join('');
            }
        }).join('');
    }

    /**
     * Convierte una cadena de Braille a texto.
     * @param {string} braille - La cadena de Braille a convertir.
     * @return {string} El Braille convertido en texto.
     */
    static toText(braille) {
        const reversedMap = Object.fromEntries(Object.entries(brailleMap).map(([k, v]) => [v, k]));
        let text = '';
        let isCapital = false;
        let isNumber = false;

        for (let char of braille) {
            if (char === '⠠') {
                isCapital = true;
            } else if (char === '⠼') {
                isNumber = true;
            } else {
                let translatedChar = reversedMap[char] || char;
                if (isCapital) {
                    translatedChar = translatedChar.toUpperCase();
                    isCapital = false;
                }
                if (isNumber) {
                    if ('⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚'.includes(char)) {
                        translatedChar = reversedMap[char];
                    } else {
                        isNumber = false;
                    }
                }
                text += translatedChar;
            }
        }
        return text;
    }
}

export default Braille;