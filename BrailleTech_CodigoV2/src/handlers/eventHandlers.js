import Braille from '../utils/braille.js';
import { addLineBreaks, createSignageElement, createMirrorElement, downloadImage, downloadPDF } from '../utils/utils.js';
import VoiceInput from '../utils/VoiceInput.js';

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
    const microphoneIcon = document.getElementById('microphone');
    const outputText = document.getElementById('outputText');
    const inputLanguage = document.getElementById('inputLanguage');
    const virtualKeyboardSection = document.getElementById('virtualKeyboardSection');

    const updateKeyboardVisibility = () => {
        if (inputLanguage.value === 'braille') {
            virtualKeyboardSection.style.display = 'block';
        } else {
            virtualKeyboardSection.style.display = 'none';
        }
    };

    // Inicializar la visibilidad del teclado virtual
    updateKeyboardVisibility();

    // Evento para actualizar la visibilidad del teclado virtual cuando se intercambian los idiomas
    swapLanguagesBtn.addEventListener('click', () => {
        const inputLanguageValue = inputLanguage.value;
        const outputLanguage = document.getElementById('outputLanguage').value;
        inputLanguage.value = outputLanguage;
        document.getElementById('outputLanguage').value = inputLanguageValue;
        // Intercambia el contenido de los campos de texto
        const inputTextValue = inputText.value;
        const outputTextValue = outputText.value;
        inputText.value = outputTextValue;
        outputText.value = inputTextValue;

        // Actualizar la visibilidad del teclado virtual
        updateKeyboardVisibility();
    });

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

    // Inicializar VoiceInput
    const voiceInput = new VoiceInput('inputText', 'microphone');

    // Agregar eventos de mousedown y mouseup al icono del micrófono
    if (microphoneIcon) {
    microphoneIcon.addEventListener('mousedown', () => {
        voiceInput.startListening();
    });

    microphoneIcon.addEventListener('mouseup', () => {
        voiceInput.stopListening();
    });
    }

    

    /**
     * Evento para realizar la traducción del texto de entrada.
     */
    translateBtn.addEventListener('click', () => {
        const inputLanguageValue = inputLanguage.value;
        const inputTextValue = inputText.value;
        let outputTextValue = '';

        const spanishRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;

        const brailleRegex = /^[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;

        // Verifica la validez del texto de entrada
        if (inputLanguageValue === 'espanol' && !spanishRegex.test(inputTextValue)) {
            alert('El campo de entrada contiene caracteres no válidos para el español o No se ha ingresado nada.');
            return;
        } else if (inputLanguageValue === 'braille' && !brailleRegex.test(inputTextValue)) {
            alert('El campo de entrada contiene caracteres no válidos para el braille o No se ha ingresado nada.');
            return;
        }

        // Realiza la traducción
        outputTextValue = (inputLanguageValue === 'espanol') ? Braille.toBraille(inputTextValue) : Braille.toText(inputTextValue);
        document.getElementById('outputText').value = outputTextValue;

        // Actualizar la visibilidad del teclado virtual
        updateKeyboardVisibility();
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


