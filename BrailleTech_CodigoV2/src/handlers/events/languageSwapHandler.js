/**
 * Inicializa el manejador de eventos para intercambiar los idiomas de entrada y salida.
 * Este método agrega un evento al botón de intercambio de idiomas para cambiar el idioma de entrada y salida,
 * así como el contenido de los campos de texto correspondientes.
 */
export function initializeLanguageSwapHandler() {
    /**
     * Botón para intercambiar los idiomas de entrada y salida.
     * @type {HTMLElement}
     */
    const swapLanguagesBtn = document.getElementById('swapLanguages');

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
     * Sección del teclado virtual Braille.
     * @type {HTMLElement}
     */
    const virtualKeyboardSection = document.getElementById('virtualKeyboardSection');

    const microphoneIcon = document.getElementById('microphone'); // Obtén el ícono del micrófono


    /**
     * Actualiza la visibilidad del teclado virtual basado en el idioma de entrada seleccionado.
     */
    const updateKeyboardVisibility = () => {
        if (inputLanguage.value === 'braille') {
            virtualKeyboardSection.style.display = 'block';
            microphoneIcon.disabled = true; // Deshabilita el ícono del micrófono si es Braille
            microphoneIcon.classList.add('disabled-icon'); // Opcional: añade una clase para estilo visual
     
        } else {
            virtualKeyboardSection.style.display = 'none';
            microphoneIcon.disabled = false; // Habilita el ícono del micrófono si no es Braille
            microphoneIcon.classList.remove('disabled-icon');
  
        }   
    };

    /**
     * Evento de clic para el botón de intercambio de idiomas.
     * Intercambia el idioma de entrada y salida, así como el contenido de los campos de texto.
     */
    swapLanguagesBtn.addEventListener('click', () => {
        const inputLanguageValue = inputLanguage.value;
        const outputLanguage = document.getElementById('outputLanguage').value;

        inputLanguage.value = outputLanguage;
        document.getElementById('outputLanguage').value = inputLanguageValue;

        const inputTextValue = inputText.value;
        const outputTextValue = outputText.value;

        inputText.value = outputTextValue;
        outputText.value = inputTextValue;

        updateKeyboardVisibility();
    });

    // Inicializa la visibilidad del teclado virtual en función del idioma de entrada actual.
    updateKeyboardVisibility();
}
