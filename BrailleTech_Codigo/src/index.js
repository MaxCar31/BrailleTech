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
document.addEventListener('DOMContentLoaded', () => {
    initializeEventHandlers();

    // Añadir funcionalidad del botón Borrar
    const clearBtn = document.getElementById('clear');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
    });
});
