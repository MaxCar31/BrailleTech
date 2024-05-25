import brailleMap from './brailleMap';

class Braille {
    static toBraille(text) {
        let brailleText = '';
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            if (brailleMap[char]) {
                brailleText += brailleMap[char];
            } else {
                brailleText += char;
            }
        }
        return brailleText;
    }

    static toText(braille) {
        const reversedMap = Object.fromEntries(Object.entries(brailleMap).map(([k, v]) => [v, k]));
        let text = '';
        let isCapital = false;

        for (let i = 0; i < braille.length; i++) {
            let char = braille[i];
            if (char === '⠠') { // Indicador de mayúsculas
                isCapital = true;
                continue;
            } else {
                let translatedChar = reversedMap[char] || char;
                if (isCapital) {
                    translatedChar = translatedChar.toUpperCase();
                    isCapital = false;
                }
                text += translatedChar;
            }
        }
        return text;
    }
}

export default Braille;
