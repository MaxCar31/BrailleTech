/**
 * @fileoverview Este script inicializa un teclado virtual y configura los manejadores de eventos.
 */
import './css/style.css';
import VirtualKeyboard from './components/VirtualKeyboard';
import { initializeEventHandlers } from './handlers/eventHandlers';
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y listo');

    // Inicializar teclado virtual
    new VirtualKeyboard(
        'inputText',
        'brailleKeyboardLettersLowercase',
        'brailleKeyboardLettersUppercase',
        'brailleKeyboardLettersAccented',
        'brailleKeyboardNumbers',
        'brailleKeyboardSigns'
    );
    console.log('Teclado virtual inicializado');

    // Configurar manejadores de eventos
    initializeEventHandlers();
    console.log('Manejadores de eventos configurados');

    // Añadir funcionalidad del botón Borrar
    const clearBtn = document.getElementById('clear');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    if (clearBtn && inputText && outputText) {
        clearBtn.addEventListener('click', () => {
            console.log('Botón Borrar clickeado');
            inputText.value = '';
            outputText.value = '';
        });
    }
});