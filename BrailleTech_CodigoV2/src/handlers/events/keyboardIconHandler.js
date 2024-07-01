// src/events/keyboardIconHandler.js
export function initializeKeyboardIconHandler() {
    const inputLanguage = document.getElementById('inputLanguage');
    const keyboardIcon = document.getElementById('keyboardIcon'); // Nuevo ícono
    const virtualKeyboardSection = document.getElementById('virtualKeyboardSection');
    const closeKeyboardPanel = document.getElementById('closeKeyboardPanel');
    const keyboardPanelHeader = document.getElementById('keyboardPanelHeader');

    const updateKeyboardIconVisibility = () => {
        if (inputLanguage.value === 'braille') {
            keyboardIcon.style.display = 'block'; // Muestra el ícono del teclado
        } else {
            keyboardIcon.style.display = 'none'; // Oculta el ícono del teclado
        }
    };

    // Inicializar la visibilidad del ícono del teclado
    updateKeyboardIconVisibility();

    // Evento para actualizar la visibilidad del ícono del teclado cuando se cambia el idioma
    inputLanguage.addEventListener('change', updateKeyboardIconVisibility);

    // Evento para mostrar el panel flotante del teclado virtual al hacer clic en el ícono del teclado
    keyboardIcon.addEventListener('click', () => {
        virtualKeyboardSection.style.display = 'block';
    });

    // Evento para cerrar el panel flotante del teclado virtual al hacer clic en el botón de cerrar
    closeKeyboardPanel.addEventListener('click', () => {
        virtualKeyboardSection.style.display = 'none';
    });

    // Implementar funcionalidad de arrastre
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    keyboardPanelHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - virtualKeyboardSection.getBoundingClientRect().left;
        offsetY = e.clientY - virtualKeyboardSection.getBoundingClientRect().top;
        document.body.style.userSelect = 'none'; // Desactivar la selección de texto durante el arrastre
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            virtualKeyboardSection.style.left = `${e.clientX - offsetX}px`;
            virtualKeyboardSection.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = ''; // Reactivar la selección de texto después del arrastre
    });
}
