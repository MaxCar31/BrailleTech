import { initializeLanguageSwapHandler } from './events/languageSwapHandler.js';
import { initializeTranslationHandler } from './events/translationHandler.js';
import { initializeCopyHandlers } from './events/copyHandler.js';
import { initializeVoiceHandler } from './events/voiceHandler.js';
import { initializeDownloadHandlers } from './events/downloadHandler.js';
import { initializeSoundHandlers } from './events/soundHandler.js';

export function initializeEventHandlers() {
    initializeLanguageSwapHandler();
    initializeTranslationHandler();
    initializeCopyHandlers();
    initializeVoiceHandler();
    initializeDownloadHandlers();
    initializeSoundHandlers();
}
