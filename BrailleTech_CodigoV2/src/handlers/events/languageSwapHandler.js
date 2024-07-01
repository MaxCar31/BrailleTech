export function initializeLanguageSwapHandler() {
    const swapLanguagesBtn = document.getElementById('swapLanguages');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const inputLanguage = document.getElementById('inputLanguage');
    const virtualKeyboardSection = document.getElementById('virtualKeyboardSection');

    const updateKeyboardVisibility = () => {
        if (inputLanguage.value === 'braille') {
            virtualKeyboardSection.style.display = 'block';
        } else {
            virtualKeyboardSection.style.display = 'none';
        }
    };

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

    updateKeyboardVisibility();
}
