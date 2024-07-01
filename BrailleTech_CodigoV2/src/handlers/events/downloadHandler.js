import { addLineBreaks, createSignageElement, createMirrorElement, downloadImage, downloadPDF } from '../../utils/utils.js';
import Braille from '../../utils/braille.js';

export function initializeDownloadHandlers() {
    const downloadSignageBtn = document.getElementById('downloadSignageBtn');
    const downloadMirrorImageBtn = document.getElementById('downloadMirrorImageBtn');
    const inputText = document.getElementById('inputText');
    const inputLanguage = document.getElementById('inputLanguage');

    downloadSignageBtn.addEventListener('click', () => {
        if (inputLanguage.value !== 'espanol') {
            alert('El botón solo está disponible cuando el texto de entrada sea en español.');
            return;
        }

        let inputTextValue = inputText.value;

        if (inputTextValue.trim() === '') {
            alert('No se puede descargar. El campo de texto está vacío.');
            return;
        }

        inputTextValue = addLineBreaks(inputTextValue);
        const brailleOutput = Braille.toBraille(inputTextValue);
        const signageElement = createSignageElement(inputTextValue, brailleOutput);
        downloadImage(signageElement, 'señaletica_BrailleTech.png');
    });

    downloadMirrorImageBtn.addEventListener('click', () => {
        if (inputLanguage.value !== 'espanol') {
            alert('El botón solo está disponible cuando el texto de entrada sea en español.');
            return;
        }

        let inputTextValue = inputText.value;

        if (inputTextValue.trim() === '') {
            alert('No se puede descargar. El campo de texto está vacío.');
            return;
        }

        inputTextValue = addLineBreaks(inputTextValue);
        const brailleOutput = Braille.toBraille(inputTextValue);
        const signageElement = createMirrorElement(brailleOutput);
        downloadPDF(signageElement, 'SeñaleticaEspejo_BrailleTech.pdf');
    });
}
