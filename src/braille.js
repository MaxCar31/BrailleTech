import brailleMap from './brailleMap';

class Braille {
    static toBraille(text) {
        return text.split(/(\d+)/).map(chunk => {
            if (/\d/.test(chunk)) {
                return '⠼' + [...chunk].map(char => brailleMap[char]).join('');
            } else {
                return [...chunk].map(char => brailleMap[char] || char).join('');
            }
        }).join('');
    }

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