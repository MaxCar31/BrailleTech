import { VoiceInput, annyang } from '../../utils/VoiceInput.js';

export function initializeVoiceHandler() {
    const microphoneIcon = document.getElementById('microphone');
    const voiceInput = new VoiceInput('inputText', 'microphone');

    if (microphoneIcon) {
        microphoneIcon.addEventListener('mousedown', () => {
            voiceInput.startListening();
        });

        microphoneIcon.addEventListener('mouseup', () => {
            voiceInput.stopListening();
        });

        // Verificación adicional para debugging
        microphoneIcon.addEventListener('click', () => {
            console.log('Micrófono clickeado. Estado de Annyang:', annyang.isListening() ? 'Escuchando' : 'Detenido');
        });
    }
}
