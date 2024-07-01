
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Agrega saltos de línea cada cierto número de caracteres y limita el número de líneas.
 * @param {string} text - El texto a modificar.
 * @returns {string} El texto con saltos de línea y limitado a 25 líneas.
 */
export function addLineBreaks(text) {
    const maxCharsPerLine = 40;
    const maxLines = 25;
    let words = text.split(/\s+/); // Dividir el texto en palabras
    let result = '';
    let lineWords = [];
    let lineCount = 0;

    words.forEach(word => {
        if ((lineWords.join(' ') + ' ' + word).length <= maxCharsPerLine) {
            lineWords.push(word);
        } else {
            if (lineCount < maxLines) {
                result += lineWords.join(' ') + '\n';
                lineWords = [word];
                lineCount++;
            }
        }
    });

    // Agregar la última línea de palabras si hay espacio para otra línea
    if (lineCount < maxLines) {
        result += lineWords.join(' ');
    }

    return result.trim();
}


/**
 * Descarga una imagen del elemento dado.
 * @param {HTMLElement} element - El elemento a convertir en imagen.
 * @param {string} filename - El nombre del archivo de la imagen.
 */
export function downloadImage(element, filename) {
    html2canvas(element, {
        useCORS: true,
        scale: 2,  // aumentar la resolución del canvas para una mejor calidad
    }).then(canvas => {
        const width = canvas.width;
        const height = canvas.height;

        // Crear un nuevo canvas para la parte izquierda
        const leftCanvas = document.createElement('canvas');
        const leftContext = leftCanvas.getContext('2d');
        const leftWidth = width / 3.5;  // Ancho de la mitad izquierda
        const leftHeight = height;

        leftCanvas.width = leftWidth;
        leftCanvas.height = leftHeight;

        // Copiar los datos del canvas original a la mitad izquierda del nuevo canvas
        leftContext.drawImage(canvas, 0, 0, leftWidth, leftHeight, 0, 0, leftWidth, leftHeight);

        // Descargar la imagen de la mitad izquierda
        const link = document.createElement('a');
        link.download = filename;
        link.href = leftCanvas.toDataURL();
        link.click();
        setTimeout(() => {
            document.body.removeChild(element);
        }, 10);
    });
}

/**
 * Descarga un PDF del elemento dado, cortando la imagen en dos y descargando solo la parte izquierda.
 * @param {HTMLElement} element - El elemento a convertir en PDF.
 * @param {string} filename - El nombre del archivo del PDF.
 * @param {number} margin - El margen en milímetros para el PDF.
 */
export function downloadPDF(element, filename, margin = 10) {
    const scale = 3;
    html2canvas(element, { scale: scale }).then(canvas => {
        const width = canvas.width;
        const height = canvas.height;

        // Crear un nuevo canvas para la parte izquierda
        const leftCanvas = document.createElement('canvas');
        const leftContext = leftCanvas.getContext('2d');
        
        const leftWidth = width / 3.5;  // Ancho de la mitad izquierda
        const leftHeight = height;

        leftCanvas.width = leftWidth;
        leftCanvas.height = leftHeight;

            // Invertir la imagen horizontalmente
    leftContext.translate(leftWidth, 0);
    leftContext.scale(-1, 1);
        // Copiar los datos del canvas original a la mitad izquierda del nuevo canvas
        leftContext.drawImage(canvas, 0, 0, leftWidth, leftHeight, 0, 0, leftWidth, leftHeight);

        const imgData = leftCanvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
        const imgWidth = leftCanvas.width / scale;
        const imgHeight = leftCanvas.height / scale;
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
    //signageElement.appendChild(outputSignageInk);
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
