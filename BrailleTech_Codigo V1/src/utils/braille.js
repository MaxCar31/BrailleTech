/**
 * @fileoverview Este módulo proporciona una clase Braille para convertir texto a Braille y viceversa.
 */

import brailleMap from '../data/brailleMap';

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
     * Mapa invertido para convertir Braille a texto.
     * @type {Object<string, string>}
     * @private
     */
    static reversedMap = Object.fromEntries(Object.entries(brailleMap).map(([k, v]) => [v, k]));
        
    /**
     * Convierte una cadena de Braille a texto.
     * @param {string} braille - La cadena de Braille a convertir.
     * @return {string} El Braille convertido en texto.
     */
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
    
    /**
     * Verifica si el carácter es un indicador de mayúscula.
     * @param {string} char - El carácter a verificar.
     * @return {boolean} Verdadero si el carácter es un indicador de mayúscula.
     */
    static isCapitalIndicator(char) {
        return char === '⠨';
    }
    
    /**
     * Verifica si el carácter es un indicador de número.
     * @param {string} char - El carácter a verificar.
     * @return {boolean} Verdadero si el carácter es un indicador de número.
     */
    static isNumberIndicator(char) {
        return char === '⠼';
    }
    
    /**
     * Verifica si el carácter es un signo de puntuación.
     * @param {string} char - El carácter a verificar.
     * @return {boolean} Verdadero si el carácter es un signo de puntuación.
     */
    static isPunctuation(char) {
        return char === '⠢' || char === '⠖' || char === '⠄' || char === '⠂' || char === '⠆' || char === '⠒';
    }
    
    /**
     * Maneja la traducción de signos de puntuación de Braille a texto.
     * @param {string} char - El carácter de Braille a manejar.
     * @param {string} text - El texto actual.
     * @return {string} El signo de puntuación traducido.
     */
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
    
    /**
     * Traduce un carácter de Braille a texto.
     * @param {string} char - El carácter de Braille a traducir.
     * @param {boolean} isCapital - Indica si el carácter es mayúscula.
     * @param {boolean} isNumber - Indica si el carácter es un número.
     * @return {string} El carácter traducido.
     */
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
    
    /**
     * Actualiza el estado de isNumber en función del carácter actual.
     * @param {string} char - El carácter actual.
     * @param {boolean} isNumber - El estado actual de isNumber.
     * @return {boolean} El nuevo estado de isNumber.
     */
    static updateIsNumber(char, isNumber) {
        if (!'⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚'.includes(char)) {
            return false;
        }
        return isNumber;
    }

}

export default Braille;