import { VoiceInput, annyang } from '../../utils/VoiceInput.js';

/**
 * Inicializa los manejadores de eventos para la funcionalidad de reconocimiento de voz.
 * Este método agrega eventos al icono del micrófono para comenzar y detener la escucha de voz utilizando Annyang.
 */
export function initializeVoiceHandler() {
    /**
     * Icono del micrófono para activar el reconocimiento de voz.
     * @type {HTMLElement}
     */
    const microphoneIcon = document.getElementById('microphone');

    /**
     * Instancia de VoiceInput para manejar el reconocimiento de voz.
     * @type {VoiceInput}
     */
    const voiceInput = new VoiceInput('inputText', 'microphone');

    if (microphoneIcon) {
        /**
         * Evento de mousedown para el icono del micrófono.
         * Inicia el reconocimiento de voz.
         */
        microphoneIcon.addEventListener('mousedown', () => {
            voiceInput.startListening();
        });

        /**
         * Evento de mouseup para el icono del micrófono.
         * Detiene el reconocimiento de voz.
         */
        microphoneIcon.addEventListener('mouseup', () => {
            voiceInput.stopListening();
        });

        /**
         * Evento de clic adicional para el icono del micrófono.
         * Útil para la depuración, muestra en la consola el estado actual de Annyang.
         */
        microphoneIcon.addEventListener('click', () => {
            console.log('Micrófono clickeado. Estado de Annyang:', annyang.isListening() ? 'Escuchando' : 'Detenido');
        });
    }
}
