import Braille from '../../utils/braille.js';

export function initializeTranslationHandler() {
    const translateBtn = document.getElementById('translate');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const inputLanguage = document.getElementById('inputLanguage');

    translateBtn.addEventListener('click', () => {
        const inputLanguageValue = inputLanguage.value;
        const inputTextValue = inputText.value;
        let outputTextValue = '';

        const spanishRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;
        const brailleRegex = /^[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;

        if (inputLanguageValue === 'espanol' && !spanishRegex.test(inputTextValue)) {
            alert('El campo de entrada contiene caracteres no válidos para el español o No se ha ingresado nada.');
            return;
        } else if (inputLanguageValue === 'braille' && !brailleRegex.test(inputTextValue)) {
            alert('El campo de entrada contiene caracteres no válidos para el braille o No se ha ingresado nada.');
            return;
        }

        outputTextValue = (inputLanguageValue === 'espanol') ? Braille.toBraille(inputTextValue) : Braille.toText(inputTextValue);
        outputText.value = outputTextValue;
    });
}
