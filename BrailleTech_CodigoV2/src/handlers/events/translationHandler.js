import Braille from '../../utils/braille.js';

/**
 * Inicializa los manejadores de eventos para la funcionalidad de traducción.
 * Este método agrega un evento al botón de traducir para convertir el texto de entrada al idioma de salida seleccionado.
 */
export function initializeTranslationHandler() {
    /**
     * Botón para realizar la traducción del texto de entrada.
     * @type {HTMLElement}
     */
    const translateBtn = document.getElementById('translate');

    /**
     * Área de texto de entrada de donde se obtiene el texto a traducir.
     * @type {HTMLElement}
     */
    const inputText = document.getElementById('inputText');

    /**
     * Área de texto de salida donde se muestra el texto traducido.
     * @type {HTMLElement}
     */
    const outputText = document.getElementById('outputText');

    /**
     * Selección del idioma de entrada.
     * @type {HTMLElement}
     */
    const inputLanguage = document.getElementById('inputLanguage');

    /**
     * Evento de clic para el botón de traducción.
     * Convierte el texto del área de entrada al idioma de salida seleccionado.
     */
    translateBtn.addEventListener('click', () => {
        /**
         * Valor del idioma de entrada seleccionado.
         * @type {string}
         */
        const inputLanguageValue = inputLanguage.value;

        /**
         * Texto del área de entrada.
         * @type {string}
         */
        const inputTextValue = inputText.value;

        /**
         * Texto del área de salida después de la traducción.
         * @type {string}
         */
        let outputTextValue = '';

        /**
         * Expresión regular para validar texto en español.
         * @type {RegExp}
         */
        const spanishRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;
        /**
         * Expresión regular para validar texto en Braille.
         * @type {RegExp}
         */
        const brailleRegex = /^[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;

        // Validación del texto de entrada basado en el idioma seleccionado
        if (inputLanguageValue === 'espanol' && !spanishRegex.test(inputTextValue)) {
            alert('El campo de entrada contiene caracteres no válidos para el español o No se ha ingresado nada.');
            return;
        } else if (inputLanguageValue === 'braille' && !brailleRegex.test(inputTextValue)) {
            alert('El campo de entrada contiene caracteres no válidos para el braille o No se ha ingresado nada.');
            return;
        }

        // Traducción del texto de entrada al idioma de salida seleccionado
        outputTextValue = (inputLanguageValue === 'espanol') ? Braille.toBraille(inputTextValue) : Braille.toText(inputTextValue);

        // Asignación del texto traducido al área de texto de salida
        outputText.value = outputTextValue;
    });
}
