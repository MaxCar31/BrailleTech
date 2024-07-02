import Braille from '../../utils/braille.js';

/**
 * Inicializa los manejadores de eventos para la funcionalidad de conversión de texto a voz.
 * Este método agrega eventos a los botones de sonido para convertir el texto de entrada y salida a voz usando la API de SpeechSynthesis.
 */
export function initializeSoundHandlers() {
    /**
     * Botón para convertir a voz el texto del área de entrada.
     * @type {HTMLElement}
     */
    const soundFrom = document.getElementById('soundFrom');

    /**
     * Botón para convertir a voz el texto del área de salida.
     * @type {HTMLElement}
     */
    const soundTo = document.getElementById('soundTo');

    /**
     * Área de texto de entrada de donde se obtiene el texto a convertir a voz.
     * @type {HTMLElement}
     */
    const inputText = document.getElementById('inputText');

    /**
     * Área de texto de salida donde se muestra el texto traducido que se convertirá a voz.
     * @type {HTMLElement}
     */
    const outputText = document.getElementById('outputText');


    
    /**
     * Evento de clic para el botón de sonido de entrada.
     * Convierte el texto del área de entrada a voz.
     */
    soundFrom.addEventListener('click', () => {
        /**
         * Utterance para la API de SpeechSynthesis con el texto del área de entrada.
         * @type {SpeechSynthesisUtterance}
         */
        const utterance = new SpeechSynthesisUtterance(inputText.value);
        window.speechSynthesis.speak(utterance);
    });

    /**
     * Evento de clic para el botón de sonido de salida.
     * Convierte el texto del área de salida (traducido a español desde Braille) a voz.
     */
    soundTo.addEventListener('click', () => {
        /**
         * Texto en español obtenido de la traducción del área de salida.
         * @type {string}
         */
        const spanishText = Braille.toText(outputText.value);

        /**
         * Utterance para la API de SpeechSynthesis con el texto traducido del área de salida.
         * @type {SpeechSynthesisUtterance}
         */
        const utterance = new SpeechSynthesisUtterance(spanishText);
        window.speechSynthesis.speak(utterance);
    });
}
