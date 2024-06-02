import html2canvas from 'html2canvas';
import './style.css';
import Braille from './braille';


/**
 * Convierte un texto a Braille.
 * @param {string} text - El texto a convertir.
 * @returns {string} El texto convertido a Braille.
 */
function toBraille(text) {
    return Braille.toBraille(text);
}

/**
 * Convierte un texto en Braille a texto normal.
 * @param {string} brailleText - El texto en Braille a convertir.
 * @returns {string} El texto convertido a texto normal.
 */
function fromBraille(brailleText) {
    return Braille.toText(brailleText);
}

// Función para agregar saltos de línea cada 50 caracteres
function addLineBreaks(text) {
    const maxWords = 7;
    let words = text.split(/\s+/); // Dividir el texto en palabras
    let result = '';
    let lineWords = [];
    words.forEach(word => {
        if ((lineWords.join(' ') + ' ' + word).split(/\s+/).length <= maxWords) {
            lineWords.push(word);
        } else {
            result += lineWords.join(' ') + '\n';
            lineWords = [word];
        }
    });
    result += lineWords.join(' '); // Agregar la última línea de palabras
    return result.trim();
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

   // Evento para leer en voz alta el texto de entrada
    soundFrom.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(inputText.value);
        window.speechSynthesis.speak(utterance);
    });

    // Evento para leer en voz alta el texto de salida
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

        let inputText = document.getElementById('inputText').value;
        inputText = addLineBreaks(inputText);  
        const brailleOutput = toBraille(inputText);
        const signageElement = createSignageElement(inputText, brailleOutput);
        downloadImage(signageElement, 'signage.png');
    });

    // Evento para descargar la imagen en espejo
    downloadMirrorImageBtn.addEventListener('click', () => {
        const inputLanguage = document.getElementById('inputLanguage').value;
        if (inputLanguage !== 'espanol') {
            alert('El botón solo está disponible cuando el texto de entrada sea en español.');
            return;
        }
        let inputText = document.getElementById('inputText').value;
        inputText = addLineBreaks(inputText);  
        let brailleOutput='';
        brailleOutput = toBraille(inputText);               
        const signageElement = createMirrorElement(brailleOutput);
        downloadPDF(signageElement, 'mirror_signage.pdf');
    });
});

/**
 * Crea una señaletica con texto y Braille.
 * @param {string} inputText - El texto de entrada.
 * @param {string} brailleOutput - El texto en Braille.
 * @returns {HTMLElement} El elemento de letrero creado.
 */
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


/**
 * Descarga una imagen del elemento dado.
 * @param {HTMLElement} element - El elemento a convertir en imagen.
 * @param {string} filename - El nombre del archivo de la imagen.
 */
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

/**
 * Crea un elemento de espejo con Braille.
 * @param {string} brailleOutput - El texto en Braille.
 * @returns {HTMLElement} El elemento de espejo creado.
 */
    function createMirrorElement(brailleOutput) {
        const signageElement = document.createElement('div');
        signageElement.id = 'outputMirror';
        signageElement.className = 'output signage-container';
        //signageElement.style.transform = 'rotateY(90deg)'; // Agrega esta línea para rotar el elemento
        const outputMirrorBraille = document.createElement('div');
        outputMirrorBraille.id = 'outputMirrorBraille';
        outputMirrorBraille.className = 'braille';
        outputMirrorBraille.innerText = brailleOutput;
        signageElement.appendChild(outputMirrorBraille);
        document.body.appendChild(signageElement);
        return signageElement;
    }
/*
 * Descarga un PDF del elemento dado.
 * @param {HTMLElement} element - El elemento a convertir en PDF.
 * @param {string} filename - El nombre del archivo del PDF.
 * @param {number} margin - El margen en milímetros para el PDF.
 */
function downloadPDF(element, filename, margin = 10) {
    // Escalar el elemento para mejorar la calidad de la imagen en el PDF
    const scale = 2;

    html2canvas(element, { scale: scale }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Crear una nueva instancia de jsPDF
        let pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
        const imgWidth = canvas.width / scale;
        const imgHeight = canvas.height / scale;
        const ratio = imgWidth / imgHeight;

        // Calcular las dimensiones de la imagen para que se ajuste al tamaño del PDF manteniendo la proporción
        let newWidth, newHeight;

        if (imgWidth > imgHeight) {
            // Si la imagen es más ancha que alta, ajustamos el ancho al ancho del PDF y calculamos la altura proporcionalmente
            newWidth = pdfWidth;
            newHeight = newWidth / ratio;
        } else {
            // Si la imagen es más alta que ancha, ajustamos la altura a la altura del PDF y calculamos el ancho proporcionalmente
            newHeight = pdfHeight;
            newWidth = newHeight * ratio;
        }

        // Asegurarse de que la imagen cabe en el PDF sin desbordarse
        if (newHeight > pdfHeight) {
            newHeight = pdfHeight;
            newWidth = newHeight * ratio;
        }
        if (newWidth > pdfWidth) {
            newWidth = pdfWidth;
            newHeight = newWidth / ratio;
        }

        // Añadir la imagen al PDF con márgenes
        pdf.addImage(imgData, 'PNG', margin, margin, newWidth, newHeight);

        // Guardar el archivo PDF con el nombre especificado
        pdf.save(filename);

        // Eliminar el elemento del DOM después de generar el PDF
        document.body.removeChild(element);
    });
}
