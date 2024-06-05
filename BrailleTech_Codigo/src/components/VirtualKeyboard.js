// VirtualKeyboard.js
import brailleMap from '../data/brailleMap.js';

class VirtualKeyboard {
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

    createBrailleButton(char, braille) {
        const button = document.createElement('button');
        button.textContent = `${braille} [${char}]`;
        button.addEventListener('click', () => {
            this.inputElement.value += braille;
        });
        return button;
    }

    init() {
        this.addButtons(this.lowercaseLetters, this.keyboardLowercase);
        this.addButtons(this.uppercaseLetters, this.keyboardUppercase);
        this.addButtons(this.accentedLetters, this.keyboardAccented);
        this.addButtons(this.numbers, this.keyboardNumbers);
        this.addButtons(this.signs, this.keyboardSigns);
    }

    addButtons(charArray, container) {
        charArray.forEach(char => {
            if (this.brailleMap[char]) {
                container.appendChild(this.createBrailleButton(char, this.brailleMap[char]));
            }
        });
    }
}

export default VirtualKeyboard;
