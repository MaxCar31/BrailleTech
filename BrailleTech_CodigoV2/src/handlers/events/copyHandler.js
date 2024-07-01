/**
 * Inicializa los manejadores de eventos para la funcionalidad de copiar texto al portapapeles.
 * Este método agrega eventos a los botones de copiar para que el texto del área de entrada y el área de salida
 * pueda ser copiado al portapapeles cuando se haga clic en los botones correspondientes.
 */
export function initializeCopyHandlers() {
    /**
     * Botón para copiar el texto del área de entrada.
     * @type {HTMLElement}
     */
    const copyBtnFrom = document.getElementById('copyFrom');

    /**
     * Botón para copiar el texto del área de salida.
     * @type {HTMLElement}
     */
    const copyBtnTo = document.getElementById('copyTo');

    /**
     * Si el botón de copiar desde el área de entrada existe, se agrega un evento de clic.
     * Al hacer clic, el texto del área de entrada se copia al portapapeles.
     */
    if (copyBtnFrom) {
        copyBtnFrom.addEventListener('click', async () => {
            /**
             * Texto del área de entrada que se copiará al portapapeles.
             * @type {string}
             */
            const inputText = document.getElementById('inputText').value;
            await navigator.clipboard.writeText(inputText);
        });
    }

    /**
     * Si el botón de copiar desde el área de salida existe, se agrega un evento de clic.
     * Al hacer clic, el texto del área de salida se copia al portapapeles.
     */
    if (copyBtnTo) {
        copyBtnTo.addEventListener('click', async () => {
            /**
             * Texto del área de salida que se copiará al portapapeles.
             * @type {string}
             */
            const outputText = document.getElementById('outputText').value;
            await navigator.clipboard.writeText(outputText);
        });
    }
}
