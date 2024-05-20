const brailleAlphabet = {
    "a": "⠁", "b": "⠃", "c": "⠉", "d": "⠙", "e": "⠑",
    "f": "⠋", "g": "⠛", "h": "⠓", "i": "⠊", "j": "⠚",
    "k": "⠅", "l": "⠇", "m": "⠍", "n": "⠝", "o": "⠕",
    "p": "⠏", "q": "⠟", "r": "⠗", "s": "⠎", "t": "⠞",
    "u": "⠥", "v": "⠧", "w": "⠺", "x": "⠭", "y": "⠽", "z": "⠵",
    "á": "⠷", "é": "⠮", "í": "⠌", "ó": "⠬", "ú": "⠾", 
    "ñ": "⠻", "ü": "⠳", " ": " ",
    "A": "⠠⠁", "B": "⠠⠃", "C": "⠠⠉", "D": "⠠⠙", "E": "⠠⠑",
    "F": "⠠⠋", "G": "⠠⠛", "H": "⠠⠓", "I": "⠠⠊", "J": "⠠⠚",
    "K": "⠠⠅", "L": "⠠⠇", "M": "⠠⠍", "N": "⠠⠝", "O": "⠠⠕",
    "P": "⠠⠏", "Q": "⠠⠟", "R": "⠠⠗", "S": "⠠⠎", "T": "⠠⠞",
    "U": "⠠⠥", "V": "⠠⠧", "W": "⠠⠺", "X": "⠠⠭", "Y": "⠠⠽", "Z": "⠠⠵",
    "Á": "⠠⠷", "É": "⠠⠮", "Í": "⠠⠌", "Ó": "⠠⠬", "Ú": "⠠⠾",
    "Ñ": "⠠⠻", "Ü": "⠠⠳",
    "1": "⠼⠁", "2": "⠼⠃", "3": "⠼⠉", "4": "⠼⠙", "5": "⠼⠑",
    "6": "⠼⠋", "7": "⠼⠛", "8": "⠼⠓", "9": "⠼⠊", "0": "⠼⠚",
    ".": "⠲", ",": "⠂", ";": "⠆", ":": "⠒", "!": "⠖", "¡": "⠖",
    "?": "⠦", "¿": "⠦", "\"": "⠶", "'": "⠄", "-": "⠤", 
    "(": "⠶⠶", ")": "⠶⠶", "/": "⠌", "&": "⠯", "%": "⠨⠴",
    "@": "⠈⠁", "*": "⠔", "#": "⠼", "$": "⠈⠎", "+": "⠖",
    "=": "⠶", "<": "⠐⠣", ">": "⠐⠜"
};

// Mapeo inverso
const reverseBrailleAlphabet = {};
for (let key in brailleAlphabet) {
    reverseBrailleAlphabet[brailleAlphabet[key]] = key;
}

function translateToBraille() {
    const inputText = document.getElementById('inputText').value;
    let outputText = "";

    for (let char of inputText) {
        outputText += brailleAlphabet[char] || "?";
    }

    document.getElementById('outputBraille').textContent = outputText;
}

function translateToSpanish() {
    const inputBraille = document.getElementById('inputBraille').value;
    let outputText = "";
    let skip = false;
    
    for (let i = 0; i < inputBraille.length; i++) {
        if (skip) {
            skip = false;
            continue;
        }
        let char = inputBraille[i];
        
        if (char === '⠠' || char === '⠼') { // Check for prefix of capital letters or numbers
            outputText += reverseBrailleAlphabet[char + inputBraille[i + 1]] || "?";
            skip = true;
        } else {
            outputText += reverseBrailleAlphabet[char] || "?";
        }
    }

    document.getElementById('outputSpanish').textContent = outputText;
}

function generateBrailleSignage() {
    const inputText = document.getElementById('inputText').value;
    let outputText = "";
    let inkText = "";

    for (let char of inputText) {
        outputText += brailleAlphabet[char] || "?";
        inkText += char;
    }

    document.getElementById('outputSignageInk').textContent = inkText;
    document.getElementById('outputSignageBraille').textContent = outputText;
}

function generateMirrorBraille() {
    const inputText = document.getElementById('inputText').value;
    let outputText = "";
    let inkText = "";

    for (let char of inputText) {
        outputText += brailleAlphabet[char] || "?";
        inkText += char;
    }

    // Reverse the Braille text for mirror image
    outputText = outputText.split("").reverse().join("");

    document.getElementById('outputMirrorInk').textContent = inkText;
    document.getElementById('outputMirrorBraille').textContent = outputText;
}


function downloadBrailleImage() {
    const outputDiv = document.getElementById('outputBraille');

    html2canvas(outputDiv).then(canvas => {
        const link = document.createElement('a');
        link.download = 'braille_translation.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function downloadSignageImage() {
    const outputDiv = document.getElementById('outputSignage');

    html2canvas(outputDiv).then(canvas => {
        const link = document.createElement('a');
        link.download = 'braille_signage.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function downloadMirrorImage() {
    const outputDiv = document.getElementById('outputMirror');

    html2canvas(outputDiv).then(canvas => {
        const link = document.createElement('a');
        link.download = 'braille_mirror.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

