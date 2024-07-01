import Braille from '../../utils/braille.js';

export function initializeSoundHandlers() {
    const soundFrom = document.getElementById('soundFrom');
    const soundTo = document.getElementById('soundTo');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    soundFrom.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(inputText.value);
        window.speechSynthesis.speak(utterance);
    });

    soundTo.addEventListener('click', () => {
        const spanishText = Braille.toText(outputText.value);
        const utterance = new SpeechSynthesisUtterance(spanishText);
        window.speechSynthesis.speak(utterance);
    });
}
