import Braille from '../utils/braille';
import { addLineBreaks, createSignageElement, createMirrorElement, downloadImage, downloadPDF } from '../utils/utils';
/**
 * Inicializa los controladores de eventos para la aplicación.
 * Este método agrega manejadores de eventos a varios elementos de la interfaz de usuario.
 */
export function initializeEventHandlers() {
    const swapLanguagesBtn = document.getElementById('swapLanguages');
    const translateBtn = document.getElementById('translate');
    const copyBtnFrom = document.getElementById('copyFrom');
    const copyBtnTo = document.getElementById('copyTo');
    const inputText = document.getElementById('inputText');
    const downloadSignageBtn = document.getElementById('downloadSignageBtn');
    const downloadMirrorImageBtn = document.getElementById('downloadMirrorImageBtn');
    const soundFrom = document.getElementById('soundFrom');
    const soundTo = document.getElementById('soundTo');
    const outputText = document.getElementById('outputText');

    /**
     * Evento para leer en voz alta el texto de entrada.
     */
    soundFrom.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(inputText.value);
        window.speechSynthesis.speak(utterance);
    });

    /**
     * Evento para leer en voz alta el texto de salida.
     */
    soundTo.addEventListener('click', () => {
        const spanishText = Braille.toText(outputText.value);
        const utterance = new SpeechSynthesisUtterance(spanishText);
        window.speechSynthesis.speak(utterance);
    });

    /**
     * Evento para intercambiar idiomas y contenido de los campos de texto.
     */
    swapLanguagesBtn.addEventListener('click', () => {
        const inputLanguage = document.getElementById('inputLanguage').value;
        const outputLanguage = document.getElementById('outputLanguage').value;
        document.getElementById('inputLanguage').value = outputLanguage;
        document.getElementById('outputLanguage').value = inputLanguage;
        // Intercambia el contenido de los campos de texto
        const inputText = document.getElementById('inputText').value;
        const outputText = document.getElementById('outputText').value;
        document.getElementById('inputText').value = outputText;
        document.getElementById('outputText').value = inputText;
    });

    /**
     * Evento para realizar la traducción del texto de entrada.
     */
    translateBtn.addEventListener('click', () => {
        const inputLanguage = document.getElementById('inputLanguage').value;
        const inputText = document.getElementById('inputText').value;
        let outputText = '';

        const spanishRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;

        const brailleRegex = /^[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;

        // Verifica la validez del texto de entrada
        if (inputLanguage === 'espanol' && !spanishRegex.test(inputText)) {
            alert('El campo de entrada contiene caracteres no válidos para el español o No se ha ingresado nada.');
            return;
        } else if (inputLanguage === 'braille' && !brailleRegex.test(inputText)) {
            alert('El campo de entrada contiene caracteres no válidos para el braille o No se ha ingresado nada.');
            return;
        }

        // Realiza la traducción
        outputText = (inputLanguage === 'espanol') ? Braille.toBraille(inputText) : Braille.toText(inputText);
        document.getElementById('outputText').value = outputText;
    });

    /**
     * Evento para copiar el texto de entrada al portapapeles.
     */
    if (copyBtnFrom) {
        copyBtnFrom.addEventListener('click', async () => {
            const inputText = document.getElementById('inputText').value;
            await navigator.clipboard.writeText(inputText);
        });
    }

    /**
     * Evento para copiar el texto de salida al portapapeles.
     */
    if (copyBtnTo) {
        copyBtnTo.addEventListener('click', async () => {
            const outputText = document.getElementById('outputText').value;
            await navigator.clipboard.writeText(outputText);
        });
    }

    /**
     * Evento para descargar el letrero en formato de imagen.
     */
    downloadSignageBtn.addEventListener('click', () => {

        const inputLanguage = document.getElementById('inputLanguage').value;
        if (inputLanguage !== 'espanol') {
            alert('El botón solo está disponible cuando el texto de entrada sea en español.');
            return;
        }

        let inputText = document.getElementById('inputText').value
        
        // Verificar si el campo de texto está vacío
        if (inputText.trim() === '') {
            alert('No se puede descargar. El campo de texto está vacío.');
            return;
        }

        inputText = addLineBreaks(inputText);  
        const brailleOutput = Braille.toBraille(inputText);
        const signageElement = createSignageElement(inputText, brailleOutput);
        downloadImage(signageElement, 'signage.png');
    });

    /**
     * Evento para descargar la imagen en formato PDF/espejo.
     */
    downloadMirrorImageBtn.addEventListener('click', () => {
        const inputLanguage = document.getElementById('inputLanguage').value;
        if (inputLanguage !== 'espanol') {
            alert('El botón solo está disponible cuando el texto de entrada sea en español.');
            return;
        }
        let inputText = document.getElementById('inputText').value;

        // Verificar si el campo de texto está vacío
        if (inputText.trim() === '') {
            alert('No se puede descargar. El campo de texto está vacío.');
            return;
        }
        inputText = addLineBreaks(inputText);  
        let brailleOutput = '';
        brailleOutput = Braille.toBraille(inputText);               
        const signageElement = createMirrorElement(brailleOutput);
        downloadPDF(signageElement, 'mirror_signage.pdf');
    });
}
