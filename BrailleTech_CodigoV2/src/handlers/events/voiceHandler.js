import { VoiceInput, annyang } from '../../utils/VoiceInput.js';

/**
 * Inicializa los manejadores de eventos para la funcionalidad de reconocimiento de voz.
 * Este método agrega eventos al documento y al icono del micrófono para comenzar y detener la escucha de voz utilizando Annyang.
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

        /**
         * Evento de focus para mostrar el mensaje de ayuda.
         */
        microphoneIcon.addEventListener('focus', () => {
            showHelpMessage();
        });

        /**
         * Evento de blur para ocultar el mensaje de ayuda.
         */
        microphoneIcon.addEventListener('blur', () => {
            hideHelpMessage();
        });
    }

    /**
     * Evento de keydown para manejar la tecla Control.
     * Inicia el reconocimiento de voz si Control está presionado.
     */
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Control' && !annyang.isListening()) {
            voiceInput.startListening();
        }
    });

    /**
     * Evento de keyup para manejar la tecla Control.
     * Detiene el reconocimiento de voz si Control está liberado.
     */
    document.addEventListener('keyup', (event) => {
        if (event.key === 'Control' && annyang.isListening()) {
            voiceInput.stopListening();
        }
    });
}

/**
 * Muestra un mensaje de ayuda indicando que se puede presionar "CTRL" para grabar.
 */
function showHelpMessage() {
    const helpMessage = document.createElement('div');
    helpMessage.id = 'helpMessage';
    helpMessage.innerText = 'Presiona "CTRL" para grabar';
    helpMessage.style.position = 'fixed';
    helpMessage.style.bottom = '10px';
    helpMessage.style.left = '10px';
    helpMessage.style.padding = '5px 10px';
    helpMessage.style.backgroundColor = '#000';
    helpMessage.style.color = '#fff';
    helpMessage.style.borderRadius = '5px';
    helpMessage.style.zIndex = '1000'; 
    document.body.appendChild(helpMessage);
}


/**
 * Oculta el mensaje de ayuda.
 */
function hideHelpMessage() {
    const helpMessage = document.getElementById('helpMessage');
    if (helpMessage) {
        document.body.removeChild(helpMessage);
    }
}
