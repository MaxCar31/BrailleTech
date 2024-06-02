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

  

    static reversedMap = Object.fromEntries(Object.entries(brailleMap).map(([k, v]) => [v, k]));
    
    static toText(braille) {
        let text = '';
        let isCapital = false;
        let isNumber = false;

        braille.split('').forEach((char, index) => {
            if (this.isCapitalIndicator(char)) {
                isCapital = true;
            } else if (this.isNumberIndicator(char)) {
                isNumber = true;
            } else if (this.isPunctuation(char)) {
                text += this.handlePunctuation(char, text);
            } else {
                text += this.translateChar(char, isCapital, isNumber);
                isCapital = false;
                isNumber = this.updateIsNumber(char, isNumber);
            }
        });

        return text;
    }
    
    static isCapitalIndicator(char) {
        return char === '⠨';
    }
    
    static isNumberIndicator(char) {
        return char === '⠼';
    }
    
    static isPunctuation(char) {
        return char === '⠢' || char === '⠖' || char === '⠄' || char === '⠂' || char === '⠆' || char === '⠒';
    }
    
    static handlePunctuation(char, text) {
        if (char === '⠢') {
            // Determine whether to return '¿' or '?'
            if (text.endsWith(' ') || text === '') {
                return '¿';
            } else {
                return '?';
            }
        } else if (char === '⠖') {
            // Determine whether to return '¡' or '!'
            if (text.endsWith(' ') || text === '') {
                return '¡';
            } else {
                return '!';
            }
        } else {
            // Other punctuation marks
            return this.reversedMap[char] || '';
        }
    }
    
    static translateChar(char, isCapital, isNumber) {
        let translatedChar = this.reversedMap[char] || char;

        if (isCapital) {
            translatedChar = translatedChar.toUpperCase();
        }
        if (isNumber && '⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚'.includes(char)) {
            translatedChar = Object.keys(brailleMap).find(key => brailleMap[key] === char && !isNaN(key));
        }
        return translatedChar;
    }
    
    static updateIsNumber(char, isNumber) {
        if (!'⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚'.includes(char)) {
            return false;
        }
        return isNumber;
    }

    static toBraille(text) {
        return text.split(/(\d+)/).map(chunk => {
            if (/\d/.test(chunk)) {
                return '⠼' + [...chunk].map(char => brailleMap[char]).join('');
            } else {
                return [...chunk].map(char => brailleMap[char] || char).join('');
            }
        }).join('');
    }
}

export default Braille;