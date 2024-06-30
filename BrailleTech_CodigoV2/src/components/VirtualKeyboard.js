// VirtualKeyboard.js
import brailleMap from '../data/brailleMap.js';

/**
 * Representa un teclado virtual que permite la entrada de caracteres Braille.
 * @class
 */
class VirtualKeyboard {
    /**
     * Crea una instancia de VirtualKeyboard.
     * @param {string} inputElementId - El ID del elemento de entrada de texto.
     * @param {string} keyboardLowercaseId - El ID del teclado para letras minúsculas.
     * @param {string} keyboardUppercaseId - El ID del teclado para letras mayúsculas.
     * @param {string} keyboardAccentedId - El ID del teclado para letras acentuadas.
     * @param {string} keyboardNumbersId - El ID del teclado para números.
     * @param {string} keyboardSignsId - El ID del teclado para signos.
     */
    constructor(inputElementId, keyboardLowercaseId, keyboardUppercaseId, keyboardAccentedId, keyboardNumbersId, keyboardSignsId) {
        this.inputElement = document.getElementById(inputElementId);
        this.keyboardLowercase = document.getElementById(keyboardLowercaseId);
        this.keyboardUppercase = document.getElementById(keyboardUppercaseId);
        this.keyboardAccented = document.getElementById(keyboardAccentedId);
        this.keyboardNumbers = document.getElementById(keyboardNumbersId);
        this.keyboardSigns = document.getElementById(keyboardSignsId);
        this.brailleMap = brailleMap;
        this.lowercaseLetters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
            'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 
            't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        this.uppercaseLetters = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
            'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        this.accentedLetters = [
            'á', 'é', 'í', 'ó', 'ú', 'ü', 
            'Á', 'É', 'Í', 'Ó', 'Ú', 'Ü'
        ];
        this.numbers = [
            '#','1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
        ];
        this.signs = [
            ' ', '.', ',', ';', ':', '¿', '?', '¡', '!', '"', '(', ')'
        ];
        this.init();
    }

    /**
     * Crea un botón de Braille y lo añade al contenedor especificado.
     * @param {string} char - El carácter asociado al botón.
     * @param {string} braille - La representación Braille del carácter.
     * @returns {HTMLButtonElement} El elemento del botón creado.
     */
    createBrailleButton(char, braille) {
        const button = document.createElement('button');
        button.textContent = `${braille} [${char}]`;
        button.addEventListener('click', () => {
            this.inputElement.value += braille;
        });
        return button;
    }

    /**
     * Inicializa el teclado virtual añadiendo los botones de Braille.
     */
    init() {
        this.addButtons(this.lowercaseLetters, this.keyboardLowercase);
        this.addButtons(this.uppercaseLetters, this.keyboardUppercase);
        this.addButtons(this.accentedLetters, this.keyboardAccented);
        this.addButtons(this.numbers, this.keyboardNumbers);
        this.addButtons(this.signs, this.keyboardSigns);
    }

    /**
     * Añade botones de Braille a un contenedor especificado.
     * @param {string[]} charArray - Un array de caracteres a añadir como botones.
     * @param {HTMLElement} container - El contenedor al que se añadirán los botones.
     */
    addButtons(charArray, container) {
        charArray.forEach(char => {
            if (this.brailleMap[char]) {
                container.appendChild(this.createBrailleButton(char, this.brailleMap[char]));
            }
        });
    }
}

export default VirtualKeyboard;
