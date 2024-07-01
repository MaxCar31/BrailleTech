import { addLineBreaks, createSignageElement, createMirrorElement, downloadImage, downloadPDF } from '../../utils/utils.js';
import Braille from '../../utils/braille.js';

/**
 * Inicializa los manejadores de eventos para la funcionalidad de descarga de señalética y señalética espejo.
 * Este método agrega eventos a los botones de descarga para generar imágenes y PDFs de la traducción Braille del texto de entrada.
 */
export function initializeDownloadHandlers() {
    /**
     * Botón para descargar la señalética en formato de imagen.
     * @type {HTMLElement}
     */
    const downloadSignageBtn = document.getElementById('downloadSignageBtn');

    /**
     * Botón para descargar la señalética en formato PDF (espejo).
     * @type {HTMLElement}
     */
    const downloadMirrorImageBtn = document.getElementById('downloadMirrorImageBtn');

    /**
     * Área de texto de entrada de donde se obtiene el texto a traducir.
     * @type {HTMLElement}
     */
    const inputText = document.getElementById('inputText');

    /**
     * Selección del idioma de entrada.
     * @type {HTMLElement}
     */
    const inputLanguage = document.getElementById('inputLanguage');

    /**
     * Evento de clic para el botón de descargar señalética.
     * Genera una imagen con la traducción Braille del texto de entrada.
     */
    downloadSignageBtn.addEventListener('click', () => {
        if (inputLanguage.value !== 'espanol') {
            alert('El botón solo está disponible cuando el texto de entrada sea en español.');
            return;
        }

        /**
         * Texto del área de entrada.
         * @type {string}
         */
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

    /**
     * Evento de clic para el botón de descargar señalética espejo.
     * Genera un PDF con la traducción Braille del texto de entrada en formato espejo.
     */
    downloadMirrorImageBtn.addEventListener('click', () => {
        if (inputLanguage.value !== 'espanol') {
            alert('El botón solo está disponible cuando el texto de entrada sea en español.');
            return;
        }

        /**
         * Texto del área de entrada.
         * @type {string}
         */
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
