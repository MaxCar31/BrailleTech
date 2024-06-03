
import './css/style.css';
import VirtualKeyboard from './components/VirtualKeyboard';
import { initializeEventHandlers } from './handlers/eventHandlers';

// Inicializar teclado virtual
new VirtualKeyboard(
    'inputText',
    'brailleKeyboardLettersLowercase',
    'brailleKeyboardLettersUppercase',
    'brailleKeyboardLettersAccented',
    'brailleKeyboardNumbers',
    'brailleKeyboardSigns'
);

// Configurar manejadores de eventos
document.addEventListener('DOMContentLoaded', initializeEventHandlers);
