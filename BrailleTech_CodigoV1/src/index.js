/**
 * @fileoverview Este script inicializa un teclado virtual y configura los manejadores de eventos.
 */
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

    /**
     * Manejador de evento para el botón Borrar que limpia los campos de entrada y salida.
     * @param {Event} event - El evento click.
     */
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
    });
});
