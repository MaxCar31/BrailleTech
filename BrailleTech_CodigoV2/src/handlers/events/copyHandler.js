export function initializeCopyHandlers() {
    const copyBtnFrom = document.getElementById('copyFrom');
    const copyBtnTo = document.getElementById('copyTo');

    if (copyBtnFrom) {
        copyBtnFrom.addEventListener('click', async () => {
            const inputText = document.getElementById('inputText').value;
            await navigator.clipboard.writeText(inputText);
        });
    }

    if (copyBtnTo) {
        copyBtnTo.addEventListener('click', async () => {
            const outputText = document.getElementById('outputText').value;
            await navigator.clipboard.writeText(outputText);
        });
    }
}
