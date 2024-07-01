import { initializeLanguageSwapHandler } from './events/languageSwapHandler.js';
import { initializeTranslationHandler } from './events/translationHandler.js';
import { initializeCopyHandlers } from './events/copyHandler.js';
import { initializeVoiceHandler } from './events/voiceHandler.js';
import { initializeDownloadHandlers } from './events/downloadHandler.js';
import { initializeSoundHandlers } from './events/soundHandler.js';

/**
 * Inicializa todos los manejadores de eventos de la aplicación.
 * Esta función llama a las funciones específicas de inicialización de eventos
 * para configurar los manejadores de eventos necesarios para cada funcionalidad.
 */

export function initializeEventHandlers() {
    initializeLanguageSwapHandler();
    initializeTranslationHandler();
    initializeCopyHandlers();
    initializeVoiceHandler();
    initializeDownloadHandlers();
    initializeSoundHandlers();
}
