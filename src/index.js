import html2canvas from 'html2canvas';
import './style.css';
import Braille from './braille';

function toBraille(text) {
    return Braille.toBraille(text);
}

function fromBraille(brailleText) {
    return Braille.toText(brailleText);
}

document.getElementById('translateToBraille').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const brailleOutput = toBraille(inputText);
    document.getElementById('outputBraille').innerText = brailleOutput;
});

document.getElementById('translateToSpanish').addEventListener('click', () => {
    const inputBraille = document.getElementById('inputBraille').value;
    const textOutput = fromBraille(inputBraille);
    document.getElementById('outputSpanish').innerText = textOutput;
});

document.getElementById('generateBrailleSignage').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const brailleOutput = toBraille(inputText);
    document.getElementById('outputSignageInk').innerText = inputText;
    document.getElementById('outputSignageBraille').innerText = brailleOutput;
});

document.getElementById('generateMirrorBraille').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const brailleOutput = toBraille(inputText).split('').reverse().join('');
    document.getElementById('outputMirrorInk').innerText = inputText;
    document.getElementById('outputMirrorBraille').innerText = brailleOutput;
});

document.getElementById('downloadSignageImage').addEventListener('click', () => {
    const signageElement = document.getElementById('outputSignage');
    html2canvas(signageElement).then(canvas => {
        const link = document.createElement('a');
        link.download = 'signage.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

document.getElementById('downloadMirrorImage').addEventListener('click', () => {
    const signageElement = document.getElementById('outputMirror');
    html2canvas(signageElement).then(canvas => {
        const link = document.createElement('a');
        link.download = 'mirror_signage.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
