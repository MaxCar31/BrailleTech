
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Agrega saltos de línea cada cierto número de palabras.
 * @param {string} text - El texto a modificar.
 * @returns {string} El texto con saltos de línea.
 */
export function addLineBreaks(text) {
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

/**
 * Descarga una imagen del elemento dado.
 * @param {HTMLElement} element - El elemento a convertir en imagen.
 * @param {string} filename - El nombre del archivo de la imagen.
 */
export function downloadImage(element, filename) {
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
 * Descarga un PDF del elemento dado.
 * @param {HTMLElement} element - El elemento a convertir en PDF.
 * @param {string} filename - El nombre del archivo del PDF.
 * @param {number} margin - El margen en milímetros para el PDF.
 */
export function downloadPDF(element, filename, margin = 10) {
    const scale = 8;
    html2canvas(element, { scale: scale }).then(canvas => {
        const mirrorCanvas = document.createElement('canvas');
        mirrorCanvas.width = canvas.width;
        mirrorCanvas.height = canvas.height;
        const ctx = mirrorCanvas.getContext('2d');
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, -canvas.width, 0);
        const imgData = mirrorCanvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
        const imgWidth = canvas.width / scale;
        const imgHeight = canvas.height / scale;
        const ratio = imgWidth / imgHeight;

        let newWidth, newHeight;
        if (imgWidth > imgHeight) {
            newWidth = pdfWidth;
            newHeight = newWidth / ratio;
        } else {
            newHeight = pdfHeight;
            newWidth = newHeight * ratio;
        }

        if (newHeight > pdfHeight) {
            newHeight = pdfHeight;
            newWidth = newHeight * ratio;
        }
        if (newWidth > pdfWidth) {
            newWidth = pdfWidth;
            newHeight = newWidth / ratio;
        }

        pdf.addImage(imgData, 'PNG', margin, margin, newWidth, newHeight);
        pdf.save(filename);
        document.body.removeChild(element);
    });
}

/**
 * Crea una señaletica con texto y Braille.
 * @param {string} inputText - El texto de entrada.
 * @param {string} brailleOutput - El texto en Braille.
 * @returns {HTMLElement} El elemento de letrero creado.
 */
export function createSignageElement(inputText, brailleOutput) {
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
 * Crea un elemento de espejo con Braille.
 * @param {string} brailleOutput - El texto en Braille.
 * @returns {HTMLElement} El elemento de espejo creado.
 */
export function createMirrorElement(brailleOutput) {
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
