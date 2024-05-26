import html2canvas from 'html2canvas';
import './style.css';
import Braille from './braille';

// Función para convertir texto a Braille
function toBraille(text) {
    return Braille.toBraille(text);
}

// Función para convertir Braille a texto
function fromBraille(brailleText) {
    return Braille.toText(brailleText);
}

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const swapLanguagesBtn = document.getElementById('swapLanguages');
    const translateBtn = document.getElementById('translate');
    const copyBtnFrom = document.getElementById('copyFrom');
    const copyBtnTo = document.getElementById('copyTo');
    const inputText = document.getElementById('inputText');
    const downloadSignageBtn = document.getElementById('downloadSignageBtn');
    const downloadMirrorImageBtn = document.getElementById('downloadMirrorImageBtn');
    const soundFrom = document.getElementById('soundFrom');
    const soundTo = document.getElementById('soundTo');
    const outputText = document.getElementById('outputText');
   
    soundFrom.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(inputText.value);
        window.speechSynthesis.speak(utterance);
    });

    soundTo.addEventListener('click', () => {
        const spanishText = fromBraille(outputText.value);
        const utterance = new SpeechSynthesisUtterance(spanishText);
        window.speechSynthesis.speak(utterance);
    });

    // Evento para intercambiar idiomas
    swapLanguagesBtn.addEventListener('click', () => {
        const inputLanguage = document.getElementById('inputLanguage').value;
        const outputLanguage = document.getElementById('outputLanguage').value;
        document.getElementById('inputLanguage').value = outputLanguage;
        document.getElementById('outputLanguage').value = inputLanguage;
        // Intercambia el contenido de los campos de texto
        const inputText = document.getElementById('inputText').value;
        const outputText = document.getElementById('outputText').value;
        document.getElementById('inputText').value = outputText;
        document.getElementById('outputText').value = inputText;
    });

    // Evento para realizar la traducción
    translateBtn.addEventListener('click', () => {
        const inputLanguage = document.getElementById('inputLanguage').value;
        const inputText = document.getElementById('inputText').value;
        let outputText = '';
    
        const spanishRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;

        const brailleRegex = /^[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*\S[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\(\)\!\?\,\;\:\.\-\—\'\"\/\@\%\$\€\¢\£\¥\§\&\*\^\+\=\>\<\[\]\{\}\`\~\\\|¿¡]*$/;

        // Verifica la validez del texto de entrada
        if (inputLanguage === 'espanol' && !spanishRegex.test(inputText)) {
            alert('El campo de entrada contiene caracteres no válidos para el español o No se ha ingresado nada.');
            return;
        } else if (inputLanguage === 'braille' && !brailleRegex.test(inputText)) {
            alert('El campo de entrada contiene caracteres no válidos para el braille o No se ha ingresado nada.');
            return;
        }

        // Realiza la traducción
        outputText = (inputLanguage === 'espanol') ? toBraille(inputText) : fromBraille(inputText);
        document.getElementById('outputText').value = outputText;
    });

    // Evento para copiar texto de entrada al portapapeles
    if (copyBtnFrom) {
        copyBtnFrom.addEventListener('click', async () => {
            const inputText = document.getElementById('inputText').value;
            await navigator.clipboard.writeText(inputText);
        });
    }

    // Evento para copiar texto de salida al portapapeles
    if (copyBtnTo) {
        copyBtnTo.addEventListener('click', async () => {
            const outputText = document.getElementById('outputText').value;
            await navigator.clipboard.writeText(outputText);
        });
    }

    // Evento para descargar el letrero
    downloadSignageBtn.addEventListener('click', () => {

        const inputLanguage = document.getElementById('inputLanguage').value;
        if (inputLanguage !== 'espanol') {
            alert('El botón solo está disponible cuando el texto de entrada sea en español.');
            return;
        }

        const inputText = document.getElementById('inputText').value;
        const brailleOutput = toBraille(inputText);
        const signageElement = createSignageElement(inputText, brailleOutput);
        downloadImage(signageElement, 'signage.png');
    });

    // Evento para descargar la imagen en espejo
    downloadMirrorImageBtn.addEventListener('click', () => {
        const inputText = document.getElementById('inputText').value;
        const brailleOutput = toBraille(inputText);
        const signageElement = createMirrorElement(brailleOutput);
        downloadPDF(signageElement, 'mirror_signage.pdf');
    });
});

// Función para crear el letrero
function createSignageElement(inputText, brailleOutput) {
  
    const signageElement = document.createElement('div');
    signageElement.id = 'outputSignage';
    signageElement.className = 'output signage-container';
    const outputSignageInk = document.createElement('div');
    outputSignageInk.id = 'outputSignageInk';
    outputSignageInk.className = 'ink';
    outputSignageInk.innerText = inputText;
    const outputSignageBraille = document.createElement('div');
    outputSignageBraille.id = 'outputSignageBraille';
    outputSignageBraille.className = 'braille';
    outputSignageBraille.innerText = brailleOutput;
    signageElement.appendChild(outputSignageInk);
    signageElement.appendChild(outputSignageBraille);
    document.body.appendChild(signageElement);
    return signageElement;
}

// Función para descargar la imagen
function downloadImage(element, filename) {
    html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL();
        link.click();
        setTimeout(() => {
            document.body.removeChild(element);
        }, 10);
    });
}

// Función para crear el elemento en espejo
function createMirrorElement(brailleOutput) {
    
    const signageElement = document.createElement('div');
    signageElement.id = 'outputMirror';
    signageElement.className = 'output signage-container';
    const outputMirrorBraille = document.createElement('div');
    outputMirrorBraille.id = 'outputMirrorBraille';
    outputMirrorBraille.className = 'braille';
    outputMirrorBraille.innerText = brailleOutput;
    signageElement.appendChild(outputMirrorBraille);
    document.body.appendChild(signageElement);
    return signageElement;
}

// Función para descargar el PDF
function downloadPDF(element, filename) {
    html2canvas(element, { scale: 2 }).then(canvas => {
        const mirrorCanvas = document.createElement('canvas');
        mirrorCanvas.width = canvas.width;
        mirrorCanvas.height = canvas.height;
        const ctx = mirrorCanvas.getContext('2d');
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, -canvas.width, 0);
        const imgData = mirrorCanvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = mirrorCanvas.width;
        const imgHeight = mirrorCanvas.height;
        const ratio = imgWidth / imgHeight;
        let newWidth = pdfWidth / 2;
        let newHeight = newWidth / ratio;
        if (newHeight > pdfHeight / 2) {
            newHeight = pdfHeight / 2;
            newWidth = newHeight * ratio;
        }
        pdf.addImage(imgData, 'PNG', 0, 0, newWidth, newHeight);
        pdf.save(filename);
        document.body.removeChild(element);
    });
}
